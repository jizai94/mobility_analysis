import NProgress from 'nprogress'
import { message } from 'antd'
import md5 from 'md5'
import API from 'CONSTANT/api'
import { regionAction } from './request/region'

//转为占比
export const turnHundred = (i,all) => {
  if( i == 0 ){
    return 0
  }else{
    return (Number(i)/all * 100).toFixed(2) + '%'
  }
}

//排序方法
export const sortByKey = (arr, key) => {  
    for(let i=0;i<arr.length-1;i++){  
        for(let j=i+1;j<arr.length;j++){  
            if(arr[i][key]<arr[j][key]){
                let temp=arr[i];  
                arr[i]=arr[j];  
                arr[j]=temp;  
            }  
        }  
    }   
    return arr;  
} 

let arr1 = [],arr2= [],arr3= [],arr4= [],arr5= [],arr6 =[],arrNow =[];

export const menuChange = (newState) => (dispatch, getState) => {
  arrNow =[];
  if( newState == "ACTIVEUSER") arrNow = sortByKey(arr1,'value')
  else if( newState == "ADDUSER") arrNow = sortByKey(arr2,'value')
  else if( newState == "LOGINMEMBER") arrNow = sortByKey(arr3,'value')
  else if( newState == "PERSTARTTIMES") arrNow = sortByKey(arr4,'value')
  else if( newState == "PERUSERTIMES") arrNow = sortByKey(arr5,'value')
  else arrNow = arr6
  console.log(arrNow)
  arrNow.forEach((item,i) => {
    item.nameSort = i+1
  })
  if(!newState){newState = "NONE"}
  dispatch({
     "type": newState,
     "data":{
        "arr1":arrNow,
        newState
     }
  })
}

export const region = (data,state,success, fail) => (dispatch, getState) => {
  let userAll1 = 0,userAll2 = 0,userAll3 = 0,userAll4 = 0,userAll5 = 0;//用户总数
  arr1 = [],arr2= [],arr3= [],arr4= [],arr5= [],arr6 =[],arrNow= [];
	const newData = {
    	platform: data.platform,
    	appkey: data.appkey,
    	date: data.date.replace(/\-/g, ''),
    	appVersion: data.appVersion
  	}
  	dispatch(regionAction(newData)).then(action => {
  		NProgress.done()
    	const dataBody = action.data.body
      let addrAnalysisTable = dataBody.addrAnalysisTable
      for(let i = 0 ; i<addrAnalysisTable.length;i++){
        userAll1 += Number(addrAnalysisTable[i].activeUser);
        userAll2 += Number(addrAnalysisTable[i].addUser);
        userAll3 += Number(addrAnalysisTable[i].loginMember);
        userAll4 += Number(addrAnalysisTable[i].perStartTimes);
        userAll5 += Number(addrAnalysisTable[i].perUserTime);
      }
      //排序
      switch(state){
        case "ACTIVEUSER":
            addrAnalysisTable = sortByKey(addrAnalysisTable,'activeUser')
            break; 
        case "ADDUSER":
            addrAnalysisTable = sortByKey(addrAnalysisTable,'addUser')
            break;
        case "LOGINMEMBER":
            addrAnalysisTable = sortByKey(addrAnalysisTable,'loginMember')
            break;
        case "PERSTARTTIMES":
            addrAnalysisTable = sortByKey(addrAnalysisTable,'perStartTimes')
            break;
        case "PERUSERTIMES":
            addrAnalysisTable = sortByKey(addrAnalysisTable,'perUserTime')
            break;
        default:
            addrAnalysisTable = sortByKey(addrAnalysisTable,'activeUser')
      } 
      addrAnalysisTable.forEach((item,i)=>{
          arr1.push({})
          arr1[i].name = item.province
          arr1[i].value = Number(item.activeUser)
          arr1[i].zb = turnHundred(item.activeUser,userAll1)
          arr1[i].nameSort = i+1
          arr2.push({})
          arr2[i].name = item.province
          arr2[i].value = Number(item.addUser)
          arr2[i].zb = turnHundred(item.addUser,userAll2)
          arr2[i].nameSort = i+1
          arr3.push({})
          arr3[i].name = item.province
          arr3[i].value = Number(item.loginMember)
          arr3[i].zb = turnHundred(item.loginMember,userAll3)
          arr3[i].nameSort = i+1
          arr4.push({})
          arr4[i].name = item.province
          arr4[i].value = Number(item.perStartTimes)
          arr4[i].zb = turnHundred(item.perStartTimes,userAll4)
          arr4[i].nameSort = i+1
          arr5.push({})
          arr5[i].name = item.province
          arr5[i].value = Number(item.perUserTime/1000)
          arr5[i].zb = turnHundred(item.perUserTime,userAll5)
          arr5[i].nameSort = i+1
          arr6.push({})
          arr6[i].name = item.province
          arr6[i].zb = 0
          arr6[i].value = 0
          arr6[i].nameSort = i+1
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
      console.log(arrNow)
      dispatch({
        'type':'REGION',
        'data':{
            arr1:arrNow,
            addrAnalysisTable           
        }
      })
  	})
}

const initialState = {
    arr1:[],
    str:''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REGION':
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
