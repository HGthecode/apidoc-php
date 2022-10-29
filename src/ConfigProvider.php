<?php
declare(strict_types=1);
/**
 * Hyperf the Config Provider
 */
namespace hg\apidoc;

class ConfigProvider
{
    public function __invoke(): array
    {
        return [
            'dependencies' => [],
            'publish' => [
                [
                    'id' => 'config',
                    'description' => 'The config of apidoc.',
                    'source' => __DIR__ . '/config.php',
                    'destination' => BASE_PATH . '/config/autoload/apidoc.php',
                ],
            ],
        ];
    }
}