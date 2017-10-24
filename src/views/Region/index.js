import connect from 'STORE/connect'
import RegionView from './RegionView'
import { region ,menuChange } from 'REDUCER/region'

export default connect(
	state => ({
		data:state.region.addrAnalysisTable,
		arr1:state.region.arr1,
		str:state.region.newState
	}),

	{
		region,
		menuChange
	},
	
	RegionView
)