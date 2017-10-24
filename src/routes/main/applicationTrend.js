import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'applicationTrend.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ApplicationTrendView = require('VIEW/ApplicationTrend').default
      const reducer = require('REDUCER/applicationTrend').default
      injectReducer(store, { key: 'applicationTrend', reducer })
      cb(null, ApplicationTrendView)
    }, 'ApplicationTrendView')
  }
})