import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'channelAnalysis.html',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ChannelAnalysis = require('VIEW/Channel').default
      const reducer = require('REDUCER/channelAnalysis').default
      injectReducer(store, { key: 'channelAnalysis', reducer })
      cb(null, ChannelAnalysis)
    }, 'ChannelAnalysis')
  }
})
