import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { tableDataAction } from './request/userActivity'
import { getTime } from 'GLOBAL'

const GET_TABLE_DATA = 'get_table_data'
const GET_CHART_DATA = 'get_chart_data'

export const tableAction = (tableOutput) => ({
	type: GET_TABLE_DATA,
	tableOutput
})

export const chartAction = (chartOutput) => ({
	type: GET_CHART_DATA,
	chartOutput
})

export const getTableData = (postData, tagIndex, success, fail) => (dispatch , getState) => {
	dispatch(tableDataAction(postData)).then(action=>{
		NProgress.start()
		var Obj = { dateList: [], userActiveData: [], livenessData: [] };
		var index = tagIndex+'';
		const DATA_BODY = action.data.body;
		if (DATA_BODY.errorCode == '0') {

		  DATA_BODY.userActivityBack.map((item)=>{
		  	item.date = `${item.date.slice(0,4)}-${item.date.slice(4,6)}-${item.date.slice(6,8)}`
		  	
			switch(index){
				case '0': 
					Obj.dateList.push(item.date)
		  			Obj.userActiveData.push(item.activeUser)
		  			Obj.livenessData.push((item.dateLiveness*100).toFixed(2))
		  		break;
		  		case '1':
		  			Obj.dateList.push(item.date)
		  			Obj.userActiveData.push(item.weekActiveUser)
		  			Obj.livenessData.push((item.weekLiveness*100).toFixed(2))
		  		break;
		  		case '2': 
					Obj.dateList.push(item.date)
		  			Obj.userActiveData.push(item.monActiveUser)
		  			Obj.livenessData.push((item.monLiveness*100).toFixed(2))
		  		break;
			}

		  	item.dateLiveness = (item.dateLiveness*100).toFixed(2) + '%'
		  	item.weekLiveness = (item.weekLiveness*100).toFixed(2) + '%'
		  	item.monLiveness = (item.monLiveness*100).toFixed(2) + '%'
		  })
		  // console.log(DATA_BODY.userActivityBack)
	      dispatch(tableAction(DATA_BODY.userActivityBack))
	      dispatch(chartAction(Obj))
	      if(success) success()
	    }else{
	    	if(fail) fail()
	    }
	    NProgress.done()
	})
}

const initialState = {
	chartOutput:{},
	tableOutput:[]
}

export default (state = initialState, action) => {
	switch(action.type){
		case GET_TABLE_DATA:
	      return {
	        ...state,
	        tableOutput: action.tableOutput
	      }
	     case GET_CHART_DATA:
	      return {
	        ...state,
	        chartOutput: action.chartOutput
	      }
	    default:
	      return state
	}
	
}