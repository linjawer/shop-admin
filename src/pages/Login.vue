<template>
<div class="login-form">
<div class="login-form-header">登录</div>
<el-form :model="ruleForm2" status-icon  label-width="70px">
  <!-- 不能放到外边 -->
  <el-form-item label="账号">
    <el-input v-model="ruleForm2.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item class="button-list">
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm2: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
      submitForm(formName) {
            // 获取数据
            console.log(this.ruleForm2);
            
            // 提交数据
            // this.$axios()

      },
      resetForm(formName) {
        this. ruleForm2={
          username: '',
          password: ''
        }
      }
    }
  }
</script>
<style>
.login-form{
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -120px 0 0 -250px;
}
.login-form-header{
    color: #409EFF;
    text-align: center;
    line-height: 2;
    margin-bottom: 20px;
    padding-left: 70px;
}
.button-list{
    text-align: center;
}
</style>

