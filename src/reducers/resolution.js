import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { getResolutionAction } from './request/resolution'

const FIRST_GET_DATA = 'first_get_data'

export const actionObject = (resolutionOutput) => ({
	type: FIRST_GET_DATA,
	resolutionOutput
})

export const getDataList = (postData, success, fail) => (dispatch , getState) => {
	dispatch(getResolutionAction(postData)).then(action=>{
		NProgress.start()
		const Table_Details = [];
		const DATA_BODY = action.data.body;
		if (DATA_BODY.errorCode == '0') {
		  DATA_BODY.resolutionOutput.map((item,index)=>{
		  	if(postData.ec_tab == 'avg_time'){
		  		item.num = ((item.num)/1000).toFixed(2)
		  	}
		  	item.percent = (item.percent*100).toFixed(2)+'%';
		  	item.key = index + 1;
			Table_Details.push(item);
		  })
	      dispatch(actionObject(Table_Details))
	      if(success) success()
	    }else{
	    	if(fail) fail()
	    }
	    NProgress.done()
	})
}
const initialState = {
	"ec_platform":"2",
    "ec_appKey":"17882660f8d511e6885744a8420bf25c",
    "ec_ranges_start":"1494382110048",
    "ec_ranges_end":"1494469110048",
    "ec_app_version":"1.0",
    "ec_tab":"avg_time"
}

export default (state = initialState, action) => {
	switch(action.type){
		case FIRST_GET_DATA:
	      return {
	        ...state,
	        resolutionOutput:action.resolutionOutput
	      }

	    default:
	      return state
	}
	
}