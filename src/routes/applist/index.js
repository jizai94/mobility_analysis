import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'applist',
  indexRoute: {
    component: require('VIEW/Applist').default,
    onEnter: () => {
      const reducer = require('REDUCER/applist').default
      injectReducer(store, { key: 'applist', reducer })
    }
  },

  getComponents(nextState, cb) {
    require.ensure([], require => {
      const Main = require('LAYOUT/AppListMain').default
      injectReducer(store, [{ 
        key: 'main', 
        reducer: require('REDUCER/common/main').default
      }, {
        key: 'menu',
        reducer: require('REDUCER/common/menu').default
      }, {
        key: 'bindRole',
        reducer: require('REDUCER/common/bindRole').default
      }, {
        key: 'branchTree',
        reducer: require('REDUCER/common/branchTree').default
      }, {
        key: 'config',
        reducer: require('REDUCER/common/config').default
      }, {
        key: 'strategy',
        reducer: require('REDUCER/common/strategy').default
      },{
        key:'subHeader',
        reducer:require('REDUCER/common/subHeader').default
      }])
      cb(null, Main)
    }, 'main')
  },

  getChildRoutes(location, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./applist').default(store),
        require('./downloadSDK').default(store)
      ])
    })
  }
})