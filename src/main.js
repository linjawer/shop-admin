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
import Login from './pages/Login';
import Admin from './pages/Admin';
import GoodsList from "./pages/goods/GoodsList"
import Goodsadd from './pages/goods/Goods-add'
import GoodsEdit from './pages/goods/GoodsEdit'
import CategoryList from "./pages/category/CategoryList"
import CategoryAdd from "./pages/category/CategoryAdd";


// 引入vuex的仓库
import store from "./store";


// element-ui 3.注册插件
Vue.use(ElementUI);

Vue.config.productionTip = false;

//配置路由
const routes = [
  //路由重定向
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/login',
    component: Login,
    meta: '登录页'
  },
  {
    path: '/admin',
    component: Admin,
    meta: '登录后台',
    redirect: '/admin/goods-list',
    children: [
               {path: 'goods-list',component: GoodsList,meta: '商品列表'},
               {path: 'category-list',component: CategoryList,meta: '栏目列表'},
               {path: 'goods-edit/:id',component: GoodsEdit,meta: '编辑商品'},
               {path:'goods-add',component:Goodsadd,meta:'账户管理'},
               {path: "category-add", component: CategoryAdd, meta: "新增栏目"} 
    ]
  }
]
//创建路由对象
const router = new VueRouter({
  routes
})
// 给axios自动
axios.defaults.baseURL = 'http://localhost:8899';

//给vue构造函数的原型链添加$axios
Vue.prototype.$axios = axios;
new Vue({
  render: h => h(App),
  //挂载到跟实例
  router,
  //挂载store
  store,
}).$mount('#app')