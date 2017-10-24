import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'modelAnalysis.html',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ModelAnalysis = require('VIEW/ModelAnalysis').default
      const reducer = require('REDUCER/modelAnalysis').default
      injectReducer(store, { key: 'modelAnalysis', reducer })
      cb(null, ModelAnalysis)
    }, 'ModelAnalysis')
  }
})