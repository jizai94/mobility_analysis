import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'userActivity.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const UserActivity = require('VIEW/userActivity').default
      const reducer = require('REDUCER/userActivity').default
      injectReducer(store, { key: 'userActivity', reducer })
      cb(null, UserActivity)
    }, 'UserActivity')
  }
})