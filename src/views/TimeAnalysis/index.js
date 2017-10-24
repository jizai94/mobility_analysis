import connect from 'STORE/connect'
import { timeAnalysis, changeMenu } from 'REDUCER/timeAnalysis'
import TimeAnalysisView from './TimeAnalysisView'

export default connect(
	state => ({
		state: state.timeAnalysis
	}),
	{
		timeAnalysis,
		changeMenu
	},
	TimeAnalysisView
)