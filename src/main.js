import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'


import  view from './ivew'
import 'iview/dist/styles/iview.css'
import Flag from './assets/js/util.js'
view(Vue)
Vue.prototype.falg = Flag;
import Message from './common/message'
Vue.use(Message)


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
