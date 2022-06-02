<template>
  <div class="blurred-box">
    <div class="user-login-box">
      <span class="user-icon"></span>
      <div class="user-name">reoreo</div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="user_pwd">
          <el-input
            :key="passwordType"
            ref="user_pwd"
            v-model="loginForm.user_pwd"
            :type="passwordType"
            placeholder="请输入密码"
            name="user_pwd"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input
            v-model="loginForm.verifyCode"
            placeholder="请输入验证码"
            name="verifyCode"
          />
          <span class="show-verifyCode">
            <img :src="imageUrl" alt="验证码图片" @click="changeImgUrl()" />
          </span>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-top: 60px; font-size: 18px;"
          class="custom-btn btn-6"
          @click.native.prevent="handleLogin"
          >登 录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { captcha, verifyCaptcha } from "@/api/user";
export default {
  name: "Login",
  created() {
    // 获取验证码
    captcha().then((res) => {
      this.imageUrl = this.imageTemp + res.data.imageUrl;
      this.verifyUrl = res.data.imageUrl;
    });
  },
  mounted() {},
  data() {
    const validateAccount = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("账号不能少于 1 位数"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于 6 位数"));
      } else {
        callback();
      }
    };
    const validateVerifyCode = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("验证码不能少于 6 位数"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        user_name: "reoreo",
        user_pwd: "",
        verifyCode: "",
      },
      loginRules: {
        user_pwd: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        user_name: [
          { required: true, trigger: "blur", validator: validateAccount },
        ],
        verifyCode: [
          { required: true, trigger: "blur", validator: validateVerifyCode },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      imageTemp: "http://localhost:5300/api/v1",
      imageUrl: "",
      verifyUrl: "",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.user_pwd.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 账号密码无误后检验验证码
          this.verifyUrl = this.verifyUrl.slice(8, -4);
          verifyCaptcha(
            "http://localhost:5300/api/v1/verify" +
              this.verifyUrl +
              "/" +
              this.loginForm.verifyCode
          )
            .then(() => {
              this.$store.dispatch("user/login", this.loginForm).then(() => {
                this.$router.push({ path: this.redirect || "/" });
                this.loading = false;
              });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
        this.changeImgUrl();
      });
    },
    changeImgUrl() {
      captcha().then((res) => {
        this.imageUrl = this.imageTemp + res.data.imageUrl;
        this.verifyUrl = res.data.imageUrl;
      });
    },
  },
};
</script>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

body {
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: top;
  background-image: url("../../assets/login_images/blog_login.png");
  width: 100%;
  height: 100%;
  font-family: Arial, Helvetica;
  letter-spacing: 0.02em;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}

.blurred-box {
  position: relative;
  width: 250px;
  height: 550px;
  top: calc(50% - 300px);
  left: calc(50% - 125px);
  background: inherit;
  border-radius: 2px;
  overflow: hidden;

  &:after {
    content: "";
    width: 300px;
    height: 300px;
    background: inherit;
    position: absolute;
    left: -25px;
    right: 0;
    top: -25px;
    bottom: 0;
    box-shadow: inset 0 0 0 200px rgba(253, 253, 253, 0.2);
    filter: blur(10px);
  }

  .user-login-box {
    position: relative;
    margin-top: 50px;
    text-align: center;
    z-index: 1;
    height: 500px;
    & > * {
      display: inline-block;
      width: 200px;
    }

    .user-icon {
      width: 75px;
      height: 75px;
      position: relative;
      border-radius: 50%;
      background-size: contain;
      background-image: url(https://avatars.githubusercontent.com/u/57691895?s=400&u=cea5a8a6cc386615a5c59cf8fa709bb920ca543c&v=4);
    }

    .user-name {
      margin-top: 15px;
      margin-bottom: 15px;
      color: white;
    }

    .login-form {
      position: relative;

      .user_pwd {
        position: absolute;
        .svg-container {
        }
      }

      .show-pwd {
        position: absolute;
        right: 2%;
      }

      .show-verifyCode {
        position: absolute;
        right: -15px;
        top: 40px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }

      .custom-btn {
        width: 130px;
        height: 40px;
        color: #fff;
        border-radius: 5px;
        padding: 10px 25px;
        font-family: "Lato", sans-serif;
        font-weight: 500;
        background: transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
          7px 7px 20px 0px rgba(0, 0, 0, 0.1),
          4px 4px 5px 0px rgba(0, 0, 0, 0.1);
        outline: none;
      }

      /* 6 */
      .btn-6 {
        background: rgb(247, 150, 192);
        background: radial-gradient(
          circle,
          rgba(247, 150, 192, 1) 0%,
          rgba(118, 174, 241, 1) 100%
        );
        line-height: 42px;
        padding: 0;
        border: none;
      }
      .btn-6 span {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
      }
      .btn-6:before,
      .btn-6:after {
        position: absolute;
        content: "";
        height: 0%;
        width: 1px;
        box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1),
          -4px -4px 5px 0px rgba(255, 255, 255, 1),
          7px 7px 20px 0px rgba(0, 0, 0, 0.4),
          4px 4px 5px 0px rgba(0, 0, 0, 0.3);
      }
      .btn-6:before {
        right: 0;
        top: 0;
        transition: all 500ms ease;
      }
      .btn-6:after {
        left: 0;
        bottom: 0;
        transition: all 500ms ease;
      }
      .btn-6:hover {
        background: transparent;
        color: #76aef1;
        box-shadow: none;
      }
      .btn-6:hover:before {
        transition: all 500ms ease;
        height: 100%;
      }
      .btn-6:hover:after {
        transition: all 500ms ease;
        height: 100%;
      }
      .btn-6 span:before,
      .btn-6 span:after {
        position: absolute;
        content: "";
        box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1),
          -4px -4px 5px 0px rgba(255, 255, 255, 1),
          7px 7px 20px 0px rgba(0, 0, 0, 0.4),
          4px 4px 5px 0px rgba(0, 0, 0, 0.3);
      }
      .btn-6 span:before {
        left: 0;
        top: 0;
        width: 0%;
        height: 0.5px;
        transition: all 500ms ease;
      }
      .btn-6 span:after {
        right: 0;
        bottom: 0;
        width: 0%;
        height: 0.5px;
        transition: all 500ms ease;
      }
      .btn-6 span:hover:before {
        width: 100%;
      }
      .btn-6 span:hover:after {
        width: 100%;
      }
    }
  }
}
</style>
