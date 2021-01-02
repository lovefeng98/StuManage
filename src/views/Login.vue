<template>
  <div class="login_container">
    <div class="login_log">
      <img src="../assets/images/log.png" />
      <span>学生信息管理系统</span>
    </div>
    <el-card shadow="hover" class="login-box-card">
      <template #header>
        <span>登录</span>
      </template>
      <!--登录主体区域-->
      <div>
        <el-form :model="LoginForm" :rules="LoginFormRules" ref="LoginFormRef">
          <el-form-item prop="username">
            <el-input
              v-model="LoginForm.username"
              prefix-icon="el-icon-user-solid"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="LoginForm.password"
              prefix-icon="el-icon-orange"
              placeholder="请输入密码"
              @keyup.enter="Login"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              @click="Login"
              :loading="loginbtn"
              >立即登录</el-button
            >
            <el-button type="info" size="medium" @click="restLoginForm"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      loginbtn: false,
      LoginForm: {
        username: "admin",
        password: "123456",
      },
      LoginFormRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    Login() {
      this.loginbtn = true;
      this.$refs["LoginFormRef"].validate(async (valid) => {
        if (!valid) {
          this.loginbtn = false;
          return this.$notify.warning({
            title: "警告",
            message: "表单验证出现错误",
          });
        }
        //登录成功
        const { data: res } = await axios.post("Login/", this.LoginForm);
        console.log(res)
        if (res.code !== 200) {
          this.loginbtn = false;
          return this.$notify.error({
            title: "错误",
            message: "登录失败:" + res.msg,
          });
        }
        this.$notify.success({
          title: "成功",
          message: "登录成功:" + res.msg,
        });
        //session
        window.sessionStorage.setItem("token", res.token);
        this.$router.push("/Welcome");
        this.loginbtn = false;
      });
    },
    restLoginForm() {
      this.$refs["LoginFormRef"].resetFields();
    },
  },
};
</script>
<style lang="css" scoped>
.login_container {
  background-image: url("../assets/images/login-bg.jpg");
  background-size: 100%;
  height: 100%;
}
.login-box-card {
  width: 350px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.7;
}
.login_log{
        padding-top: 20px;
        padding-left:30px;
        font-size: 45px;
        color: #dddddd;
        
    }
</style>