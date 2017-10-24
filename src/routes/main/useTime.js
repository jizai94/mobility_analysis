/**
 * Created by Alex on 2017/5/8.
 */
import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'useTime.html',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const UseTimeView = require('VIEW/UseTime').default
      // const reducer = require('REDUCER/demo').default
      // injectReducer(store, { key: 'todayDetails', reducer })
      cb(null, UseTimeView)
    }, 'UseTimeView')
  }
})
