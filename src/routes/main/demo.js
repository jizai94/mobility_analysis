import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'demo.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const demoView = require('VIEW/demo').default
      const reducer = require('REDUCER/demo').default
      injectReducer(store, { key: 'demo', reducer })
      cb(null, demoView)
    }, 'demoView')
  }
})
