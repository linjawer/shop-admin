<template>
  <el-row type="flex" justify='space-between' class="header" align='middle'>
    <!-- 添加一个点击事件，点击的时候，会收缩 -->
   <i class="el-icon-back" @click='handleToggle'></i>
   <div>admin</div>

  </el-row>
</template>

<script>
export default {
   methods:{
       handleToggle:function () {
           // 接收事件   
           this.$emit('onChange')
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
