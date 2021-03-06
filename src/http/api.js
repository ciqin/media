/**
 * 此文件为接口统一管理文件
 */
import api from '../path';
 const baseUrl = url => {

     if ((url.includes('api') || url.includes('test')) && process.env.NODE_ENV !== 'development' ) {
         return api.API_URL+url.split('/').splice(2).join('/')
     } else {
         return url
     }
 }

import { getHttp, postHttp ,upload} from "./httpService"
import Axios from "_axios@0.18.1@axios"

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
export const getRole = data => getHttp(baseUrl('/test/role/getList'), data)

//  管理员添加
export const addRole = data => postHttp(baseUrl('/test/role/add'), data)

//  部门列表
export const getdepartmentlist = data => postHttp(baseUrl('/test/role/getdepartmentlist'), data)

//  管理员删除
export const removeRole = data => postHttp(baseUrl('/test/role/deleteById'), data)

//  对应id管理员信息
export const selectByIdRole = data => postHttp(baseUrl('/test/role/selectById'), data)

// 更新修改id管理员信息
export const updateRole = data => postHttp(baseUrl('/test/role/update'), data)

// 应用案例上传文件

export const uploadFile = (data,config) => upload(baseUrl('/test/upload/upfiles'),data,config)

// 应用案例文件信息编辑修改
export const updateFileInfo = (data) => postHttp(baseUrl('/test/system/update'),data)

// 应用案例文件删除

export const removeFile = (data) => postHttp(baseUrl('/test/system/deleteById'),data)




// 获取侧边栏项目

export const getSiderBar = (data) => getHttp(baseUrl('/test/firstproduct/getAllList'),data)

// 获取内容页的列表信息
export const getContentList = (data) => postHttp(baseUrl('/test/appl/getFirstList'),data)

//产品演示列表
export const getProductDemo = (data) => postHttp(baseUrl('/test/appl/getProductUrl'),data)

//修改产品演示地址
export const updateProductUrl = (data) => postHttp(baseUrl('/test/appl/updateProductUrl'),data)

// 权限管理-资料管理-应用案例管理-添加应用案例

export const addApplicationCase = (data) => postHttp(baseUrl('/test/appl/addFirstSecond'),data)

// 权限管理-资料管理-应用案例管理-修改应用案例名称

export const updateCaseName = (data) => postHttp(baseUrl('/test/upload/updateDisName'),data)

// 权限管理-资料管理-应用案例管理-删除案例文件

export const deleteFile = (data) => postHttp(baseUrl('/test/upload/deleteFile'),data)

// 权限管理-资料管理-应用案例管理-文件内容展示

export const  getCasesContent = (data) => postHttp(baseUrl('/test/appl/getFileList'),data)

// export const getContentList1 = (data) => getHttp(baseUrl('/test/appl/getProductUrl'),data)

// 上传文件接口
export const uploadFile1 = (data,config) => upload(baseUrl('/test/upload/updateUrl'),data,config)

// 权限管理-资料管理-应用案例管理-添加地址接口
/*
*@method addLink
*@param {String} url - 接口url
*@param {Object} data - 传入参数
*@param {String} data.name -地址名称
*@param {String} data.url - 地址的url地址
*@param {String} data.auto_id - 对应产品的pid
*@return {Object} promise类，resovle数据为String类型的数据
*/
export const addLink = (data)=> postHttp(baseUrl('/test/appl/addUrl'),data)

// 权限管理-资料管理-应用案例管理-修改地址接口

export const editLink = (data)=> postHttp(baseUrl('/test/appl/updateProUrlForDZ'),data)

// 权限管理-资料管理-应用案例管理-删除地址接口

export const delteLink = (data)=> postHttp(baseUrl('/test/appl/deleteProductUrl'),data)


// 获取文件下载链接接口

export const getDownloadLink = (data) => postHttp(baseUrl('/test/appl/getRealFileUrl'),data)

// 项目管理应用案例行业修改接口 appl/updateProductName

export const updateVendor = (data) => postHttp(baseUrl('/test/appl/updateProductName'),data)

//项目管理应用案例行业删除接口 appl/delFirstSecond

export const deleteVendor = (data) => postHttp(baseUrl('/test/appl/delFirstSecond'),data)

export const uploadFile2 = (data,config) => upload(baseUrl('/test/appl/addProduct'),data,config)
export const uploadFile3 = (data,config) => upload(baseUrl('/test/appl/updateProductNameAndIcon'),data,config)

// 部门名称修改 updateDepartment

export const updateDepartment = (data) => postHttp(baseUrl("/test/departMent/updateDepartMent"),data)
