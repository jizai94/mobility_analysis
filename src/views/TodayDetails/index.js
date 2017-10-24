import connect from 'STORE/connect'
import { todayDetails, changeMenu1, changeMenu2 } from 'REDUCER/todayDetails'
import TodayDetailsView from './TodayDetailsView'

export default connect(
	state => ({
		state: state.todayDetails
	}),
	{
		todayDetails,
		changeMenu1,
		changeMenu2
	},
	TodayDetailsView
)