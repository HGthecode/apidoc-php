<?php

namespace hg\apidoc\utils;
use Exception;
class Request
{
    protected $get = [];

    protected $post = [];

    protected $method = "GET";

    public function __construct()
    {
        $this->get = $_GET;
        $this->post = $_POST;
        $this->method = !empty($_SERVER['REQUEST_METHOD'])?$_SERVER['REQUEST_METHOD']:"";
    }

    public function get(){
        return $this->get;
    }

    public function post(){
        return $this->post;
    }

    public function input(){
        $input = file_get_contents('php://input');
        $inputObj = json_decode($input);
        return Helper::objectToArray($inputObj);
    }

    public function param(){
        $config = ConfigProvider::get();
        if (!empty($config['request_params'])){
            return $config['request_params'];
        }
        $method = !empty($this->method)?$this->method:"GET";
        if ($method == "GET"){
            return $this->get;
        }
        return $this->input();
    }

}