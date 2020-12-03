/**
 *  基于 axios 封装的请求模块
 */
import axios from 'axios'

// 创建一个 axios 实例, 说白了就是复制了一个 axios
// 我们通过这个实例去发请求, 把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp',
  url: ''
})

// 导出请求方法
export default request

// 请求拦截器

// 响应拦截器

// 谁要使用谁就加载 request 模块
