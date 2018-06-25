
<template>
  <div class="bg-white container pa-30 main">
  <div class="form-horizontal">
    <div class="form-group">
      <label for="username" class="col-sm-2 control-label">用户名</label>
    <div class="col-sm-10">
      <input type="text" v-model="name" class="form-control" placeholder="用户名" name="username">
    </div>
    </div>
    <div class="form-group">
    <label for="password" class="col-sm-2 control-label">密码</label>
    <div class="col-sm-10">
      <input type="password" v-model="password" name="password" class="form-control" placeholder="密码">
    </div>
    </div>
    <div class="form-group">
    <label for="password-repeat" class="col-sm-2 control-label">重新输入密码</label>
    <div class="col-sm-10">
      <input type="password" v-model="passwordRepeat" name="password-repeat" class="form-control" placeholder="重新输入密码">
    </div>
    </div>
    <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button @click="reg" class="btn btn-primary">注册</button>
    </div>
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return{
        name:null,
        password:null,
        passwordRepeat:null
      }
    },
    methods:{
      reg(){
        var _this=this;
        var obj={
          'name':this.name,
          'password':this.password
        };
        if(this.name==null||this.password==null||this.passwordRepeat==null){
          alert('请不要留空！')
        }else{
          if(this.password!=this.passwordRepeat){
            alert("密码不一致！");
          }else{
            this.$reqs.post("/users/repeat",obj).then(function(result){
              if(result.data.err){alert(result.data.err)}else{
                console.log(result.data.success);
                _this.$reqs.post('/users/reg',obj)
                  .then((result)=>{
                    //成功
                    _this.$store.commit('updateUser',{
                      'name':result.data.username,
                      'password':result.data.password
                    });
                    _this.$router.push({path:'/'});
                  }).catch(function (error) {
                  //失败
                  console.log(error.data);
                });
              }
            }).catch(function(error){
              console.log(error);
            });
          }
        }
      }
    }
  }
</script>
<style type="text/css"></style>
