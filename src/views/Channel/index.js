import connect from 'STORE/connect'
import ChannelAnalysisView from './ChannelAnalysisView'
import { getTableData, getChartData, getChannelList } from 'REDUCER/channelAnalysis'

export default connect(
  state => ({
    state: state.channelAnalysis
  }),

  {
	getTableData, 
	getChartData,
	getChannelList
  }, 

  ChannelAnalysisView
)
