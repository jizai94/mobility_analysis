import connect from 'STORE/connect'
import eventManageView from './eventManageView'
import { eventManage,eventUpDateManage,eventDeleteManage } from 'REDUCER/eventManage'

export default connect(
	state => ({
		dataTable: state.eventManage.dataTable
	}),
	{
		eventManage,
		eventUpDateManage,
		eventDeleteManage
	},
	eventManageView
)