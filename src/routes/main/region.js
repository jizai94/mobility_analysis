import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'region.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Region = require('VIEW/Region').default
      const reducer = require('REDUCER/region').default
      injectReducer(store, { key: 'region', reducer })
      cb(null, Region)
    }, 'Region')
  }
})
