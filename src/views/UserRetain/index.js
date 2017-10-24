import connect from 'STORE/connect'
import UserRetainView from './UserRetainView'
import { userRetain } from 'REDUCER/userRetain'

export default connect(
	state => ({
		dataTable:state.userRetain.dataTable,
		dateArr:state.userRetain.dateArr,
		arr:state.userRetain.arr,
		str:state.userRetain.str
	}),
	{
		userRetain
	},
	UserRetainView
)