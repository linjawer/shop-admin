<template>
<div id="app">
   <router-view></router-view>
</div>
</template>
<script>
export default {
  name: "app",

  mounted:function () {
   //请求是否登录的接口,登录接口
   this.$axios.get('/admin/account/islogin').then(res=>{
     console.log(res);
     if(res.data.code=='nologin'){
       //跳转页面
      // this.$router.push('/admin/login')
     }
   })   
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.mt20{
  margin-top: 20px;
}
.mb{
  margin-top: 20px;
}
</style>
