import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'pageRetain.html',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const PageRetain = require('VIEW/PageRetain').default
      // const reducer = require('REDUCER/osVersion').default
      // injectReducer(store, { key: 'osVersion', reducer })
      cb(null, PageRetain)
    }, 'PageRetain')
  }
})