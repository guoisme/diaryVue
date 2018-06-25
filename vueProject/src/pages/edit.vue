<template>
<div class="bg-white container pa-30 main">
  <div class="form-horizontal">
    <div class="form-group">
      <label for="username" class="col-sm-2 control-label">用户名</label>
    <div class="col-sm-10">
      <span>{{user}}</span>

    </div>
  </div>
  <div class="form-group">
    <label for="password-old" class="col-sm-2 control-label">旧密码</label>
    <div class="col-sm-10">
      <input type="password" v-model="passwordOld" name="password-old" class="form-control" placeholder="旧密码">
    </div>
  </div>
  <div class="form-group">
    <label for="password" class="col-sm-2 control-label">新密码</label>
    <div class="col-sm-10">
      <input type="password" v-model="password" name="password" class="form-control" placeholder="新密码">
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
      <button @click="save" class="btn btn-primary">保存</button>
    </div>
  </div>
</div>
</div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return{
        user:null,
        passwordOld:null,
        password:null,
        passwordRepeat:null
      }
    },
    created(){
    this.$reqs.post('/users/get').then(res=>{
         this.user=res.data.username;
        }).catch(error=>{console.log(error)});
    },
    methods:{
      save(){
        var _this = this;
        var obj={
          'user':this.user,
          'passwordOld':this.passwordOld,
          'password':this.password
        };
        if(this.password!=this.passwordRepeat){
          alert('密码不一致！');
        }else{
          this.$reqs.get('/users/pwd',{
            params:{
              passwordOld:this.passwordOld,
              name:this.user
            }
          })
          .then(res=>{
            _this.$reqs.post('/users/update',{'password':_this.password}).then(res=>{
              var obj={'name':null,'password':null};
              _this.$store.commit('updateUser',obj);
              _this.$router.push({path:'/login'});
            }).catch(err=>{console.log(err)})
          })
          .catch(error=>{
            console.log(error);
          })
        }
      }
    }
  }
</script>
