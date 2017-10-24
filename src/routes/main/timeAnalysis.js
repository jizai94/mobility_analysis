import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'timeAnalysis.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const TimeAnalysisView = require('VIEW/TimeAnalysis').default
      const reducer = require('REDUCER/timeAnalysis').default
      injectReducer(store, { key: 'timeAnalysis', reducer })
      cb(null, TimeAnalysisView)
    }, 'TimeAnalysisView')
  }
})