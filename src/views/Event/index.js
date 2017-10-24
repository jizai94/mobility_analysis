import connect from 'STORE/connect'
import eventView from './eventView'
import { event } from 'REDUCER/event'

export default connect(
	state => ({
		dataTable: state.event.dataTable
	}),
	{
		event
	},
	eventView
)