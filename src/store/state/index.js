/**
 * 统一暴露state的数据
 */
import fetchState from './fetchState'
import commonState from './commonState'

export default {
  ...fetchState,
  ...commonState
}
