import NProgress from 'nprogress'
import { crashTrendAction, crashTrendTableAction } from './request/crashTrend'
import { getTime } from 'GLOBAL'

const getDateArr = (start,count) => {
  let dateArr = [],oneDay = 1000 * 24 * 60 *60
  while(count>0){   
    dateArr.push(getTime(start))
    start+= oneDay
    count--
  }
  return dateArr 
}

//请求表格数据
export const crashTrendTable = (data,suc,fail) => (dispatch, getState) =>{
  const newTableData = {
      ec_platform: data.ec_platform,
      ec_appKey: data.ec_appKey,
      ec_ranges_start: data.ec_ranges_start,
      ec_ranges_end: data.ec_ranges_end,
      ec_app_version: data.ec_app_version,
    }
    dispatch(crashTrendTableAction(newTableData)).then(action => {
      if(action.data.body.errorCode == '0'){
        suc()
        let countList = action.data.body.countList
        dispatch({
          type:"TABLECRASH",
          countList
        })
      }else{
        fail()
      }

    })
} 

// 请求接口数据
export const crashTrend = (data,state,success,fail) => (dispatch, getState) => {
  
  dispatch(crashTrendAction(data)).then(action => {
    const dataBody = action.data.body
    success()
    let arrCrash = []
    if(dataBody.errorCode == '0'){
      let countList = dataBody.countList
      countList.map((item) => {
          arrCrash.push(item[state])
      })
      let start = data.ec_ranges_start
      let end = data.ec_ranges_end
      let tranTime = data.tranTime
      let dateArr = getDateArr(start,tranTime)
      console.log(dateArr)
      dispatch({
        type:"REALCRASH",
        arrCrash,
        dateArr,
        str:state
      })
    }else{
      fail()
    }      
  })
}



const initialState = {
  countList:[],
  arrCrash:[],
  dateArr:[],
  str:''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "REALCRASH" :
      return {
        ...state,
        arrCrash:action.arrCrash,
        dateArr:action.dateArr,
        str:action.str
      }

    case "TABLECRASH" :
      return {
        ...state,
        countList:action.countList
      }

    default:
      return state
  }
}
