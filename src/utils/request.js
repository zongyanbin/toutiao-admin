/**
 *  基于 axios 封装的请求模块
 */
import axios from 'axios'

// 创建一个 axios 实例, 说白了就是复制了一个 axios
// 我们通过这个实例去发请求, 把需要的配置配置给这个实例来处理
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/mp',
  baseURL: 'http://api-toutiao-web.itheima.net/mp',
  url: ''
})

// 请求拦截器
request.interceptors.request.use(
  // 所有请求会经过这里
  // config 是当前请求相关的配置信息对象
  // config 是可以修改的
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 如果有登录信息， 则统一设置 token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // 当这里 return config 之后请求在会真正的发出去
    return config
  },

  // 请求失败， 会经过这里
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器

// 谁要使用谁就加载 request 模块

// 导出请求方法
export default request
