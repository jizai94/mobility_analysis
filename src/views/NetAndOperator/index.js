import connect from 'STORE/connect'
import NetAndOperator from './NetAndOperator'
import { netAndOperator, selectChange, tabChange, timeChange } from 'REDUCER/netAndOperator'

export default connect(
  state => ({
    data0: state.netAndOperator.data0,
    data1: state.netAndOperator.data1
  }),
  {
    netAndOperator
  },
  NetAndOperator
)
