import NProgress from 'nprogress'
import { message } from 'antd'
import md5 from 'md5'
import API from 'CONSTANT/api'
import { versionAction } from './request/version'
import { turnHundred } from './region'


let dateArr=[],versionArr=[],arr1=[],arr2 =[],stateNow; 

const dateFormat = (date) => {
  return date.substr(0,4) + '-' + date.substr(4,2) + '-' +  date.substr(6,2)
}

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

export const verChoise = (data,state,verChoise) => (dispatch, getState) => {
    dateArr = [],versionArr =[],arr1=[],arr2 =[];
    const newData = {
      platform: data.platform,
      beginTime: data.beginTime.replace(/\-/g, ''),
      appkey: data.appkey,
      endTime: data.endTime.replace(/\-/g, '')
    }
    dispatch(versionAction(newData)).then(action => {
      console.log(action,verChoise)
      if(action.data.body.errorCode == "0"){
        let versionAnalysisList = action.data.body.versionAnalysisList
        let dateArr =[],versionArr = [],seriesData={}, series=[], userArr =[],date = '',arrLength='',appVersion=''
        versionAnalysisList.map((item,i)=>{
          let versionAnalysisBack = sortByKey(item.versionAnalysisBack,'date')
          versionAnalysisBack.map((item,i,arr) => {
            if(item.appVersion == verChoise ){
              dateArr.push(dateFormat(item.date))
              if(state == 'perUserTime'){
                userArr.push(item.perUserTime/1000)
              }else{
                userArr.push(item[state])
              } 
            }                    
          })
        })
        versionArr.push(verChoise)
        console.log(dateArr,versionArr,userArr)
        series.push({
                name: versionArr,
                type: 'line',
                symbol: 'circle',
                symbolSize: 8,
                data: userArr,
                itemStyle: {
                      normal: {
                          color: 'rgb(0, 153, 204)'
                      }
                }
        })
        dispatch({
          type:"VERSION",
          dateArr,
          versionArr,
          series,
          str:state
        })
      }
    })
}

export const version = (data,state,success, fail) => (dispatch, getState) => {
    dateArr = [],versionArr =[],arr1=[],arr2 =[];
    const newData = {
      platform: data.platform,
      beginTime: data.beginTime.replace(/\-/g, ''),
      appkey: data.appkey,
      endTime: data.endTime.replace(/\-/g, '')
    }      
    dispatch(versionAction(newData)).then(action => {
      NProgress.done()    
      if(action.data.body.errorCode == "0"){
        success()
        let versionAnalysisList = action.data.body.versionAnalysisList
        let dateArr =[],versionArr = [],seriesData={}, series=[], userArr =[],date = '',arrM=0,arrLength='',appVersion=''
        versionAnalysisList.map((item,i)=>{
          let versionAnalysisBack = sortByKey(item.versionAnalysisBack,'date')
          versionAnalysisBack.map((item,i,arr) => {
            if(arr.length > arrM) arrM = arr.length
            arrLength = arr.length
            appVersion = item.appVersion            
            if(userArr.length < arrLength){
              if(state == 'perUserTime'){
                userArr.push(item.perUserTime/1000)
              }else{
                userArr.push(item[state])
              }           
            }
            if(dateArr.length < arrLength){
              dateArr.push(dateFormat(item.date))
            }           
          })
          seriesData[i] = userArr
          userArr = []
          versionArr.push(appVersion)
        })   
        for(let x in seriesData){
          while(seriesData[x].length < arrM){
            seriesData[x].unshift("0")
          }
        }
        let color  = ['rgb(0, 153, 204)']
        for(let i=0; i<versionAnalysisList.length;i++){
          let zlevel = 0
          i == 0 ? zlevel = 10:zlevel = 0　　
          series.push({
                name: versionArr[i],
                type: 'line',
                symbol: 'circle',
                symbolSize: 8,
                zlevel:zlevel,
                data: seriesData[i],
                itemStyle: {
                      normal: {
                          color: color[i]
                      }
                }
            })
        }
        console.log(dateArr,versionArr,seriesData)  
        dispatch({
          type:"VERSION",
          dateArr,
          versionArr,
          series,
          str:state
        })
      }else{
        fail()
      }           
    })
}

export const versionTablelist = (data,suc,fail) => (dispatch,getState)=> {
    const newData = {
      platform: data.platform,
      beginTime: data.beginTime.replace(/\-/g, ''),
      appkey: data.appkey,
      endTime: data.endTime.replace(/\-/g, ''),
      appVersion:data.appVersion
    }
    let arrUsers =[],arrAddUsers = []
    dispatch(versionAction(newData)).then(action => {
      if(action.data.body.errorCode == '0'){
        const table = action.data.body.versionAnalysisList,dataTable = []
        table.forEach((item) =>{
          if(item.versionAnalysisBack.length !== 0){
            dataTable.push(item.versionAnalysisBack[0])
          }          
        })
        console.log(dataTable)
        if(dataTable.length == 0){
          dispatch({
            type:"VERSIONTABLE",
            dataTable:[]
          })
        }else{
          dataTable.forEach((item) => {
            if(item.appVersion == 'all'){
              arrUsers = item.activeUser
              arrAddUsers = item.addUser
            }            
          })
          dataTable.forEach((item) => {
            item.zb1 = turnHundred(item.activeUser,arrUsers)
            item.zb2 = turnHundred(item.addUser,arrAddUsers)
          })
          dispatch({
            type:"VERSION",
            dataTable
          })
        }
      }else{
        fail()
      }
    })          
}
const initialState = {
    dateArr:[],
    versionArr:[],
    str:'',
    dataTable:[],
    series:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'VERSION':
      return {
        ...state,
        ...action
      }
    case 'VERSIONTABLE':
      return {
        ...state,
        ...action
      }
    default:
      return state
  }
}
