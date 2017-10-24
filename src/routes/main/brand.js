import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'brand.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Brand = require('VIEW/Brand').default
      const reducer = require('REDUCER/brand').default
      injectReducer(store, { key: 'brand', reducer })
      cb(null, Brand)
    }, 'Brand')
  }
})
