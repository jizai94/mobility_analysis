import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'onlineParam.html',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const OnlineParam = require('VIEW/OnlineParam').default
      const reducer = require('REDUCER/onlineParam').default
      injectReducer(store, { key: 'onlineParam', reducer })
      cb(null, OnlineParam)
    }, 'OnlineParam')
  }
})