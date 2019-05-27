
const createState = (data, type) => {
  let object = {}
  Object.values(data).forEach(item => {
    if (_.isArray(item)) {
      item.forEach(val => {
        const state = _.camelCase(_.replace(val, type, ''))
        object = Object.assign(object, { [state] : type === 'fetch' ? {} : '' })
      })
    }
  })
  return object
}

export default createState
