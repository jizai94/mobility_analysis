import NProgress from 'nprogress'
import { message } from 'antd'
import { userRetainAction } from './request/userRetain'
import { getTime } from 'GLOBAL'

const dateFormat = (date) => {
  return date.substr(0,4) + '-' + date.substr(4,2) + '-' +  date.substr(6,2)
}

export const userRetain = (data,state,suc,fail) => (dispatch,getState)=> {
    dispatch(userRetainAction(data)).then(action => {
      suc()
      let dateArr = [], arr =[]
      if(action.data.body.errorCode == '0'){
        let userRetentionBack = action.data.body.userRetentionBack
        userRetentionBack.map((item) =>{
          dateArr.push(dateFormat(item.date))
          switch(state){
            case 'one':   
                arr.push(item.oneDate)
                break
            case 'seven':   
                arr.push(item.sevenDate)
                break
            case 'fifteen':   
                arr.push(item.fifteenDate)
                break
            default:
              arr.push(item.fifteenDate)
          }
        })
        dispatch({
          type:'USERRETAIN',
          dataTable:userRetentionBack,
          dateArr,
          arr,
          str:state
        })
      }else{
        fail()
      }
    })          
}

let initialState= {
  dataTable:[],
  dateArr:[],
  arr:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USERRETAIN':
      return {
        ...state,
        dataTable:action.dataTable,
        dateArr:action.dateArr,
        arr:action.arr,
        state:action.state
      }
    default:
      return state
  }
}
