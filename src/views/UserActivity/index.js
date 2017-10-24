import connect from 'STORE/connect'
import UserActivity from './UserActivity'
import { getTableData } from 'REDUCER/userActivity'

export default connect(
	state => ({
		state: state.userActivity
	}),
	{ getTableData },
	UserActivity
)