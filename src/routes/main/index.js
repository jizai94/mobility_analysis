import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'home',
  indexRoute: {
    component: require('VIEW/TodayDetails').default
  },

  getComponents(nextState, cb) {
    require.ensure([], require => {
      const Main = require('LAYOUT/Main').default
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
        require('./demo').default(store),
        require('./modelAnalysis').default(store),
        require('./osVersion').default(store),
        require('./resolution').default(store),
        require('./todayDetails').default(store),
        require('./applicationTrend').default(store),
        require('./timeAnalysis').default(store),
        require('./version').default(store),
        require('./brand').default(store),
        require('./region').default(store),
        require('./netAndOperator').default(store),
        require('./realCrash').default(store),
        require('./crashTrend').default(store),
        require('./crashDetail').default(store),
        require('./pagePath').default(store),
        require('./pageParam').default(store),
        require('./userActivity').default(store),
        require('./pageRetain').default(store),
        require('./paramsManage').default(store),
        require('./startCount').default(store),
        require('./useTime').default(store),
        require('./event').default(store),
        require('./eventManage').default(store),
        require('./eventDetails').default(store),
        require('./userRetain').default(store),
        require('./channelAnalysis').default(store),
        require('./channelManage').default(store),
        require('./onlineParam').default(store)
      ])
    })
  }
})
