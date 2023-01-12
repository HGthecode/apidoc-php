<?php

declare (strict_types = 1);

namespace hg\apidoc\utils;

use FilesystemIterator;

/**
 * 文件缓存类
 */
class Cache
{
    /**
     * 缓存写入次数
     * @var integer
     */
    protected $writeTimes = 0;

    /**
     * 缓存读取次数
     * @var integer
     */
    protected $readTimes = 0;

    /**
     * 配置参数
     * @var array
     */
    protected $options = [
        'expire'        => 0,
        'cache_subdir'  => true,
        'prefix'        => '',
        'path'          => '',
        'hash_type'     => 'md5',
        'data_compress' => false,
        'serialize'     => [],
    ];

    /**
     * 架构函数
     * @param array $options 参数
     */
    public function __construct( array $options = [])
    {
        if (!empty($options)) {
            $this->options = array_merge($this->options, $options);
        }

        if (empty($this->options['path'])) {
            $this->options['path'] = APIDOC_STORAGE_PATH .'/'. 'apidoc';
        }

        if (substr($this->options['path'], -1) != DIRECTORY_SEPARATOR) {
            $this->options['path'] .= DIRECTORY_SEPARATOR;
        }
    }

    /**
     * 取得变量的存储文件名
     * @access public
     * @param string $name 缓存变量名
     * @return string
     */
    public function getCacheKey(string $name): string
    {
        $name = $name."_".hash($this->options['hash_type'], $name);

        if ($this->options['prefix']) {
            $name = $this->options['prefix'] . DIRECTORY_SEPARATOR . $name;
        }

        return $this->options['path'] . $name . '.php';
    }

    /**
     * 序列化数据
     * @access protected
     * @param mixed $data 缓存数据
     * @return string
     */
    protected function serialize($data): string
    {
        if (is_numeric($data)) {
            return (string) $data;
        }

        $serialize = $this->options['serialize'][0] ?? "serialize";

        return $serialize($data);
    }


    /**
     * 反序列化数据
     * @access protected
     * @param string $data 缓存数据
     * @return mixed
     */
    protected function unserialize($data)
    {
        if (is_numeric($data)) {
            return $data;
        }

        $unserialize = $this->options['serialize'][1] ?? "unserialize";

        return $unserialize($data);
    }


    /**
     * 获取有效期
     * @access protected
     * @param integer|DateTimeInterface|DateInterval $expire 有效期
     * @return int
     */
    protected function getExpireTime($expire): int
    {
        if ($expire instanceof DateTimeInterface) {
            $expire = $expire->getTimestamp() - time();
        } elseif ($expire instanceof DateInterval) {
            $expire = DateTime::createFromFormat('U', (string) time())
                    ->add($expire)
                    ->format('U') - time();
        }

        return (int) $expire;
    }

    /**
     * 获取缓存数据
     * @param string $name 缓存标识名
     * @return array|null
     */
    protected function getRaw(string $name)
    {
        $filename = $this->getCacheKey($name);

        if (!is_file($filename)) {
            return;
        }

        $content = @file_get_contents($filename);

        if (false !== $content) {
            $expire = (int) substr($content, 8, 12);
            $createTime = filemtime($filename);
            if (0 != $expire && time() - $expire > $createTime) {
                //缓存过期删除缓存文件
                DirAndFile::unlink($item->getPathname());
                return;
            }

            $content = substr($content, 32);

            if ($this->options['data_compress'] && function_exists('gzcompress')) {
                //启用数据压缩
                $content = gzuncompress($content);
            }

            return is_string($content) ? ['content' => $content, 'expire' => $expire,'create_time'=>$createTime] : null;
        }
    }

    /**
     * 判断缓存是否存在
     * @access public
     * @param string $name 缓存变量名
     * @return bool
     */
    public function has($name): bool
    {
        return $this->getRaw($name) !== null;
    }

    /**
     * 读取缓存
     * @access public
     * @param string $name    缓存变量名
     * @param mixed  $default 默认值
     * @return mixed
     */
    public function get($name, $default = null)
    {
        $this->readTimes++;

        $raw = $this->getRaw($name);

        return is_null($raw) ? $default : $this->unserialize($raw['content']);
    }

    /**
     * 写入缓存
     * @access public
     * @param string        $name   缓存变量名
     * @param mixed         $value  存储数据
     * @param int|\DateTime $expire 有效时间 0为永久
     * @return bool
     */
    public function set($name, $value, $expire = null): bool
    {
        $this->writeTimes++;

        if (is_null($expire)) {
            $expire = $this->options['expire'];
        }

        $expire   = $this->getExpireTime($expire);
        $filename = $this->getCacheKey($name);

        $dir = dirname($filename);

        if (!is_dir($dir)) {
            try {
                mkdir($dir, 0755, true);
            } catch (\Exception $e) {
                // 创建失败
            }
        }

        $data = $this->serialize($value);

        if ($this->options['data_compress'] && function_exists('gzcompress')) {
            //数据压缩
            $data = gzcompress($data, 3);
        }

        $data   = "<?php\n//" . sprintf('%012d', $expire) . "\n exit();?>\n" . $data;
        $result = file_put_contents($filename, $data);

        if ($result) {
            clearstatcache();
            return true;
        }

        return false;
    }



    /**
     * 删除缓存
     * @access public
     * @param string $name 缓存变量名
     * @return bool
     */
    public function delete($name): bool
    {
        $this->writeTimes++;

        return DirAndFile::unlink($this->getCacheKey($name));
    }

    /**
     * 清除缓存
     * @access public
     * @return bool
     */
    public function clear(): bool
    {
        $this->writeTimes++;

        $dirname = $this->options['path'] . $this->options['prefix'];

        $this->rmdir($dirname);

        return true;
    }


    /**
     * 删除文件夹
     * @param $dirname
     * @return bool
     */
    private function rmdir($dirname)
    {
        if (!is_dir($dirname)) {
            return false;
        }

        $items = new FilesystemIterator($dirname);

        foreach ($items as $item) {
            if ($item->isDir() && !$item->isLink()) {
                $this->rmdir($item->getPathname());
            } else {
                DirAndFile::unlink($item->getPathname());
            }
        }

        @rmdir($dirname);

        return true;
    }

}
