/**
 * 接口
 * @author guoxiaoning@easted.com.cn (guoxn)
 */
import axios from 'axios'
import qs from 'qs'
import router from '../../router'
import {Message} from 'iview'

let base = '/monitor'
// base = '/edm'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// http request 拦截器
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
})
// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === '200') {
      return response.data.data
    } else if (response.data.code === '402') {
      router.push({
        path: '/Login'
      })
    } else if (response.config.responseType === 'blob') {
      return response
    } else {
      Message.error(response.data.msg)
      return Promise.reject(response.data.msg)
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 跳转到登录页面
          router.push({
            path: '/login'
          })
          break
        case 500:
          router.push({
            path: '/error/500'
          })
          break
        case 404:
          router.push({
            path: '/error/404'
          })
          break
        case 504:
          router.push({
            path: '/error/504'
          })
          break
      }
    }
    return Promise.reject(error.response.data)
  }
)

// 登陆
export const Login = params => {
  return axios.post(`${base}/login`, params)
}

// 登出
export const Logout = _ => {
  return axios.get(`${base}/logout`)
}

// 终端列表
export const terminalList = params => {
  return axios.post(`${base}/terminal/list`, params)
}

// 终端详情
export const terminalDetail = params => {
  return axios.get(`${base}/terminal/${params}`)
}

// 终端日志
export const terminalLog = params => {
  return axios.post(`${base}/terminal/getLogByterminal`, params)
}

// 桌面列表
export const desktopList = params => {
  return axios.post(`${base}/desktop/list`, params)
}

// 桌面详情
export const desktopDetail = params => {
  return axios.get(`${base}/desktop/${params}`)
}

// 桌面日志
export const desktopLog = params => {
  return axios.post(`${base}/desktop/getLogByVm`, params)
}

// 日志列表
export const logList = params => {
  return axios.post(`${base}/log/list`, params)
}

// 首页统计
export const dashboardData = params => {
  return axios.post(`${base}/home/datainfo`, params)
}

// 日志导出
export const logExport = params => {
  return axios.post(`${base}/log/export`, params, {
    responseType: 'blob'
  }).then(res => {
    if (res.data) {
      if ('msSaveBlob' in navigator) {
        window.navigator.msSaveBlob(res.data, decodeURI(res.headers['content-disposition'].split('filename=')[1]))
      } else {
        let blob = res.data
        let a = document.getElementById('exportLog')
        let url = window.URL.createObjectURL(blob)
        let filename = decodeURI(res.headers['content-disposition'].split('filename=')[1])
        var evt = document.createEvent('HTMLEvents')
        evt.initEvent('click', false, false)
        a.href = url
        console.log(filename)
        a.download = filename
        a.dispatchEvent(evt)
        a.click()
        window.URL.revokeObjectURL(url)
      }
    }
  })
}
