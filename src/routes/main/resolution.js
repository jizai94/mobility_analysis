import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'resolution.html',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Resolution = require('VIEW/Resolution').default
      const reducer = require('REDUCER/resolution').default
      injectReducer(store, { key: 'resolution', reducer })
      cb(null, Resolution)
    }, 'resolution')
  }
})