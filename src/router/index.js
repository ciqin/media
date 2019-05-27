import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)


const routes = [
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['@/components/index/index'], resolve),
    children:[
      {
        path: '/index/company',
        name: 'company',
        component:  resolve => require(['@/components/company/company'], resolve),
      },
      {
        path: '/index/demonstration',
        name: 'com',
        component:resolve => require(['@/components/demonstration/demonstration'], resolve)
      },
      {
        path: '/index/wenhai',
        name: 'wenhai',
        component:resolve => require(['@/components/wenhai/wenhai'], resolve)
      },
      // {
      //   path: '/index/qingtian',
      //   name: 'qingtian',
      //   component:resolve => require(['@/components/qingtian/qingtian'], resolve)
      // },
      // {
      //   path: '/index/hongqi',
      //   name: 'hongqi',
      //   component:resolve => require(['@/components/hongqi/hongqi'], resolve)
      // }
      //,
      // {
      //   path: '/index/yunji',
      //   name: 'yunji',
      //   component:resolve => require(['@/components/yunji/yunji'], resolve)
      // },{
      //   path: '/index/yayi',
      //   name: 'yayi',
      //   component:resolve => require(['@/components/yayi/yayi'], resolve)
      // },{
      //   path: '/index/wensi',
      //   name: 'wensi',
      //   component:resolve => require(['@/components/wensi/wensi'], resolve)
      // },{
      //   path: '/index/zhitu',
      //   name: 'zhitu',
      //   component:resolve => require(['@/components/zhitu/zhitu'], resolve)
      // },{
      //   path: '/index/jinzhunxian',
      //   name: 'jinzhunxian',
      //   component:resolve => require(['@/components/jinzhunxian/jinzhunxian'], resolve)
      // },{
      //   path: '/index/tianhu',
      //   name: 'tianhu',
      //   component:resolve => require(['@/components/tianhu/tianhu'], resolve)
      // },{
      //   path: '/index/other',
      //   name: 'other',
      //   component:resolve => require(['@/components/other/other'], resolve)
      // },
      // {
      //   // path: '/index/system',
      //   // name: 'system',
      //   // component:resolve => require(['@/components/system/system'], resolve),
      //   // children:[
      //   //     {
      //   //       path: '/index/system/com',
      //   //       name: 'com',
      //   //       component:resolve => require(['@/components/system/com/com'], resolve)
      //   //     },{
      //   //       path: '/index/system/user',
      //   //       name: 'user',
      //   //       component:resolve => require(['@/components/system/user/user'], resolve)
      //   //     },{
      //   //       path: '/index/system/role',
      //   //       name: 'role',
      //   //       component:resolve => require(['@/components/system/role/role'], resolve)
      //   //     },{
      //   //       path: '/index/system/department',
      //   //       name: 'department',
      //   //       component:resolve => require(['@/components/system/department/department'], resolve)
      //   //     }
      //   // ]
      // }
    ]
  },
  {
    path: '/',
    name: 'login',
    component:resolve => require(['@/components/login/login'], resolve)
  }
]

const router = new Router({
  mode : 'history',
  routes
})

export default router
