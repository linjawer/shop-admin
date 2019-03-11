// 专门储存用户数据和修改用户数据的方法
import axios from 'axios'

export default {
// 命令空间,为了区别modules下面其他模块可能存在相同的数据或者方法
namespaced:'user',

//初始化参数,存储数据
state:{
     //用户名信息,这个是获取本地的用户名和信息
     username:localStorage.getItem('username')||'',
     //身份信息
     identity:localStorage.getItem('identity')||''
},
// 异步修改数据，点击按钮的时候触发
actions:{
//login是命令,对应的函数就是操作函数
//  {commit,state}=第一个对象解构出来的参数
 login({commit,state},data){
    axios({
        url: "/admin/account/login",
        method: "POST",
        data,
        // 处理跨域
         withCredentials: true,
      }).then(res => {
        console.log(res);
        // 解构赋值将右边的值赋值给到左边的值
        const { message, status } = res.data;
        if (status == 1) {
          // 登录失败
          this.$message.error(message);
        } else {
          // 登录成功返回上一页
        //   this.$router.back();
      
          //把接口返回的数据更新到store数据里边,记得查看文档账号管理，用户登录的文档
          state.username=message.uname
          state.identity=message.realname

          //解决的是把用户的数据保存到本地上边，不会一刷新就没了
          localStorage.setItem('username',message.uname)
          localStorage.setItem('identity',message.realname)

          //返回上一个页面
          window.history.back()
        }
      })
 },
 logout({state},fn){
    //调用退出接口
    axios({
       url:'/admin/account/logout',
       withCredentials: true,
    }).then(res=>{
      const {message,atatus}=res.data;
      if(status == 0){
        // 把接口返回的值更新store下的数据
        state.username = "";
        state.identity = "";

        // 把用户信息保存到本地存储
        localStorage.removeItem("username");
        localStorage.removeItem("identity");
        fn();
    }
    })
 }
}



}