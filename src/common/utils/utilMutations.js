/**
 *此文件为生成mutatios的工具函数
 */

// 生成fetch类型的mutation
export const createFetchMutations = type => {
  const mutation_fetch_type = _.camelCase(type)
  const state_fetch_type = _.camelCase(_.replace(type, 'fetch', ''))
  return {
    [mutation_fetch_type] : (state, obj) => {
      state[state_fetch_type] = {...state[state_fetch_type], ...obj}
    }
  }
}


// 生成common类型的mutation
export const createCommonMutations = type => {
  const mutation_common_type = _.camelCase(type)
  const state_common_type = _.camelCase(_.replace(type, 'common', ''))
  return {
    [mutation_common_type] : (state, obj) => {
      state[state_common_type]= obj
    }
  }
}
