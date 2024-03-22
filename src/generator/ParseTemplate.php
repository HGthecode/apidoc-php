<?php
declare(strict_types = 1);

namespace hg\apidoc\generator;
use hg\apidoc\Utils;
use hg\apidoc\utils\DirAndFile;
use hg\apidoc\utils\Helper;
use think\facade\App;

class ParseTemplate
{

    public function compile($path,$params)
    {
        $filePath    =  $path;
        $tplContent = DirAndFile::getFileContent($filePath);
        $tplContent = $this->replaceForeach($tplContent,$params);
        $tplContent = $this->replaceParams($tplContent,$params);
        $tplContent = $this->replaceIf($tplContent,$params);
        $tplContent = preg_replace("/\s+\r\n/is", "\r\n", $tplContent);
        return $tplContent;
    }

    /**
     * 替换变量
     * @param $tplContent
     * @param $params
     * @return array|string|string[]|null
     */
    protected function replaceParams($tplContent,$params){
        $key = '{$%%}';
        $pattern = '#' . str_replace('%%', '(.+?)' , preg_quote($key, '#')) . '#';
        $tplContent = preg_replace_callback($pattern, function ($matches)use ($params){
            $k = $matches[1];
            if (strpos($k, '(') !== false){
                $tagArr = explode("(", $k);
                $fun = $tagArr[0];
                $k = str_replace(")", "",$tagArr[1] );
                $v = $this->getObjectValueByKeys($params,$k);
                if (empty($v)){
                    return "";
                }
                if ($fun === "lower"){
                   return Helper::lower($v);
                }else if ($fun === "snake"){
                    return Helper::snake($v);
                }else if ($fun === "lcfirst"){
                    return lcfirst($v);
                }else if ($fun === "ucfirst"){
                    return ucfirst($v);
                }else if ($fun === "count"){
                    return count($v);
                }
            }
            $value = $this->getObjectValueByKeys($params,$k);
            if (is_bool($value)){
               return $value==true?'true':'false';
            }else if (is_array($value)){
               return $k;
            }
            return $value;
        }, $tplContent);
        return $tplContent;
    }

    /**
     * 替换if内容
     * @param $tplContent
     * @param $params
     * @return array|mixed|string|string[]
     * @throws \Exception
     */
    protected function replaceIf($tplContent,$params){
        $res = [];
        $label = "if";
        $labelList = $this->parseLabel($tplContent,$label);
        if (!empty($labelList) && count($labelList)>0){
            foreach ($labelList as $item) {
                $itemStr =$item;
                $ifChildren= $this->parseLabel($itemStr,$label,"children");

                if (!empty($ifChildren) && count($ifChildren)>0){
                    foreach ($ifChildren as $ifChild){
                        $itemChildrenContent= $this->getIfContent($ifChild);
                        $itemStr = str_replace($ifChild, $itemChildrenContent,$itemStr );
                    }
               }
                $itemContent= $this->getIfContent($itemStr);
                $tplContent =   str_replace($item, $itemContent,$tplContent );
            }
        }

        return $tplContent;
    }
    protected function parseForeach($str,$params){
        if (preg_match('#{foreach (.+?) as (.+?)=>(.+?)}#s', $str, $matches)){
            $complete = $matches[0];
            $condition = $matches[1];
            $keyField = str_replace("$", "",$matches[2] );
            $itemField = str_replace("$", "",$matches[3] );
            $conditionKey = str_replace("$", "",$condition );
            $forListData = $this->getObjectValueByKeys($params,$conditionKey);
            $contentStr = str_replace($complete, "",$str);
            $contentStr = substr($contentStr,0,-10);
            return [
                'list'=>$forListData,
                'keyField'=>$keyField,
                'itemField'=>$itemField,
                'content'=>$contentStr
            ];
        }
        return [];
    }

    /**
     * 获取所有foreach标签
     * @param $str
     * @return array
     * @throws \Exception
     */
    protected function getAllForeachLabel($str){
        $tree = [];
        $label = "foreach";
        $labelList = $this->parseLabel($str,$label);
        if (!empty($labelList) && count($labelList)>0){
            foreach ($labelList as $itemLabel) {
                $labelChildrenList = $this->parseLabel($itemLabel,$label,"children");
                if (!empty($labelChildrenList) && count($labelChildrenList)>0){
                    $childrenList = [];
                    foreach ($labelChildrenList as $item) {
                        $childrenList[]=[
                            'str'=>$item,
                            'children' => []
                        ];
                    }
                    $tree[]=[
                        'str'=>$itemLabel,
                        'children' => $childrenList
                    ];
                }else{
                    $tree[]=[
                        'str'=>$itemLabel,
                        'children' => []
                    ];
                }
            }
        }
        return $tree;
    }
    // 解析foreach
    protected function replaceForeach($html,$params,$level=""){
        $allLabelData= $this->getAllForeachLabel($html);
        $res = [];
        if (count($allLabelData)>0){
            // 遍历每个foreach标签
            foreach ($allLabelData as $labelItem) {
                $itemStr = $labelItem['str'];
                $forOption = $this->parseForeach($labelItem['str'],$params);
                $itemContent="";
                if (!empty($forOption['list']) && count($forOption['list'])>0){
                    // 处理每行数据
                    foreach ($forOption['list'] as $rowKey=>$row) {
                        $rowData = [$forOption['itemField']=>$row,$forOption['keyField']=>$rowKey];
                        $rowParams = array_merge($params,$rowData);
                        // 存在子标签，处理子标签
                        if (!empty($labelItem['children']) && count($labelItem['children'])>0){
                            $itemStrContent = "";
                            foreach ($labelItem['children'] as $childLabel){
                                $childContents = "";
                                $childStr = $childLabel['str'];
                                $childDataList = $this->parseForeach($childLabel['str'],$rowParams);
                                // 处理子标签数据
                                if (!empty($childDataList['list']) && count($childDataList['list'])>0){
                                    foreach ($childDataList['list'] as $childDataKey=>$childDataItem) {
                                        // 子标签每行数据
                                        $childDataItemData = [$childDataList['itemField']=>$childDataItem,$childDataList['keyField']=>$childDataKey,];
                                        $contentsStr= $this->getForContent($childDataList['content'],array_merge($rowParams,$childDataItemData));
                                        $contentsStr =ltrim($contentsStr,"\r\n");
                                        if (!empty(Helper::trimEmpty($contentsStr))){
                                            $childContents.= $contentsStr;
                                        }
                                    }
                                }
                                $itemStrContent.= str_replace($childLabel['str'], $childContents,$forOption['content']);
                            }
                            $rowContent=$this->replaceParams($itemStrContent,$rowParams);
                            $itemContentStr=$this->replaceIf($rowContent,$rowParams);
                            if (!empty(Helper::trimEmpty($itemContentStr))){
                                $itemContent.= $itemContentStr;
                            }
                        }else{
                            $rowContent=$this->getForContent($forOption['content'],$rowParams);
                            if (empty(Helper::trimEmpty($rowContent))){
                                $rowContent= "";
                            }
                            $itemContent.= $rowContent;
                        }
                        $itemContent =trim($itemContent,"\r\n");
                    }
                }
                $html = str_replace($labelItem['str'], $itemContent,$html );
            }
        }
        return $html;

    }

    /**
     * 获取foreach内容
     * @param $str
     * @param $params
     * @return array|mixed|string|string[]
     * @throws \Exception
     */
    protected function getForContent($str,$params){
            $content = $str;
            if (!empty($params)){
                $content = $this->replaceParams($content,$params);
                $content = $this->replaceIf($content,$params);
            }
            return $content;
    }


    /**
     * 获取if条件的内容
     * @param $str
     * @return mixed|string
     */
    protected function getIfContent($str){
        if (preg_match('#{if (.+?)}(.*?){/if}#s', $str, $matches)){
            if (eval("return $matches[1];")){
                // 条件成立
               return $matches[2];
            }
        }
        return "";
    }


    /**
     * 解析指定标签
     * @param $str
     * @param $label
     * @param string $level
     * @return array
     * @throws \Exception
     */
    protected function parseLabel($str,$label,$level=""){
        // 后面的 flag 表示记录偏移量
        preg_match_all('!({/?'.$label.' ?}?)!', $str, $matches, PREG_OFFSET_CAPTURE);
        // 用数组来模拟栈
        $stack  = [];
        $top    = null;
        $result = [];
        foreach ($matches[0] as $k=>[$match, $offset]) {
            // 当取标签内容时，排除第一个和最后一个标签
            if ($level === 'children' && ($k==0 || $k>=count($matches[0])-1)){
                continue;
            }
            // 判断匹配到的如果是 开始标签
            if ($match === '{'.$label.' ') {
                $stack[] = $offset;
                // 记录开始的位置
                if ($top === null) {
                    $top = $offset;
                }
                // 如果不是
            } else {
                // 从栈底部拿一个出来
                $pop = array_pop($stack);
                // 如果取出来的是 null 就说明存在多余的 标签
                if ($pop === null) {
                    throw new \Exception('语法错误，存在多余的 {/'.$label.'} 标签');
                }
                // 如果取完后栈空了
                if (empty($stack)) {
                    // offset 是匹配到的开始标签(前面)位置，加上内容的长度
                    $newOffset = $offset + strlen($match)-$top;
                    // 从顶部到当前的偏移就是这个标签里的内容
                    $result[] = substr($str, $top, $newOffset);
                    // 重置 top 开始下一轮
                    $top = null;
                }
            }
        }
        // 如果运行完了，栈里面还有东西，那就说明缺少闭合标签。
        if (!empty($stack)) {
            throw new \Exception('语法错误，存在未闭合的 {/'.$label.'} 标签');
        }
        return $result;
    }

    /**
     * 根据keys获取对象中的值
     * @param $array
     * @param $keyStr
     * @param string $delimiter
     * @return mixed|null
     */
    public function getObjectValueByKeys($array, $keyStr, $delimiter = '.')
    {
        $keys = explode($delimiter, $keyStr);
        if (preg_match_all('#\[(.+?)]#s', $keyStr, $matches)){
            $value = $array;
            if (!empty($matches[1])){
                $matchesIndex=0;
                foreach ($keys as $keyItem) {
                    if (strpos($keyItem, '[') !== false) {
                        $tagArr = explode("[", $keyItem);
                        if (!empty($value[$tagArr[0]]) && !empty($value[$tagArr[0]][$matches[1][$matchesIndex]])){
                            $value =$value[$tagArr[0]][$matches[1][$matchesIndex]];
                        }else{
                            $value =null;
                            break;
                        }
                        $matchesIndex=$matchesIndex+1;
                    }else{
                        $value =$value[$keyItem];
                    }
                }
            }
            return $value;
        }else if (sizeof($keys) > 1) {
            $value = $array;
            foreach ($keys as $key){
                if (!empty($value[$key])){
                    $value = $value[$key];
                }else{
                    $value =null;
                    break;
                }
            }
            return $value;
        } else {
            return $array[$keyStr] ?? null;
        }
    }


}