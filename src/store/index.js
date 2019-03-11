// 装插件要引入vue
import Vue from 'vue';
import Vuex from 'vuex';

//引入文件
import user from './modules/user'

//注册Vuex插件
Vue.use(Vuex);

//创建一个仓库
export default new Vuex.Store({
    //挂载数据模块到仓库
    modules:{
        user
    }
})
