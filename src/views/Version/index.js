import connect from 'STORE/connect'
import VersionView from './VersionView'
import { version, versionTablelist, verChoise } from 'REDUCER/version'

export default connect(
	state => ({
		dateArr:state.version.dateArr,
      	versionArr:state.version.versionArr,
      	series:state.version.series,
      	str:state.version.str,
      	dataTable:state.version.dataTable
	}),
	{
		version,
		versionTablelist,
		verChoise
	},
	VersionView
)