<?php
namespace hg\apidoc;
/**
 * Webman Install
 */
class Install
{
    const WEBMAN_PLUGIN = true;

    /**
     * @var array
     */
    protected static $configPath = array (
      'config/plugin/hg/apidoc' => 'config/plugin/hg/apidoc',
    );

    /**
     * Install
     * @return void
     */
    public static function install()
    {
        foreach (static::$configPath as $source => $dest) {
            if ($pos = strrpos($dest, '/')) {
                $parent_dir = base_path() . '/' . substr($dest, 0, $pos);
                if (!is_dir($parent_dir)) {
                    mkdir($parent_dir, 0777, true);
                }
            }
            //symlink(__DIR__ . "/$source", base_path()."/$dest");
            copy_dir(__DIR__ . "/$source", base_path() . "/$dest");
            echo "Create $dest";
        }
    }

    /**
     * Uninstall
     * @return void
     */
    public static function uninstall()
    {
        foreach (static::$configPath as $source => $dest) {
            $path = base_path()."/$dest";
            if (!is_dir($path) && !is_file($path)) {
                continue;
            }
            echo "Remove $dest";
            if (is_file($path) || is_link($path)) {
                unlink($path);
                continue;
            }
            remove_dir($path);
        }
    }

}