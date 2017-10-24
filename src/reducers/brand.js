import NProgress from 'nprogress'
import { message } from 'antd'
import API from 'CONSTANT/api'
import { brandAction ,brandTableAction } from './request/brand'
import { getTime } from 'GLOBAL'

const getDateArr = (start,end) => {
  let dateArr = [],oneDay = 1000 * 24 * 60 *60
  while(start<end){   
    dateArr.push(getTime(start))
    start+= oneDay
  }
  return dateArr 
}

export const brand = (data,state,success, fail) => (dispatch, getState) => {
  const newData = {
      ec_platform: data.ec_platform,
      ec_appKey: data.ec_appKey,
      ec_ranges_start: data.ec_ranges_start,
      ec_ranges_end: data.ec_ranges_end,
      ec_app_version: data.ec_app_version,
      ec_tab: state,
      tranTime:data.tranTime,
      ec_brands:data.ec_brands
    }
    // let dateArr = getDateArr(data.ec_ranges_start,data.ec_ranges_end)
    dispatch(brandAction(newData)).then(action => {
      let brandOutput = action.data.body.brandOutput
      let dateArr = [] ,brandArr = [],seriesData={}, series=[], date = '',arrLength='' ,arrL =''
      if(action.data.body.errorCode == "0"){
        success()
        brandOutput.map((item)=>{
          let subBrandOutput = item.subBrandOutput              
          subBrandOutput.map((item,i,arr) => {
            date = getTime(item.date)
            arrLength = arr.length
            if(brandArr.length<arrLength && item.brand){
              brandArr.push(item.brand);
            }
            if(typeof(seriesData[i])=='undefined'){
              seriesData[i]=[]
            }
            seriesData[i].push(item.num);           
          })
          dateArr.push(date)
        })
        console.log(seriesData)
        for(var i=0; i<arrLength;i++){
          series.push({
                name: brandArr[i],
                type: 'line',
                symbol: 'circle',
                symbolSize: 8,
                data: seriesData[i]
            })
        }
        dispatch({
          type:"BRAND",
          brandArr,
          dateArr,
          series,
          state
        })
      }else{
        fail()
      }
    })
}

export const brandTable = (data,state,success, fail) => (dispatch, getState) => {
  const newTableData = {
      ec_platform: data.ec_platform,
      ec_appKey: data.ec_appKey,
      ec_ranges_start: data.ec_ranges_start,
      ec_ranges_end: data.ec_ranges_end,
      ec_app_version: data.ec_app_version
    }
    dispatch(brandTableAction(newTableData)).then(action => {
      success()
      let brandTableOutput = action.data.body.brandTableOutput
      brandTableOutput.forEach((item,i) => {
        //计算人均使用次数、次均使用时长
        item.active_user == 0 ? item.avg_start_count = 0.0 : item.avg_start_count = item.start_times/item.active_user
        item.used_times == 0 ? item.avg_time = 0.0 : item.avg_time = item.duration_time/item.used_times/1000
      })
      dispatch({
        type:"BRANDTABLE",
        dataTable:brandTableOutput
      })
    })
}

const initialState = {
  dataTable:[],
  brandArr:[],
  dateArr:[],
  series:[],
  state:''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BRANDTABLE':
      return {
        ...state,
        dataTable:action.dataTable
      }
    case 'BRAND':
      return {
        ...state,
        brandArr:action.brandArr,
        dateArr:action.dateArr,
        series:action.series,
        state:action.state
      }
    default:
      return state
  }
}
