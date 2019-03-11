<template>
  <el-row type="flex" justify='space-between' class="header" align='middle'>
    <!-- 添加一个点击事件，点击的时候，会收缩 -->
   <i class="el-icon-back" @click='handleToggle'></i>
   <div>{{username}}{{identity}}</div>
   <!-- javascript:void(0)阻止a跳转 -->
   <a href="javascript:void(0)" @click='hand'>退出</a>
  </el-row>
</template>

<script>

import {mapState} from 'vuex'

export default {
  computed:{
    ...mapState('user',{
      // 以下的两种写法都是可以获取store的值
      username:'username',
      identity:'identity' //state=>state.identity
    })
  },
   methods:{
       handleToggle:function () {
           // 接收事件   
           this.$emit('onChange')
       },
       hand:function () {
           //点击的时候跳转到登录页面   
           this.$store.dispatch('user/logout',()=>{
                this.$router.push('/login')
           })
       }
   }
}
</script>
<style scoped>
.header{
    height: 60px;
}
.el-icon-back{
    cursor: pointer;
}
</style>
