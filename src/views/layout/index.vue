<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="auto"
    >
  <AppAside class="aside-menu" />
  </el-aside>
  <el-container>
    <el-header
    class="header">
    <div>
      <i class="el-icon-s-fold"></i>
      <span>ps头条内容管理系统</span>
    </div>
      <el-dropdown>
        <div class="avatar-wrap">
          <img class="avatar" :src="user.photo" alt="">
          <span>{{user.name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      <!--<span>
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>-->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main class="main">
      <!--默认子路由-->
      <router-view />
      </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  data () {
    return {
      user: {} // 当前登录用户信息
    }
  },
  props: {

  },
  components: {
    AppAside
  },
  created () {
    // 组件初始化好， 请求获取用户资料
    this.loadUserProfile()
  },
  mounted () {

  },
  methods: {
    // 除了登录接口， 其他所有接口都需要授权才能请求使用
    // 或者说， 除了登录接口， 其它接口都需要提供你的身份令牌才能获取数据
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

.main {
  background-color: #e9eef3;
}
</style>
