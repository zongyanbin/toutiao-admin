
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

// 加载全局样式文件
import './styles/index.less'

// import JSONbig from 'json-bigint'

// const str = '{ "id":125358574559959468 }'
// // JSON.parse()
// console.log(JSON.parse(str))

// // 它会把超出 JS 安全整数范围的数字转为一种类型为 BigNumber 的对象
// // 我们在使用的时候需要把这个 BigNumber.toString() 就能得到原来正确的数据了
// console.log(JSONbig.parse(str))
// console.log(JSONbig.parse(str).id.toString())

// const data = JSONbig.parse(str)
// console.log(JSON.stringify(data))
// console.log(JSON.stringify(data))

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
