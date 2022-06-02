import request from '@/utils/request'

// 第五步：修改登录接口和获取用户信息接口
export function login(data) {
  return request({
    url: '/auth',
    method: 'post',
    data
  })
}

// 获取用户信息，拿到用户权限、头像、名称等；
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取验证码
export function captcha() {
  return request({
    url: '/captcha',
    method: 'get'
  })
}

// 验证验证码
export function verifyCaptcha(url) {
  return request({
    url: url,
    method: 'get'
  })
}
