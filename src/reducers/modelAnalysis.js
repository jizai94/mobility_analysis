import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { tableDataAction,chartDataAction } from './request/modelAnalysis'
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
		  DATA_BODY.moduleTableOutput.map((item,index)=>{
		  	item.key = index
			item.avg_start_count = parseFloat(item.active_user) ? (parseFloat(item.start_times)/parseFloat(item.active_user)).toFixed(2):0;
			item.avg_time = parseFloat(item.used_times) ? (parseFloat(item.duration_time)/parseFloat(item.used_times)/1000).toFixed(2):0;
		  })
	      dispatch(tableAction(DATA_BODY.moduleTableOutput))
	      if(success) success()
	    }else{
	    	if(fail) fail()
	    }
	    NProgress.done()
	})
}

export const getChartData = (postData, success, fail) => (dispatch , getState) => {
	var beginTime = postData.ec_ranges_start;
	dispatch(chartDataAction(postData)).then(action=>{
		NProgress.start()
		var Table_Details=[], obj = {xAxis:[],series:[],legend:[]}, seriesData={}, series=[], date = '',arrLength='';
		const DATA_BODY = action.data.body;
		if (DATA_BODY.errorCode == '0') {
			console.log(DATA_BODY)
			DATA_BODY.moduleOutput.map((item,index)=>{
				if(item.subModuleOutput.length){
					item.subModuleOutput.map((item,index,arr)=>{
						date = getTime(item.date);
						arrLength = arr.length;
						if(typeof(seriesData[index])=='undefined'){
							seriesData[index]=[]
						}
						seriesData[index].push(item.num);
						if(obj.legend.length!=arrLength){
							obj.legend.push({
								name: item.module_name
							});
						}
					})
				}else{
					date = getTime(beginTime+(index * 86400000)) 
				}
				
				obj.xAxis.push(date);
			});
			console.log(obj)
			console.log(seriesData)
			for(var i=0; i<arrLength;i++){
				var color = [];
				color[0] = colorBox[i];
				series.push({
			            name: obj.legend[i].name,
			            type: 'line',
			            // smooth: 'true',
			            symbol: symbol[i],
			            symbolSize: 8,
			            zlevel: 10,
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
    "ec_ranges_start":"1494494880042",
    "ec_ranges_end":"1494581880042",
    "ec_app_version":"all",
    "ec_tab":"active_user",
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