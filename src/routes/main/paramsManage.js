import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'paramsManage.html',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ParamsManage = require('VIEW/ParamsManage').default
      // const reducer = require('REDUCER/osVersion').default
      // injectReducer(store, { key: 'osVersion', reducer })
      cb(null, ParamsManage)
    }, 'ParamsManage')
  }
})