import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'pageParam.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const pageParam = require('VIEW/pageParam').default
      // const reducer = require('REDUCER/demo').default
      // injectReducer(store, { key: 'todayDetails', reducer })
      cb(null, pageParam)
    }, 'pageParam')
  }
})