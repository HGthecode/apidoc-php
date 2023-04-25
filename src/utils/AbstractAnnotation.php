<?php

declare (strict_types=1);

namespace hg\apidoc\utils;

use Doctrine\Common\Annotations\Annotation;

abstract class AbstractAnnotation
{

    public $name;

    public function __construct(...$value)
    {
        $formattedValue = $this->formatParams($value);
        foreach ($formattedValue as $key => $val) {
            if ($key=="value" && !property_exists($this, $key)){
                $this->name = $val;
            }else{
                $this->{$key} = $val;
            }
        }
    }

    protected function formatParams($value): array
    {
        if (isset($value[0])) {
            $value = $value[0];
        }
        if (!is_array($value)) {
            $value = ['name' => $value];
        }
        return $value;
    }
}
