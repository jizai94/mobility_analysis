import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'version.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Version = require('VIEW/Version').default
      const reducer = require('REDUCER/version').default
      injectReducer(store, { key: 'version', reducer })
      cb(null, Version)
    }, 'Version')
  }
})
