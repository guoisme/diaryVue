<template>
  <div>
    <div  class="main">
      <div  class="login">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" class="form-control" v-model="username" id="username" name="username" />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" v-model="password" name="password" class="form-control" placeholder="密码">
        </div>
        <button  @click="login" :disabled="disablebtn" class="btn btn-primary">{{loginText}}</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        username:'guoisme',
        password:'123456',
        disablebtn:false,
        loginText:"登录"
      }
    },
    methods:{
      login(){
        var _this=this;
        this.disablebtn=true;
        this.loginText='登录中...';
        var data={
          'username':this.username,
          'password':this.password
        };
        this.$reqs.post("/users/login",data).then(function(result){
          if(result.data.err){alert(result.data.err)}else{
            var obj={
              'name':result.data.username,
              'password':result.data.password
            };
             _this.$store.commit('updateUser',obj);
            _this.$router.push({path:'/'});
          }
          _this.disablebtn=false;
          _this.loginText='登录';
        }).catch(function(error){
          _this.disablebtn = false;
          _this.loginText = "登录"
        });
      }
    }
  }
</script>
<style>
  button{width: 100%}
</style>
