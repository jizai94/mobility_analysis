import connect from 'STORE/connect'
import CrashTrend from './CrashTrend'
import { crashTrend, crashTrendTable } from 'REDUCER/crashTrend'

export default connect(
  state => ({
    countList:state.crashTrend.countList,
    arrCrash:state.crashTrend.arrCrash,
    str:state.crashTrend.str,
    dateArr:state.crashTrend.dateArr
  }),
  {
    crashTrend,
    crashTrendTable
  },
  CrashTrend
)
