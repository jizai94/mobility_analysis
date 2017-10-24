import NProgress from 'nprogress'
import { message } from 'antd'
import md5 from 'md5'
import API from 'CONSTANT/api'
import { applicationTrendAction } from './request/applicationTrend'

const APPLICATIONTREND = 'APPLICATIONTREND';
let arr1 = [],arr2 = [],arr3 = [],arr4 = [],arr5 = [],arr6 = [],dateArr = [],arrNow =[];

//从小到大排序
export const sortByKey = (arr, key) => {  
    for(let i=0;i<arr.length-1;i++){  
        for(let j=i+1;j<arr.length;j++){  
            if(arr[i][key]>arr[j][key]){
                let temp=arr[i];  
                arr[i]=arr[j];  
                arr[j]=temp;  
            }  
        }  
    }   
    return arr;  
}

const dateFormat = (date) => {
  return date.substr(0,4) + '-' + date.substr(4,2) + '-' +  date.substr(6,2)
}

export const applicationTrend = (data,state,success, fail) => (dispatch, getState) => {
    const newData = {
      platform: data.platform,
      appkey: data.appkey,
      beginTime: data.beginTime.replace(/\-/g, ''),
      endTime: data.endTime.replace(/\-/g, ''),
      appVersion: data.appVersion,
      currentPage: data.currentPage,
      turnPageShowNum: data.turnPageShowNum
    }
    arr1 = [],arr2 = [],arr3 = [],arr4 = [],arr5 = [],arr6 = [],dateArr = [],arrNow =[]; 
    dispatch(applicationTrendAction(newData)).then(action => {
      NProgress.done()
      const dataBody = action.data.body
      if(dataBody.errorCode == '0'){
        let appTrendTable = dataBody.appTrendTable,
              appTrendTableWhole = dataBody.appTrendTableWhole
        //1、活跃用户 2、新增用户 3、登录会员 4、人均启动次数 5、次均使用时长
        appTrendTable = sortByKey(appTrendTable,'date')      
        appTrendTable.forEach((item) => {
          arr1.push(item.activeUser)
          arr2.push(item.addUser)
          arr3.push(item.loginMember)
          arr4.push(item.perStartTimes)
          arr5.push(item.perUserTime/1000)
          arr6.push(0)
          dateArr.push(dateFormat(item.date))
        })
        switch(state){
          case "ACTIVEUSER":
              arrNow = arr1
              break; 
          case "ADDUSER":
              arrNow = arr2
              break;
          case "LOGINMEMBER":
              arrNow = arr3
              break;
          case "PERSTARTTIMES":
              arrNow = arr4
              break;
          case "PERUSERTIMES":
              arrNow = arr5
              break;
          default:
              arrNow = arr6
        }
        dispatch({
           "type": APPLICATIONTREND,
           "data":{
              "appTrendTable":appTrendTable,
              "appTrendTableWhole":appTrendTableWhole,
              "arr1":arrNow,
              "dateArr":dateArr
           }
        })
      }else{
        fail()
      }         
    })
}

export const menuTab = (newState) => (dispatch,getState) => {
  let arrNow;
  if( newState == "ACTIVEUSER") arrNow = arr1
  else if( newState == "ADDUSER") arrNow = arr2
  else if( newState == "LOGINMEMBER") arrNow = arr3
  else if( newState == "PERSTARTTIMES") arrNow = arr4
  else if( newState == "PERUSERTIMES") arrNow = arr5
  else arrNow = arr6
  if(!newState){newState = "NONE"}
  dispatch({
     "type": newState,
     "data":{
        "arr1":arrNow,
        newState
     }
  })
}

const initialState = {
  data2:[],
  arr1:[],
  str:'',
  dateArr:[],
  newState:''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'APPLICATIONTREND':
      return {
        ...state,
        ...action.data
      }
    case 'ACTIVEUSER':
      return {
        ...state,
        ...action.data
      }
    case 'ADDUSER':
      return {
        ...state,
        ...action.data
      }
    case 'LOGINMEMBER':
      return {
        ...state,
        ...action.data
      }
    case 'PERSTARTTIMES':
      return {
        ...state,
        ...action.data
      }
    case 'PERUSERTIMES':
      return {
        ...state,
        ...action.data
      }
    case 'NONE':
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}
