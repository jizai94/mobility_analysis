import connect from 'STORE/connect'
import OsVersionView from './OsVersionView'
import { getTableData, getChartData } from 'REDUCER/osVersion'

export default connect(
	state => ({
		state: state.osVersion
	}),

	{ getTableData, getChartData },
	
	OsVersionView
)