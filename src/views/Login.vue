<template>
  <div class="login-warpper">
    <img src="../assets/images/LoginBG2.jpeg" class="login-bgImg">
    <Form :model="loginForm" :rules="loginFormRules" ref="loginForm"
             class="login-container" @keyup.enter.native.prevent="handleSubmit2">
      <img src="../assets/images/LoginLogo.png" class="login-container-img">
      <FormItem prop="username">
        <Input class="login-input" size="large" type="text" v-model="loginForm.username" autocomplete="off" placeholder="用户名" />
      </FormItem>
      <FormItem prop="password">
        <Input class="login-input" size="large" type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码" />
      </FormItem>
      <FormItem style="width:100%">
        <Button size="large" type="primary" class="login-btn" @click.native.prevent="handleSubmit2" :loading="logining">登录
        </Button>
      </FormItem>
    </Form>
    <p class="logon-copy-info">&copy; Easted All Rights Reserved 北京易讯通股份有限公司版权所有</p>
  </div>
</template>

<script>
  import API from '../api/api'
  export default {
    data () {
      return {
        logining: false,
        loginForm: {
          username: '',
          password: ''
        },
        loginFormRules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit2 (ev) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true
            this.$router.push({path: '/dashboard'})
            API.Login(this.loginForm).then(res => {
              this.logining = false
              localStorage.clear()
              localStorage.setItem('user', this.loginForm.username)
              this.$router.push({path: '/dashboard'})
            }).catch(_ => {
              this.logining = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-warpper {
    z-index: 901;
    &:after {
      content: '';
      position: fixed;
      top: 0;
      width: 100vw;
      height: 100vh;
      opacity: 0.5;
      background-image: linear-gradient(-49deg, #0C1228 0%, #333366 100%);
      box-shadow: 0 4px 7px 2px rgba(138,138,138,0.50);
    }
  }
  .login-bgImg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .login-ltImg {
    position: fixed;
    left: 0;
    top: 20px;
  }

  .login-container-img {margin-bottom: 85px;}

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 470px;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10;
    margin-top: -176px;
    margin-left: -235px;
    text-align: center;
    :global {
      .login-input input{
        height: 42px;
      }
    }
  }
  .login-btn {
    width: 100%;
    height: 42px;
    background: #1161EE;
    border-color: #1161EE;
  }
  .logon-copy-info {
    position: absolute;
    bottom: 14px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #C3C3C3;
  }
</style>
