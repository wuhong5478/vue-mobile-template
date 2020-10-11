<template>
  <div class="login">
    <van-form @submit="handleLogin">
      <van-field
        v-model="loginForm.loginname"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="loginForm.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Form, Field, Button } from "vant";

export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return {
      loginForm: {
        loginname: "",
        password: "",
        rememberMe: 0
      }
    };
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          this.$router.push({ path: "/" }); //登录成功之后重定向到首页
        })
        .catch(err => {
          console.log(err);
          //this.$message.error(err); //登录失败提示错误
        });
    }
  }
};
</script>
