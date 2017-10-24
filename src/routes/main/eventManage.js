import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'eventManage.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const EventManage = require('VIEW/EventManage').default
      const reducer = require('REDUCER/eventManage').default
      injectReducer(store, { key: 'eventManage', reducer })
      cb(null, EventManage)
    }, 'EventManage')
  }
})
