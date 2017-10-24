import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'eventDetails.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const EventDetails = require('VIEW/EventDetails').default
      const reducer = require('REDUCER/eventDetails').default
      injectReducer(store, { key: 'eventDetails', reducer })
      cb(null, EventDetails)
    }, 'EventDetails')
  }
})
