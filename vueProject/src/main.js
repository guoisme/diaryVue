// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@/assets/css/style.css'

import axios from 'axios';//引入axios组件
axios.defaults.withCredentials=true;  //跨域保存session有用
axios.defaults.baseURL = "http://localhost:3000"; //打包的时候直接删掉，默认基础路径在这里配置
//将 axios 赋值给 Vue，方便在子组件里面使用
Vue.prototype.$reqs = axios;
Vue.config.productionTip = false
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     console.log(config);
//     return config;
//     // var test = window.location.hash;
//     // console.log(test);
//     // if(test=='#/login'||test=='#/'){return config;}else{
//     //     //      alert("请先登录..");
//     //     // window.location.href = "#/login"; 
//     //     console.log(config);
//     // }
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    
    // return response;
    if(response.data.err){
      var test = window.location.hash;
      if(test=='#/login'||test=='#/'||test=='#/reg'){return response;}else{
        alert("请先登录..");
        window.location.href = "#/login"; 
      }
    }else{return response;}
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render:x=> x(App)
})
