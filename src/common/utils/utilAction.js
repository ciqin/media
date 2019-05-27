/**
 *action的工具函数，通过http请求改变store 中state的值
 */
const createFetch = async (store, api, payload = {}, type) => {
  try { // 获取正确的返回值
    let response = await api(payload)
    store.commit(type, response)
  } catch (e) { // 获取错误的返回值
    console.log(e)
  }
}

export default createFetch
