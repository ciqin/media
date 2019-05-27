/**
 * 此文件统一导出mutation内容
 */
import types from '../types'
import { createFetchMutations, createCommonMutations } from '../../common/utils/utilMutations'

let mutations = {}


Object.keys(types).forEach(item => {
  
  const mutationsTypes = types[item]
  let mutationsItem = {}
  
  if (typeof mutationsTypes === 'object' && mutationsTypes instanceof Array) {
    mutationsTypes.forEach(type => {
      if (_.isString(type) && type.includes('fetch')) {
        const fetchMutations = createFetchMutations(type)
        mutationsItem = Object.assign({}, mutationsItem, fetchMutations)
      } else {
        const commonMutation = createCommonMutations(type)
        mutationsItem = Object.assign({}, mutationsItem, commonMutation)
      }
    })
  }
  mutations = Object.assign({}, mutations, mutationsItem)
})

mutations = Object.assign({}, mutations, {
  abs : function({state}, data) {}
})

export default mutations
