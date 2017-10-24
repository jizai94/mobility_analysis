import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'pagePath.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const PagePath = require('VIEW/PagePath').default
      // const reducer = require('REDUCER/demo').default
      // injectReducer(store, { key: 'todayDetails', reducer })
      cb(null, PagePath)
    }, 'PagePath')
  }
})