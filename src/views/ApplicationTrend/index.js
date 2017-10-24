import connect from 'STORE/connect'
import ApplicationTrendView from './ApplicationTrendView'
import { applicationTrend , menuTab } from 'REDUCER/applicationTrend'

export default connect(
	state => ({
		data2:state.applicationTrend.appTrendTable,
		data1:state.applicationTrend.appTrendTableWhole,
		arrNow:state.applicationTrend.arr1,
		dateArr:state.applicationTrend.dateArr,
		str:state.applicationTrend.newState,
	}),
	{
		applicationTrend,
		menuTab
	},
	ApplicationTrendView
)