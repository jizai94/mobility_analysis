import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'userRetain.html',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const UserRetain = require('VIEW/UserRetain').default
      const reducer = require('REDUCER/userRetain').default
      injectReducer(store, { key: 'userRetain', reducer })
      cb(null, UserRetain)
    }, 'UserRetain')
  }
})