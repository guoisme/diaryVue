var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;

router.get('/manage',function(req,res,next){
    handler(req, res, "diarys", {user: req.session.username},function(data){
        var obj = {
          data:data,
          success:true
        };
        var str = JSON.stringify(obj);
        res.end(str);
    });
});
router.post('/write',function(req,res,next){
	req.body.time = new Date();
	
	req.body.user=req.session.username;
	console.log(req.body);
	handler(req, res, "diarys",req.body,function(data){ 
        if(data.length==0){
            res.end('{"err":"抱歉，添加失败"}');
        }else{
        	res.end('{"success":true}');
        }
    });
});

router.get('/upd',function(req,res,next){
    var id=new ObjectId(req.query._id);
    handler(req, res, "diarys",{_id: id},function(data){
        if(data.length==0){
            res.end('{"err":"抱歉，添加失败"}');
        }else{
           var str = JSON.stringify(data);
           // console.log(str);
           res.end(str);
        }
    });
});

//修改密码
router.post('/updDiary', function(req, res, next) {
    //console.log(req.body);
    var selectors = [
        {"_id":new ObjectId(req.body._id)},
        {"$set":{
                diary:req.body.diary,
                weather:req.body.weather
            }
        }
    ];
    handler(req, res, "diarys", selectors,function(data){  
        console.log(data);
        if(data.length==0){
            res.end('{"err":"抱歉，修改失败"}');
        }else{
            
            res.end('{"success":"修改成功"}');
        }
    });
});

router.get('/delDiary',function(req,res,next){
    handler(req, res, "diarys", {"_id" : ObjectId(req.query._id)},function(data){ 
        console.log(data);
        if(data.length==0){
            res.end('{"err":"抱歉，删除失败"}');
        }else{
            var obj = {
              success:"删除成功"
            };
            var str = JSON.stringify(obj);
            res.end(str);
        } 
    });
});

module.exports = router;