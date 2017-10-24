import connect from 'STORE/connect'
import demoView from './demoView'
import { demoFun } from 'REDUCER/demo'

export default connect(
	state => ({
		'mess': state.demo.mess
	}),
	{
		demoFun
	},
	demoView
)