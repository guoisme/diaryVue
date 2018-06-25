<template>
  <div>
   <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">日记本</a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li  title="index"><router-link  to="/">首页 <span class="sr-only">(current)</span></router-link></li>
        <li title="write"><router-link  to="/write">写日记</router-link></li>
        <li title="manage"><router-link to="/manage">管理日记</router-link></li>
        <template v-if="!user">

        <li title="login"><router-link  to="/login">登录</router-link></li>
        <li title="reg"><router-link  to="/reg">注册</router-link></li>
        </template>

      </ul>
      <template v-if="user">
        <ul class="nav navbar-nav navbar-right">
          <li><router-link  to="/edit">{{user}},欢迎您</router-link></li>
          <li><a @click="logout" class="logout">退出</a></li>
        </ul>
      </template>
    </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '头部',
      user:null
    }
  },
  watch:{
    $route: {
      handler: function (val, oldVal) {
        this.$reqs.post('/users/get').then(res=>{
         this.user=res.data.username;
         // console.log(res);
        }).catch(error=>{console.log(error)});
      },
      deep:true
    }
  },
  created(){
    this.$reqs.post('/users/get').then(res=>{
         // console.log(res);
        this.user=res.data.username;
        }).catch(error=>{console.log(error)});
  },
  methods:{
    logout(){ //退出系统
        var _this = this;
        this.$reqs.post("/users/logout",{
        }).then(function(result){
          //成功
          var obj={
              'name':null,
              'password':null
            };
            _this.user=null;
            _this.$store.commit('updateUser',obj);
          _this.$router.push({path:'/'});
        }).catch(function (error) {
          //失败
        console.log(error)
        });
      }
  }
}
</script>
<style >
 body{padding-top:60px;}
 .logout{cursor: pointer;}
</style>
