import Vue from 'vue'
import App from './App.vue'

//导入axios
import axios from "axios";

// 引入element-ui   1.引入
import ElementUI from 'element-ui';
// 2.引入样式
import 'element-ui/lib/theme-chalk/index.css';
//引入vue-router
import VueRouter from 'vue-router';
//注册插件
Vue.use(VueRouter);

//导入组件
import Login from './pages/Login.vue';
import Admin from './pages/Admin.vue';

// element-ui 3.注册插件
Vue.use(ElementUI);

Vue.config.productionTip = false;

//配置路由
const routes=[
  //路由重定向
  {path:'/',redirect:'/admin'},
  {path:'/login',component:Login,meta:'登录页'},
  {path:'/admin',component:Admin,meta:'首页'}
]
//创建路由对象
const router=new VueRouter({
  routes
})

//给vue构造函数的原型链添加$axios
Vue.prototype.$axios=axios;

new Vue({
  render: h => h(App),
  //挂载到跟实例
  router
}).$mount('#app')
