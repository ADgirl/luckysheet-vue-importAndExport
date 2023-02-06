import { STATUS_OK, statusCodeMsg, TIMEOUT, responseCode } from './config';
import axios from 'axios';
// import { dialog, myUtils } from "my-common-ui";
import * as qs from 'qs';
import { dialog } from '../assets/dialog';

export default class AxiosConfig {
  constructor(baseURL = {
    dev: 'rsd/',
    //部署到同一机器不要前缀
    prod: 'rsd/'
  }) {
    this.baseURL = baseURL;

  }

  getInstance () {
    let baseUrl = process.env.NODE_ENV === "production" ? this.baseURL.prod : this.baseURL.dev;
    const xhr = axios.create({
      baseURL: baseUrl,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    //添加请求拦截器
    xhr.interceptors.request.use(
      function (config) {
        // 添加token
        // let token = myUtils.getToken();
        // if (token) {
        //   config.headers.common['Authorization'] = `bearer ${token}`;
        // }
        // 如果请求是 post 的请求 用qs 配置下 请求参数
        if (config.method === 'post') {
          return config;
        }
        //在get请求的参数中加上一个随机参数   TODo
        if (config.method === 'get') {
          const random = Math.random();
          if (config.params) {
            config.params.r = random;
          } else {
            config.params = {
              r: random
            };
          }
          //如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
          if (config.baseURL === 'dii/dev-ops/api/') {
            config.paramsSerializer = function (params) {
              return qs.stringify(params, { arrayFormat: 'repeat' });
            };
          }
        }
        return config;
      },
      function (error) {
        //请求错误时做些事
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    xhr.interceptors.response.use(
      function (response) {
        const statusCode = response.status;
        if (statusCode === STATUS_OK) {
          if (response.data.code && response.data.code !== 200) {
            if (response.data.code % 1000 === 206 || response.data.code === 1203) {
              dialog.info('登录失效，即将跳转到登录页面');
              // return;
              // if (process.env.VUE_APP_FLAG === 'rsd' || process.env.VUE_APP_FLAG === 'sjkf') {
              //   myUtils.redirectToLogin();
              // } else {
              //   myUtils.redirectToLoginForDmp();
              // }
            } else {
              dialog.sysError(response.data.msg || response.data.message, response.data.code)
              // if (response.data.msg) {
              //   dialog.error(response.data.msg);
              // } else {
              //   dialog.error('操作失败')
              // }
            }
          }
          return response.data
          //   return Promise.reject(response.data);
          // } else {
          //   return response.data;
          // }
        } else {
          // 接口异常返回
          statusCodeMsg.forEach(function (item, index) {
            if (statusCode === item.code) {
              return Promise.reject(response.data);
            }
          });
        }
      },
      function (error) {
        let { url } = error.config;
        let urlArr = ['api/datasource/test']
        if (error.code && error.code === 'ECONNABORTED') {
          if (urlArr.includes(url)) {
            dialog.error('连接失败')
          } else {
            dialog.error('响应超时');
          }
          return false;
        } else {
          return Promise.reject(error);
        }
      }
    );
    return xhr;
  }
}
