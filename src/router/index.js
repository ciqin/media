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
        path: '/index/test',
        name: 'test',
        component:resolve => require(['@/components/test/test'], resolve)
      },
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
      {
        path: '/index/qingtian',
        name: 'qingtian',
        component:resolve => require(['@/components/qingtian/qingtian'], resolve),
      },
      {
        path: '/index/application',
        name: 'application',
        component:  resolve => require(['@/components/application/application'], resolve),
        children:[
          {
            path: '/ppt',
            name: 'ppt',
            component:resolve => require(['@/components/application/pptlist'], resolve),
          },{
            path: '/word',
            name: 'word',
            component:resolve => require(['@/components/application/wordlist'], resolve),
          },{
            path: '/prodect',
            name: 'prodect',
            component:resolve => require(['@/components/application/productlist'], resolve),
          },{
            path: '/video',
            name: 'video',
            component:resolve => require(['@/components/application/videolist'], resolve),
          },{
            path: '/useurl',
            name: 'useurl',
            component:resolve => require(['@/components/application/urllist'], resolve),
          }
        ]
      },
      {
        path: '/index/hongqi',
        name: 'hongqi',
        component:resolve => require(['@/components/hongqi/hongqi'], resolve)
      },
      {
        path: '/index/system',
        name: 'system',
        component:resolve => require(['@/components/system/system'], resolve),
        children:[
            {
              path: '/index/system/user',
              name: 'user',
              component:resolve => require(['@/components/system/user/user'], resolve)
            },
            {
              path: '/index/system/project',
              name: 'project',
              component:resolve => require(['@/components/system/com/com'], resolve)
            },
            {
              path: '/index/system/yanshi',
              name: 'project',
              component:resolve => require(['@/components/system/com/yanshi'], resolve)
            },
            {
              path: '/index/system/wensi',
              name: 'project',
              component:resolve => require(['@/components/system/com/wensi'], resolve)
            },
            {
              path: '/index/system/yinyong',
              name: 'project',
              component:resolve => require(['@/components/system/com/yinyong'], resolve)
            },
            {
              path: '/index/system/role',
              name: 'role',
              component:resolve => require(['@/components/system/role/role'], resolve)
            },
            {
              path: '/index/system/department',
              name: 'department',
              component:resolve => require(['@/components/system/department/department'], resolve)
            }
        ]
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    component:resolve => require(['@/components/login/login'], resolve)
  },{
    path: '/mytest',
    name: 'test1',
    component:resolve => require(['@/components/test/test'], resolve)
  },
  
]

const router = new Router({
  mode : 'history',
  linkActiveClass: 'active_change',
  routes
})
router.beforeEach((to, from, next) => {
  // window.addEventListener("load",function () {
  //   //location.href = "/index/company"
  //   // console.log(next)
  //   // return ;
  // })
  if(to.path === "/") {
      next()
  }else {
    if(localStorage.getItem("islogin") === "login") {
        window.localStorage.setItem("link",to.fullPath)
        next();
    }else {
        next({"path":"/"})
        // next()
    }
  } 
  //console.log(to.meta)
  // if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
  //     if (store.state.token) {  // 通过vuex state获取当前的token是否存在
  //         next();
  //     }
  //     else {
  //         next({
  //             path: '/',
  //             //query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //         })
  //     }
  // }
  // else {
  //     next();
  // }
})

export default router
