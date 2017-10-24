import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'applist.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Applist = require('VIEW/Applist').default
      const reducer = require('REDUCER/applist').default
      injectReducer(store, { key: 'applist', reducer })
      cb(null, Applist)
    }, 'Applist')
  }
})
