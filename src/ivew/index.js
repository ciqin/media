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
  Input,
  Drawer,
  FormItem,
  Table,
  Form,
  MenuGroup,
  DropdownItem,
  DropdownMenu,
  Modal
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
  Vue.component('Drawer', Drawer)
  Vue.component('FormItem', FormItem)
  Vue.component('Table', Table)
  Vue.component('Form', Form)
  Vue.component('MenuGroup', MenuGroup)
  Vue.component('DropdownMenu', DropdownMenu)
  Vue.component('DropdownItem', DropdownItem)
  Vue.component('Modal', Modal)
}


export default view
