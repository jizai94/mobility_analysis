import connect from 'STORE/connect'
import { selectChannel, createChannel, deleteChannel, updateChannel, chooseChannelAction } from 'REDUCER/channelManage'

import ChannelManageView from './ChannelManage'

export default connect(

  state => ({
	state: {
		...state.channelManage,
		platform: state.subHeader.platform
	}
  }),

  {
   	selectChannel,
  	createChannel,
  	deleteChannel,
  	updateChannel,
  	chooseChannelAction,
  },

  ChannelManageView
)
