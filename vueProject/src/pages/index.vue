<template>
  <div>
    <div class="container main">
      <div class="jumbotron">
        <h1>欢迎使用日记本!</h1>
        <p>记得保持每天记日记的好习惯哦！</p>
        <p>
          <router-link class="btn btn-primary btn-lg" to="/write" role="button">写日记</router-link>
          <router-link class="btn btn-warning btn-lg" to="/manage" role="button">管理日记</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{

  }
</script>
<style>
</style>
