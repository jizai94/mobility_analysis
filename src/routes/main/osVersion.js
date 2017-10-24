import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'osVersion.html',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const OsVersion = require('VIEW/OsVersion').default
      const reducer = require('REDUCER/osVersion').default
      injectReducer(store, { key: 'osVersion', reducer })
      cb(null, OsVersion)
    }, 'osVersion')
  }
})