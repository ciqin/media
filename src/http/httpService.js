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
  //baseURL: path.API_URL
})
Axios.defaults.timeout = 1000*60*10;           //超时时间
// 请求拦截
Axios.interceptors.request.use(config => {
  if (config.data && config.data.ContentType) {
    delete config.data.ContentType
    config.data = qs.stringify(config.data);
    config.headers = Object.assign(config.headers, { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'})
  }
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
    data = qs.stringify(data)
    Axios.post(url,data).then(res => {
      resolve(res.data)
      // if (res.data.code !== 200) vue.$message('获取数据失败，请刷新')
      // else resolve(res.data.output)
    }).catch(error => {
      reject(error)
      vue.$message('获取数据失败，请刷新')
    })
  })
}

// 上传文件
export const upload = (url,data,eventPro) => {
  return new Promise((resolve, reject) => {
    let config = {
      headers:{'Content-Type':'multipart/form-data'}
    };
    
    
    // if(arguments.length>2){
    //   console.log(arguments)
    //   if(typeof arguments[2]=="object"){

    //     Object.assign(config,eventPro);
    //   }
    // }
    if(eventPro){
      Object.assign(config,eventPro);
    }
    
    console.log(eventPro)
    Axios.post(url,data,config).then(res => {
      resolve(res.data)
      // if (res.data.code !== 200) vue.$message('获取数据失败，请刷新')
      // else resolve(res.data.output)
    }).catch(error => {
      reject(error)
      vue.$message('上传失败');
    })
  })
}