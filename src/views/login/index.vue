<template>
  <div class="login-container">
    <!--
    el-form 表单组件
    每个表单项都必须使用 el-form-item 组件包裹
    -->
    <!--
      配置 form 表单验证
      1、el-form 组件绑定 model 属性为表单验数据对象
      2、给需要验证的表单项 el-form-item 绑定 prop 属性
         注意: prop 属性需要制定表单雪乡中的数据名称
      3、通过 el-form 组件的 rules 属性配置验证规则
         具体验证规则可以参考： https://github.com/yiminghe/async-validator
         如果内置的验证规则不满足，也可以自定义验证规则
      手动触发表单验证：
      1、给 el-form 设置 ref 起个名字 （随便起名，不要重复即可）
      2、通过 ref 获得 el-form组件，调用组件的 validate 进行验证
    -->
    <el-form
      class="login-from"
      ref="login-form"
      :model="user"
      :rules="formRules"
    >
      <div class="login-head"></div>
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已同意读并同意用户协议和隐私条块</el-checkbox>
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
import { login } from '@/api/user'
export default {
  name: 'LoginIndexs',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false // 是否同意协议 el-form-item 设置prop="agree"
      },
      // checked: false, // 是否同意协议的选中状态
      loginLoading: false, // 登录的 loading 状态
      formRules: { // 表单验证规则配置
      // 需要验证码的数据名称： 规则列表[]
        mobile: [
          // trigger 用来配置触发效验的时机， 有两个选项， change 是当输入内容发送发生变化的时候， blur 当失去焦点的时候
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9|6]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agree: [
          {
            // 自定义效验规则
            // 验证通过： callback()
            // 验证失败： callback(new Error('错误消息'))
            // validator 验证函数不是你来调用的， 而是当 element 表单触发验证的时候它会自己内部调用
            // 所以你只需要提供效验函数处理逻辑就可以了
            // 通过： callback()
            validator: (rule, value, callback) => {
              if (value) {
                // 验证通过
                callback()
              } else {
                // 验证失败 new Error传递错误消息
                callback(new Error('请同意用户协议'))
              }
            },
            // message: '验证码不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 获取表单数据 (根据接口要求)
      // const user = this.user
      // 表单验证 validate 方法是异步处理的
      this.$refs['login-form'].validate((valid) => {
        // 如果表单验证失败，停止请求
        if (!valid) {
          return
        }
        // 验证通过，请求登录
        this.login()
      })
    },
    login () {
      // 开启登录 loading
      this.loginLoading = true

      // 对于代码中的请求操作
      // 1、接口请求可能需要重用
      // 2、实际工作中，接口非常容易变动，该起来麻烦
      // 我们建议的做法是把所有的请求都封装成一个函数然后统一的组织到模块中进行管理
      // 这样做的好处就是：管理维护更方便，也好重用
      /**
       *  //未封装
       *request({
        method: 'POST',
        url: '/v1_0/authorizations',
        // data 用来设置 POST 请求体
        data: this.user
      })
       */
      login(this.user).then(res => {
        console.log(res)

        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        // 关闭 loading
        this.loginLoading = false

        // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
        // 本地存储只能存储字符串
        // 如果需要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // 跳转到首页
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log(err)
        // 登录成功
        this.$message.error({
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
