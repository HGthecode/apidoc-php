<?php
declare(strict_types = 1);

namespace hg\apidoc\parses;

class ParseAnnotation
{

    /**
     * 解析非@注解的文本注释
     * @param $refMethod
     * @return array|false
     */
    public static function parseTextAnnotation($refMethod): array
    {
        $annotation = $refMethod->getDocComment();
        if (empty($annotation)) {
            return [];
        }
        if (preg_match('#^/\*\*(.*)\*/#s', $annotation, $comment) === false)
            return [];
        $comment = trim($comment [1]);
        if (preg_match_all('#^\s*\*(.*)#m', $comment, $lines) === false)
            return [];
        $data = [];
        foreach ($lines[1] as $line) {
            $line = trim($line);
            if (!empty ($line) && strpos($line, '@') !== 0) {
                $data[] = $line;
            }
        }
        return $data;
    }

}