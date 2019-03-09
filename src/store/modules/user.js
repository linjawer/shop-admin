
// 专门存储用户的数据，和修改用户数据的方法
// import axios from "axios";

// 用来专门存储用户的数据，和修改用户数据的方法
export default {
    // 命令空间
    namespaced:'user',
    // 初始化数据,这里就相当于vue里边的data，数据都是放在这里的
    state:{
        //用户名
        username:'',
        //身份信息
        identity:''
    },
    // 异步修改数据，actions是异步触发mutation修改数据，你想对某项数据进行修改
    actions:{
        // login是一个命令，对应的函数就是操作函数
        // {commit,state}=第一个对象参数解构出来的属性
        // login({commit, state}, data){
        //     this.$axios({
        //         url: "/admin/account/login",
        //         method: "POST",
        //         data,
        //         // 处理跨域
        //          withCredentials: true,
        //       }).then(res => {  
        //         // 解构赋值将右边的值赋值给到左边的值
        //         const { message, status } = res.data;
        //         if (status == 1) {
        //           // 登录失败
        //           this.$message.error(message);
        //         } else {

        //             state.username=message.uname;
        //             state.indentity=message.realname;

        //           // 登录成功返回上一页
        //           window.history.back();
        //         }
        //       });
        
    }

} 