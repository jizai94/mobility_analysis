import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'channelManage.html',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ChannelManage = require('VIEW/ChannelManage').default
      const reducer = require('REDUCER/channelManage').default
      injectReducer(store, { key: 'channelManage', reducer })
      cb(null, ChannelManage)
    }, 'ChannelManage')
  }
})
