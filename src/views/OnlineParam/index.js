import connect from 'STORE/connect'
import { selectOnlineParam, createOnlineParam, chooseOnlineParamAction, updateOnlineParam, selectBuried, createBuried, chooseBuriedAction, updateBuried, deleteBuried } from 'REDUCER/onlineParam'
import OnlineParamView from './OnlineParam'

export default connect(

  state => ({
	 state: state.onlineParam
  }),

  {
   	selectOnlineParam,
   	createOnlineParam,
   	chooseOnlineParamAction,
   	updateOnlineParam,
   	selectBuried,
   	createBuried,
   	chooseBuriedAction,
   	updateBuried,
   	deleteBuried
  },

  OnlineParamView
)
