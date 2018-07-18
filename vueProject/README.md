# diary

> A Vue.js project

# 分别在vue项目与node项目中安装依赖
```
npm init
```
# 运行vue项目
```
npm run dev
//打开localhost:8080
```
# 运行node项目：
```
npm start
```
# 引入jq、bootstrap
1、安装jq、bootstrap
```
npm install jquery@1.11.3 --save-dev
npm install bootstrap@3.3.0 --save-dev
```
2、build/webpack.base.conf.js文件中添加
```
var webpack=require('webpack');
plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ]
```
3、src/main.js中引入jq、bootstrap
```
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
```
