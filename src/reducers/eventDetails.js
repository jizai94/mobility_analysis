import { eventDetailsAction } from './request/eventManage'
import NProgress from 'nprogress'
import { getTime } from 'GLOBAL'

export const eventDetails = (data,state,suc,fail) => (dispatch,getState) => {
	 const newData = {
		    "platform":data.platform,
     	  "beginTime":data.beginTime.replace(/\-/g, ''),
        "endTime":data.endTime.replace(/\-/g, ''),
        "appkey":data.appkey,
        "appVersion":data.appVersion,
        "eventId":data.eventId
    }
    let dateArr = [],arrDate =[]
    dispatch(eventDetailsAction(newData)).then(action =>{
      console.log(action)
    	if(action.data.body.errorCode == '0'){
        let avgDateTriggerNum = action.data.body.avgDateTriggerNum,
            avgDateTriggerUser = action.data.body.avgDateTriggerUser,
            avgUserTime = action.data.body.avgUserTime,
            perUserTime = action.data.body.perUserTime,
            customEventDetalBack = action.data.body.customEventDetalBack
        customEventDetalBack.forEach((item)=>{
            dateArr.push(item.date)
            switch(state){
              case '触发次数': 
                    arrDate.push(item.triggerNum) 
                    break
              case '触发用户数': 
                    arrDate.push(item.activeUser) 
                    break
              case '次均使用时长(秒)': 
                    arrDate.push(item.perUserTime) 
                    break
              case '人均使用时长(秒)': 
                    arrDate.push(item.perStartTimes) 
                    break
            }          
        })
        dispatch({
          type:"EVENTDETAILS",
          avgDateTriggerNum,
          avgDateTriggerUser,
          avgUserTime,
          perUserTime,
          dateArr,
          arrDate,
          dataTable:customEventDetalBack,
          str:state
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
    case 'EVENTDETAILS':
      return {
        ...state,
        avgDateTriggerNum:action.avgDateTriggerNum,
        avgDateTriggerUser:action.avgDateTriggerNum,
        avgUserTime:action.avgUserTime,
        perUserTime:action.perUserTime,
        dataTable:action.dataTable,
        dateArr:action.dateArr,
        arrDate:action.arrDate,
        str:action.str
      }
    default:
      return state
  }
}
