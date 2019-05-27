/**
 * 此文件为封装axios的文件，暴露出post，get方法以及响应和请求的拦截
 * axios在webpack中以及配置不需要import引入，在webpack.base.conf中
 */
import path from '../path'
import Vue from 'vue'
import qs from 'qs'

//创建vue实例，以便访问vue原型的方法
const vue = new Vue()

// 创建Axios实例对象，配置请求前缀，请求超时时间以及不需要带跨域凭证
const Axios = http.create({
  baseURL:  process.env.NODE_ENV !== 'development' ? path.API_URL : ''
})

// 请求拦截
Axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}, error => {
  return Promise.reject(error)
})

// 相应拦截，可以在错误响应中做操作，response包含错误信息
Axios.interceptors.response.use(resopne => {
  return resopne
}, error => {
  const { response } = error
  return Promise.reject(error)
})

// get请求
export const getHttp = (url, data) => {
  return new Promise((resolve, reject) => {
    Axios.get(url, { params : data }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
      vue.$message('获取数据失败，请刷新')
    })
  })
}

// post请求
export const postHttp = (url, data) => {
  return new Promise((resolve, reject) => {
    Axios.post(url, qs.stringify(data)).then(res => {
      resolve(res.data)
      // if (res.data.code !== 200) vue.$message('获取数据失败，请刷新')
      // else resolve(res.data.output)
    }).catch(error => {
      reject(error)
      vue.$message('获取数据失败，请刷新')
    })
  })
}

