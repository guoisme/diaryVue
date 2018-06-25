var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;

/* POST users listing. */
//登录
router.post('/login', function(req, res, next) {
    var md5 = crypto.createHash('md5');//crypto是加密包，对传输过来的密码进行加密
    var password = md5.update(req.body.password).digest('base64');
    handler(req, res, "users", {name: req.body.username},function(data){
        //req:请求详细，res:响应信息，“users”操作的表的名称，传入的查询数据，回调函数
        if(data.length===0){
            res.end('{"err":"抱歉，系统中并无该用户，如有需要，请向管理员申请"}');
        }else if(data[0].password !== password){
            res.end('{"err":"密码不正确"}');
        }else if(data.length!==0&&data[0].password===password){
            req.session.username = req.body.username; //存session
            req.session.password = password;
            var obj = {
                username:req.body.username,
                password:password,
                success:"成功"
            };
            var str = JSON.stringify(obj);
            res.end(str);
        } 
    });
});
//退出
router.post('/logout', function(req, res, next) {
    req.session.username = ""; //清除session中的用户信息
    req.session.password = "";
    res.end('{"success":"true"}');
});
//获取session
router.post('/get',function(req,res,next){
    if(req.session.username){
        var obj = {
          username:req.session.username,
          password:req.session.password,
          success:"成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
    }else{
        res.end('{"err":"抱歉，该用户不存在"}');
    }
});

//注册是否有重复的名字
router.post('/repeat',function(req,res,next){
    console.log(req.body.name);
    handler(req, res, "users", {name: req.body.name},function(data){
        if(data.length>0){
            res.end('{"err":"抱歉，该用户已存在"}');
        }
        res.end('{"success":true}');
    });
});
//注册
router.post('/reg', function(req, res, next) {
    var md5 = crypto.createHash('md5');
    req.body.password = md5.update(req.body.password).digest('base64');
    handler(req, res, "users", req.body,function(data){  
        //console.log(data);
        if(data.length==0){
            res.end('{"err":"抱歉，添加失败"}');
        }else{
            req.session.username = req.body.name; //存session
            req.session.password = req.body.password;
            // console.log(req.session.password);
            var obj = {
                username:req.body.name,
                password:req.body.password,
                success:"成功"
            };
            console.log(obj);
            var str = JSON.stringify(obj);
            res.end(str);
        }
    });
});

//验证密码是否正确
router.get('/pwd',function(req,res,next){
    var md5 = crypto.createHash('md5');
    var passwordOld = md5.update(req.query.passwordOld).digest('base64');
    handler(req, res, "users", {name: req.query.name},function(data){
        var str = JSON.stringify(data);
        console.log(data[0]['password']);
        if(data[0]['password']!=passwordOld){
            res.end('{"err":"抱歉，密码错误"}');
        }else{
           res.end('{"success":true}');
        }
    });
});

//修改密码
router.post('/update', function(req, res, next) {
    //console.log(req.body);
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var selectors = [
        {"name":req.session.username},
        {"$set":{
                password:password, //密码
            }
        }
    ];
    handler(req, res, "users", selectors,function(data){  
        //console.log(data);
        if(data.length==0){
            res.end('{"err":"抱歉，修改失败"}');
        }else{
            req.session.username = null; //存session
            req.session.password = null;
            res.end('{"success":"修改成功"}');
        }
    });
});

module.exports = router;