import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'todayDetails.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const todayDetailsView = require('VIEW/TodayDetails').default
      const reducer = require('REDUCER/todayDetails').default
      injectReducer(store, { key: 'todayDetails', reducer })
      cb(null, todayDetailsView)
    }, 'todayDetailsView')
  },
})