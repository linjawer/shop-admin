<template>
  <div class="login-form">
    <div class="login-form-header">登录</div>
    <el-form :model="formData" status-icon label-width="70px">
      <!-- 不能放到外边 -->
      <el-form-item label="账号">
        <el-input v-model="formData.uname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="formData.upwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="button-list">
        <el-button type="primary" @click="submitForm('formData')">提交</el-button>
        <el-button @click="resetForm('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        uname: "",
        upwd: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      // 获取数据
      console.log(this.formData);
      this.$axios({
        url: "/admin/account/login",
        method: "POST",
        data: this.formData,
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
          this.$router.back();
        }
      });
      // this.$router.back();

      // 调用
      // this.$store.dispatch('login',this.formData,()=>{
      //
      // })
    },
    resetForm(formName) {
      this.formData = {
        uname: "",
        upwd: ""
      };
    }
  }
};
</script>
<style>
.login-form {
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -120px 0 0 -250px;
}
.login-form-header {
  color: #409eff;
  text-align: center;
  line-height: 2;
  margin-bottom: 20px;
  padding-left: 70px;
}
.button-list {
  text-align: center;
}
</style>

