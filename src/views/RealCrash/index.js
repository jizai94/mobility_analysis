/**
 * Created by Alex on 2017/5/3.
 */
import connect from 'STORE/connect'
import RealCrash from './RealCrash'
import { realCrashDynamic, realCrashChart } from 'REDUCER/realCrash'

export default connect(
  state => ({
   	state: state.realCrash
  }),
  {
    realCrashDynamic,
    realCrashChart
  },
  RealCrash
)