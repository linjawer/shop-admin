<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'item.src'}" 
       v-for='(item,index) in routeInfo'
       :key='index'
      >{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    computed:{
        //监听路由变化，生成一个数组用于面包屑的渲染
       routeInfo:function () {
        //获取路由信息this.$route,获取mata的信息是在matched里边，然后在matched里边再获取meta的信息
          const matched=this.$route.matched
          const newArr=matched.map(v=>{
                return{
                    src:v.path,
                    title:v.meta
                }
          })
          // console.log(this.$route)
          // console.log(newArr);
          return newArr
       }
    }
};
</script>


<style scoped>
.breadcrumb >>> .el-icon-arrow-right:before{
    color: pink;
}
.breadcrumb{
    padding-bottom: 20px;
    border-bottom: 1px solid pink;
    margin-bottom: 20px;
}
</style>
