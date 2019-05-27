import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'


import  view from './ivew'
import 'iview/dist/styles/iview.css'
view(Vue)

import Message from './common/message'
Vue.use(Message)


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
