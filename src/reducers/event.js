import { eventAction } from './request/eventManage'
import NProgress from 'nprogress'

export const event = (data,suc,fail) => (dispatch,getState) => {
	const newData = {
		"platform":data.platform,
     	"date":data.date.replace(/\-/g, ''),
        "appkey":data.appkey,
        "appVersion":data.appVersion,
        "eventId":data.eventId
    }
    dispatch(eventAction(newData)).then(action =>{
    	if(action.data.body.errorCode == '0'){
    		let customEventBack = action.data.body.customEventBack
    		dispatch({
    			type:"EVENT",
    			dataTable:customEventBack
    		})
    	}else{
    		fail()
    	}
    })
}

const initialState = {
    dataTable:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'EVENT':
      return {
        ...state,
        dataTable:action.dataTable
      }
    default:
      return state
  }
}
