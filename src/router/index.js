import Vue from 'vue'
import VueRouter from 'vue-router'

// VueCLI 创建的项目中 @ 表示 src
// 它是 src 目录的路径别名
// 好处： 它不受当前文件路径影响
// 主意： @ 就是 src 路径， 后面别忘记了写那个斜杠
// 建议： 如果加载的资源路径就在当前目录下， 那就正常写
//        如果需要进行父级路径查找的都使用 @
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
import Image from '@/views/image/'
Vue.use(VueRouter)

// 路由设置

// 路由控制表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  { // 通常会把网站根目录 / 设置成为网站的首页
    path: '/', // 如果path为空， 会作为默认子路由渲染
    // 命名路由 layout 有一个默认子路由， 这个路由， 这个名字没有意义， 所以警告
    // 正确的做法是： 如果有默认子路由， 就不要给父路由起名字了
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // pathn 为空， 都会当为默认子路由选软
        // 路由的名字是干啥的？
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫： 所有页面导航都会经过这里
// 守卫页面导航
// to:  要去的路由页面信息
// from:  来自哪里的路由信息
// next: 放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login, 效验登录状态
  // 如果没有登录， 则跳转到登录页面
  // 允许通过
  // next()

  const user = JSON.parse(window.localStorage.getItem('user'))

  // 效验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面， 正常允许通过
    next()
  }
})

export default router
