import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { tableDataAction, chartDataAction, channelStyleAction } from './request/channelAnalysis'
import { getTime } from 'GLOBAL'

const GET_TABLE_DATA = 'get_table_data'
const GET_CHART_DATA = 'get_chart_data'
const GET_CHANNEL_LIST = 'get_channel_list'

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

export const channelAction = (channelList) => ({
	type: GET_CHANNEL_LIST,
	channelList
})

export const getTableData = (postData, success, fail) => (dispatch , getState) => {
	dispatch(tableDataAction(postData)).then(action=>{
		NProgress.start()
		const Table_Details = [];
		const DATA_BODY = action.data.body;
		if (DATA_BODY.errorCode == '0') {
		  DATA_BODY.channelTableOutput.map((item,index)=>{
		  	item.key = index
			item.avg_start_count = parseFloat(item.active_user) ? (parseFloat(item.start_times)/parseFloat(item.active_user)).toFixed(2):0;
			item.avg_time = parseFloat(item.used_times) ? (parseFloat(item.duration_time)/parseFloat(item.used_times)/1000).toFixed(2):0;
		  })
	      dispatch(tableAction(DATA_BODY.channelTableOutput))
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
		if (DATA_BODY.errorCode == '0') {
			
			DATA_BODY.channelAnalyseOutput.map((item)=>{
				if(item.subChannelOutput.length){
					item.subChannelOutput.map((item,index,arr)=>{
						date = getTime(item.date);
						arrLength = arr.length;
						if(typeof(seriesData[index])=='undefined'){
							seriesData[index]=[]
						}
						seriesData[index].push(item.num);
						if(obj.legend.length!=arrLength){
							obj.legend.push({
								name: item.channel_name
							});
						}
					})
					obj.xAxis.push(date);
				}
				
			});
			
			for(var i=0; i<arrLength;i++){
				var color = [];
				color[0] = colorBox[i];
				series.push({
			            name: obj.legend[i].name,
			            type: 'line',
			            // smooth: 'true',
			            symbol: symbol[i],
			            symbolSize: 10,
			            zlevel: 10,
			            color: color,
			            data: seriesData[i]
			        })
			}
			obj.series = series; 
		 
	      dispatch(chartAction(obj))
	      if(success) success()
	    }else{
	    	if(fail) fail()
	    }
	    NProgress.done()
	})
}

export const getChannelList = (postData, success, fail) => (dispatch, getState) =>{
	dispatch(channelStyleAction(postData)).then(action=>{
		NProgress.start()
		const channelList = { treeData:[],valueArr:[]};
		const DATA_BODY = action.data.body;
		if (DATA_BODY.errorCode == '0') {
			DATA_BODY.channelList.map((item)=>{
				const obj = {};
				obj.label = obj.value = item.channel_id
				channelList.treeData.push(obj)
				channelList.valueArr.push(obj.value)
			})
			// this.initialState.value = channelList.valueArr
	      dispatch(channelAction(channelList))
	      if(success) success(channelList.valueArr)
	    }else{
	    	if(fail) fail()
	    }
	    NProgress.done()
	})
}

const initialState = {
	
	value: [],
	tableReq: {
		"ec_platform":"2",
	    "ec_appKey":"17882660f8d511e6885744a8420bf25c",
	    "ec_ranges_start":"1494864000000",
	    "ec_ranges_end":"1494950400000",
	    "ec_app_version":"1.0"
	},
	channelReq: {
		"platform":"2",
		"appkey":"17882660f8d511e6885744a8420bf25c"
	},
	chartReq: {
		"ec_platform":"2",
	    "ec_appKey":"17882660f8d511e6885744a8420bf25c",
	    "ec_ranges_start":"1494864000000",
	    "ec_ranges_end":"1494950400000",
	    "ec_app_version":"all",
	    "ec_tab":"active_user",
	    "channel_id":"ZXYH#wandoujia",
	    "tranTime":"1"
	},
	chartOutput:{},
	tableOutput:[],
	channelList:[]
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

		case GET_CHANNEL_LIST:
			return {
				...state,
				channelList: action.channelList
			}

	    default:
	      return state
	}
	
}