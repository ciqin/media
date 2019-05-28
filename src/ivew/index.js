/**
 * 此文件为ivew组件统一导入导出文件，ivew组件为按需加载
 */

import {
  Button,
  Message,
  Dropdown,
  Icon,
  Menu,
  MenuItem,
  Submenu,
  Row,
  Col,
  Input

} from 'iview'



const view = (Vue) => {
  Vue.component('Button', Button)
  Vue.component('Message', Message)
  Vue.component('Dropdown', Dropdown)
  Vue.component('Icon', Icon)
  Vue.component('Menu', Menu)
  Vue.component('MenuItem', MenuItem)
  Vue.component('Submenu', Submenu)
  Vue.component('Row', Row)
  Vue.component('Col', Col)
  Vue.component('Input', Input)
}


export default view
