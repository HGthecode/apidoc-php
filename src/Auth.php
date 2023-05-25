<?php
declare(strict_types = 1);

namespace hg\apidoc;

use hg\apidoc\exception\ErrorException;
use hg\apidoc\utils\ConfigProvider;
use hg\apidoc\utils\Helper;

class Auth
{
    protected $authConfig = [];

    public function __construct($config)
    {
        $authConfig = !empty($config['auth'])?$config['auth']:[];
        if (empty($authConfig['secret_key'])){
            $authConfig['secret_key'] = "apidoc#hgcode";
        }
        if (empty($authConfig['expire'])){
            $authConfig['expire'] = 86400;
        }
        $this->authConfig = $authConfig;
    }

    /**
     * 验证密码是否正确
     * @param $password
     * @return false|string
     */
    public function verifyAuth(string $password, string $appKey)
    {
        $authConfig = $this->authConfig;
        if (!empty($appKey)) {
            $currentAppConfig = Helper::getCurrentAppConfig($appKey);
            $currentApp  = $currentAppConfig['appConfig'];
            if (!empty($currentApp) && !empty($currentApp['password'])) {
                // 应用密码
                if (md5($currentApp['password']) === $password) {
                    return $this->createToken($currentApp['password'],$authConfig['expire']);
                }
                throw new ErrorException("password error");
            }
        }
        if ($authConfig['enable']) {
            // 密码验证
            if (md5($authConfig['password']) === $password) {
                return $this->createToken($authConfig['password'],$authConfig['expire']);
            }
            throw new ErrorException("password error");
        }
        return false;
    }

    /**
     * 验证token是否可用
     * @param $request
     * @return bool
     */
    public function checkAuth($params=[]): bool
    {
        $authConfig = $this->authConfig;
        $token = !empty($params['token'])?$params['token']:"";
        $appKey = !empty($params['appKey'])?$params['appKey']:"";
        if (!empty($appKey)) {
            $currentAppConfig = Helper::getCurrentAppConfig($appKey);
            $currentApp  = $currentAppConfig['appConfig'];
            if (!empty($currentApp) && !empty($currentApp['password'])) {
                if (empty($token)) {
                    throw new ErrorException("token not found");
                }
                // 应用密码
                if ($this->checkToken($token, $currentApp['password'])) {
                    return true;
                } else {
                    throw new ErrorException("token error");
                }
            } else if (empty($authConfig['enable'])) {
                return true;
            }
        }
        if($authConfig['enable'] && empty($token)){
            throw new ErrorException("token not found");
        }else if (!empty($token) && !$this->checkToken($token, "")  && $authConfig['enable']) {
            throw new ErrorException("token error");
        }
        return true;
    }


    /**
     * 获取tokencode
     * @param string $password
     * @return string
     */
    protected static function getTokenCode(string $password): string
    {
        return md5(md5($password));
    }


    /**
     * 创建token
     * @param string $password
     * @return string
     */
    public function createToken(string $password): string
    {
        $authConfig = $this->authConfig;
        $data = [
            'key'=>static::getTokenCode($password),
            'expire'=>time()+$authConfig['expire']
        ];
        $code = json_encode($data);
        return static::handleToken($code, "CE",$authConfig['secret_key']);
    }

    /**
     * 验证token是否可用
     * @param $token
     * @return bool
     */
    public function checkToken(string $token, string $password): bool
    {
        $authConfig = $this->authConfig;
        if (empty($password)){
            $password = $authConfig['password'];
        }
        $decode = static::handleToken($token, "DE",$authConfig['secret_key']);
        $deData = json_decode($decode,true);

        if (!empty($deData['key']) && $deData['key'] === static::getTokenCode($password) && !empty($deData['expire']) && $deData['expire']>time()){
            return true;
        }

        return false;
    }



    /**
     * 处理token
     * @param $string
     * @param string $operation
     * @param string $key
     * @param int $expiry
     * @return false|string
     */
    protected static function handleToken(string $string, string $operation = 'DE', string $key = '', int $expiry = 0):string
    {
        $ckey_length   = 4;
        $key           = md5($key);
        $keya          = md5(substr($key, 0, 16));
        $keyb          = md5(substr($key, 16, 16));
        $keyc          = $ckey_length ? ($operation == 'DE' ? substr($string, 0, $ckey_length) : substr(md5(microtime()), -$ckey_length)) : '';
        $cryptkey      = $keya . md5($keya . $keyc);
        $key_length    = strlen($cryptkey);
        $string        = $operation == 'DE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0) . substr(md5($string . $keyb), 0, 16) . $string;
        $string_length = strlen($string);
        $result        = '';
        $box           = range(0, 255);
        $rndkey        = array();
        for ($i = 0; $i <= 255; $i++) {
            $rndkey[$i] = ord($cryptkey[$i % $key_length]);
        }
        for ($j = $i = 0; $i < 256; $i++) {
            $j       = ($j + $box[$i] + $rndkey[$i]) % 256;
            $tmp     = $box[$i];
            $box[$i] = $box[$j];
            $box[$j] = $tmp;
        }
        for ($a = $j = $i = 0; $i < $string_length; $i++) {
            $a       = ($a + 1) % 256;
            $j       = ($j + $box[$a]) % 256;
            $tmp     = $box[$a];
            $box[$a] = $box[$j];
            $box[$j] = $tmp;
            $result  .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
        }
        if ($operation == 'DE') {
            $subNumber = (int)substr($result, 0, 10);
            if (($subNumber == 0 || $subNumber - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26) . $keyb), 0, 16)) {
                return substr($result, 26);
            } else {
                return '';
            }
        } else {
            return $keyc . str_replace('=', '', base64_encode($result));
        }
    }

}