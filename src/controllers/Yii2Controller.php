<?php

namespace hg\apidoc\controllers;

use hg\apidoc\Controller;
use Yii;
use yii\base\Event;
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

        //给接口响应结果绑定beforeSend事件
        Yii::$app->getResponse()->on(Response::EVENT_BEFORE_SEND, [$this, 'beforeSend']);
    }

    /**
     * @param Event $event
     */
    public function beforeSend(Event $event)
    {
        /* @var $response yii\web\Response */
        $response = $event->sender;

        //针对Yii2框架404默认返回的是html页面，rest没处理
        if ($response->statusCode === 404){
            $response->format = Response::FORMAT_JSON;
            $response->data = [
                'name' => $response->statusText,
                'message' => '请求不存在',
                'code' => 0,
                'status' => 404,
            ];
        }
    }

    /**
     * 获取配置
     */
    public function actionConfig()
    {
        return $this->_ctrl->getConfig();
    }

    /**
     * 获取api文档菜单
     */
    public function actionApiMenus()
    {
        return $this->_ctrl->getApiMenus();
    }

    /**
     * 获取接口明细
     * @return array
     */
    public function actionApiDetail()
    {
        return $this->_ctrl->getApiDetail();
    }

    public function actionDocMenus()
    {
        return $this->_ctrl->getMdMenus();
    }

    public function actionDocDetail()
    {
        return $this->_ctrl->getMdDetail();
    }

    public function actionVerifyAuth()
    {
        return $this->_ctrl->verifyAuth();
    }

    public function actionGenerator()
    {
        return $this->_ctrl->createGenerator();
    }

    public function actionCancelAllCache()
    {
        return $this->_ctrl->cancelAllCache();
    }

    public function actionCreateAllCache()
    {
        return $this->_ctrl->createAllCache();
    }

    public function actionRenderCodeTemplate()
    {
        return $this->_ctrl->renderCodeTemplate();
    }

    public function actionAllApiMenus()
    {
        return $this->_ctrl->getAllApiMenus();
    }

    public function actionAddApiShare()
    {
        return $this->_ctrl->addApiShare();
    }

    public function actionGetApiShareList()
    {
        return $this->_ctrl->getApiShareList();
    }

    public function actionGetApiShareDetail()
    {
        return $this->_ctrl->getApiShareDetail();
    }

    public function actionDeleteApiShare()
    {
        return $this->_ctrl->deleteApiShare();
    }

    public function actionHandleApiShareAction()
    {
        return $this->_ctrl->handleApiShareAction();
    }
}