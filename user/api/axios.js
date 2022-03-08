import axios from "axios";
import config from '../config'
//对axios进行简单的二次封装，主要是将配置与axios进行结合

//判断当前为开发环节还是为生产环节，获取请求的接口地址
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    //初始化
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    //定义axios的相关配置
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }

    //拦截器
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            console.log(response,'response')
            // 对响应数据做点什么
            return response;
        }, function (error) {
            console.log(error,'error')
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    //在接口请求时会调用request函数
    request(options) {
        //创建实例
        const instance = axios.create()
        //需要将拿到的配置信息以及拿到的信息进行解构,使用es6的扩展运算符进行解构
        options = {...this.getInsideConfig(), ...options}
        //调用拦截器
        this.interceptors(instance)
        //返回接口请求结果
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)