
/**
 * 项目的启动入口
 */
import Vue from 'vue'// 加载vue
import App from './App.vue' // 加载根组件
import router from './router'// 加载路由
// import './styles/index.less'// 加载全局样式

// 加载 element 组件库
import ElementUI from 'element-ui'

// 加载 elment 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

// 注册全局 element 组件库
Vue.use(ElementUI)

Vue.config.productionTip = false // 关闭生产环境提示

// 创建 vue 根实例
// 把 router 配置到根实例中
// 通过 render 方法把 App 根组件渲染到 #app 入口节点
new Vue({
  router,
  render: h => h(App)
  // el: '#app'  等价于 $mount('#app')
}).$mount('#app')
