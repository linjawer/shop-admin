<template>
  <!-- NavMenu导航菜单里边 -->
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group>-->
  <!-- 
     default-active="1-4-1" ,1-4-1代表的是层级Z-index
     class：自定义的classname
     collapse：false展开，true收起
  -->
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- 子菜单 -->
    <!--加上``就可以转为字符串-->
    <el-submenu v-for="(item,index) in menus" :key="index" :index="`${index+1}`">
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </template>
      <!-- 子菜单的集合 -->
      <el-menu-item-group>
        <!-- 子菜单的选项 -->
        <el-menu-item
          v-for="(subItem,subIndex) in item.group"
          :key="subIndex"
          :index="`${index+1}-${subIndex+1}`"
        >
          <router-link :to="subItem.src">{{subItem.title}}</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      //是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）,true是收起来，false是展开
      // isCollapse: false,
      //当前菜单的数据
      menus: [
        {
          icon: "el-icon-menu",
          title: "购物商城",
          group: [
            {
              src: "/admin/goods-list",
              title: "商品管理"
            },
            {
              src: "/admin/category-list",
              title: "栏目管理"
            }
          ]
        },
          {
          icon: "el-icon-service",
          title: "会员管理",
          group: [
            {
              src: "#",
              title: "会员列表"
            }
          ]
        },
          {
          icon: "el-icon-tickets",
          title: "订单管理",
          group: [
            {
              src: "#",
              title: "订单列表"
            }
          ]
        }
      ]
    };
  },
  props:['isCollapse']
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
/* 设置填满剩余的空间 */
.el-menu-vertical-demo {
  flex: 1;
  border-right: none;
}
.el-menu-item-group__title {
  display: none;
}
.el-menu-vertical-demo a{
   /* 这个是继承的意思inherit */
   color: inherit;
   text-decoration: none;
}
</style>

