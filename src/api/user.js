/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data 用来设置 POST 请求体
    data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  // JSON.parse 字符串转换为对象
  // JSON.stringify 对象转换位字符串
  // const userString = window.localStorage.getItem('user')
  // const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log('userString' + userString)
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头
    headers: {
      // 属性名和值都得看接口的要求
      // 属性名： Authorization 接口要求的
      // 属性值： Bearer 空格token数据
      // authorization: `Bearer ${user.token}`
    }
  })
}
// 修改用户信息
export const getUserInfos = () => {

}

// 修改用户头像
// 注意 data 必须传递 FormData 对象
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}

// 修改用户基本信息
// 注意 data 必须传递 FormData 对象
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
