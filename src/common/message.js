/**
 * 此文件为将一些ivew的组件方法挂载到vue实例原型上，通过this的方法调用
 */
import { Message } from 'iview'

export default {
  install (Vue) {
    Vue.prototype.$message = function (content, duration = 2) {
      Message.info({
        content, duration
      })
    }
  }
}
