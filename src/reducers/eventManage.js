import { eventManageAction,eventManageUpdateAction,eventManageDeleteAction } from './request/eventManage'
import NProgress from 'nprogress'

export const eventManage = (data,suc,fail) => (dispatch,getState) => {
	const newData = {
		"platform":data.platform,
     	"date":data.date.replace(/\-/g, ''),
        "appkey":data.appkey,
        "appVersion":data.appVersion
    }
    dispatch(eventManageAction(newData)).then(action =>{
    	console.log(action)
    	if(action.data.body.errorCode == '0'){
    		let customEventTable = action.data.body.customEventTable
    		dispatch({
    			type:'EVENTMANAGE',
    			dataTable:customEventTable
    		})  		
    	}
    })
}

export const eventUpDateManage = (data,suc,fail) => (dispatch,getState) => {
	const newData = {
		"platform":data.platform,
     	"id":data.id,
        "appkey":data.appkey,
        "appVersion":data.appVersion,
        "eventId":data.eventId,
        "eventName":data.eventName,
        "eventUse":data.eventUse
    }
    dispatch(eventManageUpdateAction(newData)).then(action =>{
    	if(action.data.body.errorCode == '0'){
    	   suc()	
    	}else{
            fail()
        }
    })
}
export const eventDeleteManage = (data,suc,fail) => (dispatch,getState) => {
    const newData = {
        "id":data.id
    }
    dispatch(eventManageDeleteAction(newData)).then(action =>{
        if(action.data.body.errorCode == '0'){
           suc()    
        }else{
           fail()
        }
    })
}

let initialState = {
	dataTable:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'EVENTMANAGE':
      return {
        ...state,
        dataTable:action.dataTable
      }
    default:
      return state
  }
}
