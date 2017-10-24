/**
 * Created by Alex on 2017/5/3.
 */
import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'realCrash.html',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const RealCrashView = require('VIEW/RealCrash').default
      const reducer = require('REDUCER/realCrash').default
      injectReducer(store, { key: 'realCrash', reducer })
      cb(null, RealCrashView)
    }, 'RealCrashView')
  }
})
