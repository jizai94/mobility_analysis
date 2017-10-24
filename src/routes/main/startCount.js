/**
 * Created by Alex on 2017/5/8.
 */
import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'startCount.html',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const StartCountView = require('VIEW/StartCount').default
      // const reducer = require('REDUCER/demo').default
      // injectReducer(store, { key: 'todayDetails', reducer })
      cb(null, StartCountView)
    }, 'StartCountView')
  }
})
