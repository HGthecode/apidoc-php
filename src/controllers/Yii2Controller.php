<?php

namespace hg\apidoc\controllers;

use hg\apidoc\Controller;
use yii\filters\ContentNegotiator;
use yii\web\Response;

class Yii2Controller extends \yii\rest\Controller
{
    private Controller $_ctrl;

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        $behaviors['contentNegotiator'] = [
            'class' => ContentNegotiator::class,
            'formats' => [
                'application/json' => Response::FORMAT_JSON
            ]
        ];

        return $behaviors;
    }

    public function init($checkAuth = false)
    {
        $this->_ctrl = new Controller();
        $this->_ctrl->init();
    }

    public function actionConfig()
    {
        return $this->_ctrl->getConfig();
    }

    public function actionApiMenus()
    {
        return $this->_ctrl->getApiMenus();
    }

    public function actionDocMenus()
    {
        return $this->_ctrl->getMdMenus();
    }
}