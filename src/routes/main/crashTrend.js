/**
 * Created by Alex on 2017/5/3.
 */
import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'crashTrend.html',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const CrashTrendView = require('VIEW/CrashTrend').default
      const reducer = require('REDUCER/crashTrend').default
      injectReducer(store, { key: 'crashTrend', reducer })
      cb(null, CrashTrendView)
    }, 'CrashTrendView')
  }
})
