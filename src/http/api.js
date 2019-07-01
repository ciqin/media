/**
 * 此文件为接口统一管理文件
 */
 const baseUrl = url => {
     if ((url.includes('api') || url.includes('test')) && process.env.NODE_ENV !== 'development' ) {
         return url.split('/').splice(2).join('/')
     } else {
         return url
     }
 }

import { getHttp, postHttp } from "./httpService"

//  login
export const getLogin = data => postHttp(baseUrl('/test/login'), data)

// 产品物料展示
export const getProduct = data => getHttp(baseUrl('/api/static/company.json'), data)

// 产品演示地址
export const getSisurl = data => getHttp(baseUrl('/api/static/sisurl.json'), data)

// 应用案例
export const getUserurl = data => getHttp(baseUrl('/api/static/userUrl.json'), data)

//  部门列表
export const getDepartment = data => postHttp(baseUrl('/test/departMent/getList'), data)

//  部门添加
export const addDepartment = data => postHttp(baseUrl('/test/departMent/add'), data)

//  部门删除
export const removeDepartment = data => postHttp(baseUrl('/test/departMent/deleteById'), data)


//  用户列表
export const getUserList = data => postHttp(baseUrl('/test/user/getUserList'), data)

//  用户添加
export const addUser = data => postHttp(baseUrl('/test/user/addUser'), data)

//  用户删除
export const removeUser = data => postHttp(baseUrl('/test/user/deleteByUserId'), data)

//  对应id用户信息
export const selectByIdtUser = data => postHttp(baseUrl('/test/user/selectById'), data)

//  更新修改id用户信息
export const updateUser = data => postHttp(baseUrl('/test/user/updateUser'), data)


//  获取应用案例列表json
export const getapplicationList = data => getHttp(baseUrl('/api/static/anli.json'), data)

//  管理员列表
export const getRole = data => postHttp(baseUrl('/test/role/getList'), data)

//  管理员添加
export const addRole = data => postHttp(baseUrl('/test/role/add'), data)

//  管理员删除
export const removeRole = data => getHttp(baseUrl('/test/role/deleteById'), data)

//  对应id管理员信息
export const selectByIdRole = data => getHttp(baseUrl('/test/role/selectById'), data)

// 更新修改id管理员信息
export const updateRole = data => getHttp(baseUrl('/test/role/update'), data)
