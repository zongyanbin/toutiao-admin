<template>
  <div class="login-container">
    <!--
    el-form 表单组件
    每个表单项都必须使用 el-form-item 组件包裹
    -->

    <el-form  class="login-from" ref="form" :model="user">
      <div class="login-head"></div>
      <el-form-item>
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">我已同意读并同意用户协议和隐私条块</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onLogin"
          class="login-btn"
          :loading="loginLoading"
        >登录</el-button>
      </el-form-item>
</el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndexs',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false, // 是否同意协议的选中状态
      loginLoading: false // 登录的 loading 状态
    }
  },
  methods: {
    onLogin () {
      // 获取表单数据 (根据接口要求)
      const user = this.user
      // 表单验证
      // 验证通过， 提交登录

      // 开启登录 loading
      this.loginLoading = true
      request({
        method: 'POST',
        url: '/v1_0/authorizations',
        // data 用来设置 POST 请求体
        data: user
      }).then(res => {
        console.log(res)

        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        // 开启登录 loading
        this.loginLoading = false
      }).catch(err => {
        console.log(err)
        // 登录成功
        this.$message({
          message: '登录失败',
          type: 'success'
        })
        // 开启登录 loading
        this.loginLoading = false
      })
      // 处理后端响应结果
      // 成功:  xxx
      // 失败:  xxx
      console.log('submit!')
    }
  }
}
</script>

<style lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column; // 上下排雷
  justify-content: center; // 水平居中
  align-items: center; // 垂直居中
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover; // 背景填充模式
}
.login-from {
  background-color: #fff;
  padding: 50px;
  min-width: 300px;
}
.login-head {
  height: 57px;
  min-width: 300px;
  background: url("./logo_index.png") no-repeat;
  margin-bottom: 30px;
}
.login-btn {
  width: 100%;
}
</style>
