<template>
<el-container class="layout-container">
  <el-aside
  class="aside"
  width="200px"
  >
  <AppAside />
  </el-aside>
  <el-container>
    <el-header
    class="header">Header</el-header>
    <el-main class="main">
      <!--默认子路由-->
      <router-view />
      </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppAside from './components/aside'
export default {
  name: 'LayoutIndex',
  data () {
    return {

    }
  },
  props: {

  },
  components: {
    AppAside
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang='less'>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  width: 200px;
  background: #d3dce6;
}
.header {
  background-color: #b3c0d1;
}
.main {
  background-color: #e9eef3;
}
</style>
