<template>
  <div class="main container">
  <div class="row">
    <div v-for="(item,index) in diarys">
      <div class="col-sm-6 col-md-6">
        <div class="thumbnail">
          <div class="caption">
            <p class="text-muted">
              <span class="dis-inbl ma-r-10">时间：{{item.time}}</span>
              <span class="dis-inbl ma-r-10">天气：<span :class="item.weatherColor" class="icon weather"></span></span>
            </p>
            <p style="overflow:hidden;height:100px;">{{item.diary}}</p>
            <p>
              <a @click="update(item._id)" id="update"  class="btn btn-primary" role="button">修改<span class="glyphicon glyphicon-pencil ma-l-10"></span></a>
              <a href="#" @click="remove(item._id)" class="btn btn-danger" role="button">删除<span class="glyphicon glyphicon-trash ma-l-10"></span></a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return{
        diarys:[
        ],

      }
    },
    created(){
      this.refresh();
    },
    methods:{
      update(id){
        // alert(id);
       this.$router.push({name:'Update',query:{id:id}});
      },
      remove(id){
        var con;
        con=confirm("确定删除么?"); //在页面上弹出对话框
        if(con==true){
          // alert(id);
          this.$reqs.get('/diarys/delDiary',{params:{ _id:id}}).then(res=>{
            console.log(res.data);this.refresh();
          }).catch(error=>{})
        }
      },
      refresh(){
        var _this=this;
        this.$reqs.get('/diarys/manage').then(res=>{
          _this.diarys=res.data.data;
          for(var i=0,len=_this.diarys.length;i<len;i++){
            var num=_this.diarys[i].weather;
            if(num==1){_this.diarys[i].weatherColor="icon-sunny";}
            else if(num==2){_this.diarys[i].weatherColor="icon-cloudy";}
            else if(num==3){_this.diarys[i].weatherColor="icon-rain";}
            else{_this.diarys[i].weatherColor="icon-overcast";}
          }
        }).catch(error=>{});
      }
    }
  }
</script>
