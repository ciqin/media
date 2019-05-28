/**
 * 此文件为接口统一管理文件
 */



 const baseUrl = url => {
     if ((url.includes('api') ||url.includes('test')) && process.env.NODE_ENV !== 'development' ) {
         return url.split('/').splice(2).join('/')
     } else {
         return url
     }
 }

import { getHttp, postHttp } from "./httpService"


//  login
export const getLogin = (data) => postHttp(baseUrl('/test/login'), data)

// 产品物料展示
export const getProduct = (data) => getHttp(baseUrl('/api/static/company.json'), data)

// 产品演示地址
export const getSisurl = (data) => getHttp(baseUrl('/api/static/sisurl.json'), data)

// 应用案例
export const getUserurl = (data) => getHttp(baseUrl('/api/static/userUrl.json'), data)
