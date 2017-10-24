import connect from 'STORE/connect'
import ModelAnalysisView from './ModelAnalysisView'
import { getTableData, getChartData } from 'REDUCER/modelAnalysis'

export default connect(
  state => ({
    state: state.modelAnalysis
  }),

  {
	getTableData, 
	getChartData
  }, 

  ModelAnalysisView
)
