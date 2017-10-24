import connect from 'STORE/connect'
import resolutionView from './resolutionView'
import { getDataList } from 'REDUCER/resolution'

export default connect(
	state => ({
		state: state.resolution,
	}),
	{
		getDataList
	},
	resolutionView
)