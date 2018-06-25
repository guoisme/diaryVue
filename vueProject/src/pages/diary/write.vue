<template>
  <div class="bg-white container pa-30 main">
  <div class="form-horizontal" method="post">
    <div class="form-group">
      <label for="username" class="col-sm-2 control-label">天气</label>
    <div class="col-sm-10">
      <label class="radio-inline">
         <input type="radio" class="wea" v-model="diary.weather" name="weather" value="1"> <span class="icon icon-sunny"></span>
     </label>
     <label class="radio-inline">
        <input type="radio" class="wea" v-model="diary.weather" name="weather" value="2" checked> <span class="icon icon-cloudy"></span>
     </label>
     <label class="radio-inline">
       <input type="radio" class="wea" v-model="diary.weather" name="weather" value="3"> <span class="icon icon-rain"></span>
      </label>
      <label class="radio-inline">
        <input type="radio" class="wea" v-model="diary.weather" name="weather" value="4"> <span class="icon icon-overcast"></span>
       </label>
    </div>
  </div>
  <input id="time" name="time" type="hidden">
  <div class="form-group">
    <label for="password" class="col-sm-2 control-label">日记</label>
    <div class="col-sm-10">
      <textarea class="form-control" v-model="diary.diary" id="diary" name="diary" rows="10"></textarea>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button @click="add" class="btn btn-primary">记录</button>
    </div>
  </div>
</div>
</div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return{
        diary:{
          weather:null,
          diary:null
        }
      }
    },
    methods:{
      add(){
        var _this=this;
        console.log(this.diary.weather);
        console.log(this.diary.diary);
         this.$reqs.post('/diarys/write',this.diary).then(res=>{
              console.log(res.data);
              _this.$router.push({path:'/manage'});
            }).catch(err=>{console.log(err)})
      }
    }
  }
</script>
