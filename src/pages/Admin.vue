<template>
<div class="admin-container">
  <el-container>
    <!-- 左侧菜单栏 -->
    <el-aside width="auto">
      <!-- 预留存放logo的位置 -->
      <div class="logo"></div>
      <!-- 菜单栏 -->
      <app-aside  :isCollapse='isCollapse'></app-aside>
    </el-aside>
    <!-- 右侧内容区域 -->
    <el-container>
      <el-header >
        <app-header @onChange='changeCollapse'></app-header>
      </el-header>
      <!-- 主体 -->
      <el-main> 
        <breadcrumb></breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import Aside from  "../components/Aside";
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
export default {
  name:'admin-index',
  data() {
      return {
         isCollapse:false
      }
  },
  components:{
    // 主键名称不能跟标签名同步
    "app-aside":Aside,
    "app-header":Header,
    // 这个是面包屑功能
    "breadcrumb": Breadcrumb
  },
  methods:{
    // 修改菜单的展缩
    changeCollapse(){
      this.isCollapse=!this.isCollapse
    }
  }
};
</script>

<style>
.admin-container{
    /* 记得这样写的样式 */
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
}
.el-header{
   color:#333;
}
.el-aside {
   display: flex;
   flex-direction: column;
}
/* 去除行高bread面包靴 */
.el-main {
  background-color: #e9eef3;
}

.el-container {
  margin-bottom: 40px;
  /* 继承admin-contain的高度*/
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.logo{
  height: 60px;
  background: pink;
  /* #545c64 */
}
</style>

