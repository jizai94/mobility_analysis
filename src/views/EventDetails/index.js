import connect from 'STORE/connect'
import eventDetailsView from './eventDetailsView'
import { eventDetails } from 'REDUCER/eventDetails'

export default connect(
	state => ({
		dataTable:state.eventDetails.dataTable,
		avgDateTriggerNum:state.eventDetails.avgDateTriggerNum,
		avgDateTriggerUser:state.eventDetails.avgDateTriggerUser,
		perUserTime:state.eventDetails.perUserTime,
		avgUserTime:state.eventDetails.avgUserTime,
		dateArr:state.eventDetails.dateArr,
		arrDate:state.eventDetails.arrDate,
		str:state.eventDetails.str
	}),
	{
		eventDetails
	},
	eventDetailsView
)