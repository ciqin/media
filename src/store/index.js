/**
 * 此文件为vuex的入口文件，导入state，getter，mutations以及actions
 */

import vue from 'vue'
import vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

vue.use(vuex)

export default new vuex.Store({
  state,
  mutations,
  actions
})
