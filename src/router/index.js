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
        path: '/index/test/:id',
        name: 'test',
        component:resolve => require(['@/components/test/test'], resolve)
      },
      {
        path: '/index/company/:id',
        name: 'company',
        component:  resolve => require(['@/components/company/company'], resolve),
      },
      {
        path: '/index/demonstration/',
        name: 'com',
        component:resolve => require(['@/components/demonstration/demonstration'], resolve)
      },
      {
        path: '/index/wenhai/:id',
        name: 'wenhai',
        component:resolve => require(['@/components/wenhai/wenhai'], resolve)
      },
      {
        path: '/index/certification/:id',
        name: 'certification',
        component:resolve => require(['@/components/certification/certification'], resolve)
      },
      {
        path: '/index/qingtian/:id',
        name: 'qingtian',
        component:resolve => require(['@/components/qingtian/qingtian'], resolve),
      },
      {
        path: '/index/application/',
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
        path: '/index/hongqi/:id',
        name: 'hongqi',
        component:resolve => require(['@/components/hongqi/hongqi'], resolve)
      },
      {
        path: '/index/system/',
        name: 'system',
        component:resolve => require(['@/components/system/system'], resolve),
        children:[
            {
              path: '/index/system/user',
              name: 'user',
              component:resolve => require(['@/components/system/user/user'], resolve)
            },
            {
              path: '/index/system/department/:id',
              name: 'department',
              component:resolve => require(['@/components/system/department/department'], resolve)
            },
            {
              path: '/index/system/vendor',
              name: 'vendor',
              component:resolve => require(['@/components/system/proj/vendor'], resolve)
            },
            {
              path: '/index/system/proj',
              name: 'proj',
              component:resolve => require(['@/components/system/proj/proj'], resolve)
            },
            {
              path: '/index/system/wensiManage',
              name: 'wensiManage',
              component:resolve => require(['@/components/system/proj/wensiManage'], resolve)
            },
            {
              path: '/index/system/certification',
              name: 'wensiManage',
              component:resolve => require(['@/components/system/proj/certification'], resolve)
            },
            {
              path: '/index/system/product',
              name: 'productShow',
              component:resolve => require(['@/components/system/proj/product'], resolve)
            },
            // {
            //   path: '/index/system/mytest',
            //   name: 'test1',
            //   component:resolve => require(['@/components/test/test'], resolve)
            // },
            {
              path: '/index/system/project/:id',
              name: 'project',
              component:resolve => require(['@/components/system/com/com'], resolve)
            },
            {
              path: '/index/system/yanshi/:id',
              name: 'project',
              component:resolve => require(['@/components/system/com/yanshi'], resolve)
            },
            {
              path: '/index/system/wensi/:id',
              name: 'project',
              component:resolve => require(['@/components/system/com/wensi'], resolve)
            },
            {
              path: '/index/system/yinyong/:id',
              name: 'project',
              component:resolve => require(['@/components/system/com/yinyong'], resolve)
            },
            {
              path: '/index/system/certificationFile/:id',
              name: 'project',
              component:resolve => require(['@/components/system/com/certificationFile'], resolve)
            },
            
            {
              path: '/index/system/role',
              name: 'role',
              component:resolve => require(['@/components/system/role/role'], resolve)
            },
          
        ]
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    component:resolve => require(['@/components/login/login'], resolve)
  },
  
]

const router = new Router({
  // mode : 'history',
  mode: 'hash',
  linkActiveClass: 'active_change',
  // base:'/wgproduct/',
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
