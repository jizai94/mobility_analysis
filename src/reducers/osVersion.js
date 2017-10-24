import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { tableDataAction,chartDataAction } from './request/osVersion'
import { getTime } from 'GLOBAL'

const GET_TABLE_DATA = 'get_table_data'
const GET_CHART_DATA = 'get_chart_data'

const colorBox = ['#0099cc','#ccc','#e64b5d','#fdba46','#3d3b5b','#a2accb','#df7c14','#3ba6a0','#4a58a3','#6dbee4']
const symbol = ['circle', 'rect','triangle', 'roundRect', 'diamond', 'pin','arrow']

export const tableAction = (tableOutput) => ({
	type: GET_TABLE_DATA,
	tableOutput
})

export const chartAction = (chartOutput) => ({
	type: GET_CHART_DATA,
	chartOutput
})

export const getTableData = (postData, success, fail) => (dispatch , getState) => {
	dispatch(tableDataAction(postData)).then(action=>{
		NProgress.start()
		const Table_Details = [];
		const DATA_BODY = action.data.body;
		if (DATA_BODY.errorCode == '0') {
		  DATA_BODY.osVerQuery.map((item,index)=>{
		  	item.key = index
			item.avg_start_count = parseFloat(item.active_user) ? (parseFloat(item.start_times)/parseFloat(item.active_user)).toFixed(2):0;
			item.avg_time = parseFloat(item.used_times) ? (parseFloat(item.duration_time)/parseFloat(item.used_times)/1000).toFixed(2):0;
		  })
	      dispatch(tableAction(DATA_BODY.osVerQuery))
	      if(success) success()
	    }else{
	    	if(fail) fail()
	    }
	    NProgress.done()
	})
}

export const getChartData = (postData, success, fail) => (dispatch , getState) => {

	dispatch(chartDataAction(postData)).then(action=>{
		NProgress.start()
		var Table_Details=[], obj = {xAxis:[],series:[],legend:[]}, seriesData={}, series=[], date = '',arrLength='';
		
		const DATA_BODY = action.data.body;
		console.log(DATA_BODY)
		if (DATA_BODY.errorCode == '0') {
			
			DATA_BODY.osOutput.map((item)=>{
				item.subOsOutput.map((item,index,arr)=>{
					date = getTime(item.date);
					arrLength = arr.length;
					if(typeof(seriesData[index])=='undefined'){
						seriesData[index]=[]
					}
					seriesData[index].push(item.num);
					if(obj.legend.length!=arrLength){
						obj.legend.push({
							name: item.os_version
						});
					}
				})
				obj.xAxis.push(date);
			});
			console.log(seriesData)
			for(var i=0; i<arrLength;i++){
				var color = [];
				color[0] = colorBox[i];
				
				series.push({
			            name: obj.legend[i].name,
			            type: 'line',
			            // smooth: 'true',
			            symbol: symbol[i],
			            symbolSize: 12,
			            zlevel: 10,
			            // itemStyle: {
			            //     normal: {
			            //         color: 'rgb(0, 153, 204)'
			            //     }
			            // }, 
			            color: color, 
			            data: seriesData[i]
			        })
			}
			obj.series = series; 
			console.log(obj)
	      dispatch(chartAction(obj))
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
    "ec_ranges_start":"1494406290053",
    "ec_ranges_end":"1494493290053",
    "ec_app_version":"1.0",

	"ec_tab":"avg_time",
	"tranTime":"1",
	"ec_brands":"top5",

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