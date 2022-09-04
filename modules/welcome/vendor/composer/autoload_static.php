<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitc6a2b5ad549aeffc5798555932362e01
{
    public static $prefixLengthsPsr4 = array (
        'O' => 
        array (
            'OnBoarding\\' => 11,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'OnBoarding\\' => 
        array (
            0 => __DIR__ . '/../..' . '/OnBoarding',
        ),
    );

    public static $classMap = array (
        'OnBoarding\\Configuration' => __DIR__ . '/../..' . '/OnBoarding/Configuration.php',
        'OnBoarding\\OnBoarding' => __DIR__ . '/../..' . '/OnBoarding/OnBoarding.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitc6a2b5ad549aeffc5798555932362e01::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitc6a2b5ad549aeffc5798555932362e01::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitc6a2b5ad549aeffc5798555932362e01::$classMap;

        }, null, ClassLoader::class);
    }
}
