import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'event.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Event = require('VIEW/Event').default
      const reducer = require('REDUCER/event').default
      injectReducer(store, { key: 'event', reducer })
      cb(null, Event)
    }, 'Event')
  }
})
