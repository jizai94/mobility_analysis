import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'downloadSDK.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const DownloadSDK = require('VIEW/DownloadSDK').default
      const reducer = require('REDUCER/downloadSDK').default
      injectReducer(store, { key: 'downloadSDK', reducer })
      cb(null, DownloadSDK)
    }, 'DownloadSDK')
  }
})
