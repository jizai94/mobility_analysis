import React, { ReactDom,Component, PropTypes } from 'react'
import { Table, Row, Col, Button,DatePicker, Icon, message, Select, TreeSelect } from 'antd'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'
import { Link } from 'react-router'
import { getCookie, setCookie } from 'UTIL/cookie'
import './channelAnalysis.scss'
import { yesterday, lMonthY, timeToString, durationToString } from 'GLOBAL'
import moment from 'moment'
// import { NestedTable } from './component'
import { getOption } from '../../option/channelAnalysis'
const { Option } = Select
const { RangePicker } = DatePicker
const SHOW_PARENT = TreeSelect.SHOW_PARENT

const disabledDate = current => current && current.valueOf() > Date.now()-86400000
let simgleDate = {};
var echartsInstance = echarts.init 

export default class OsVersion extends Component {
	constructor(props){
		super(props)
		this.state = {
			current: '1',
			versionList: JSON.parse(sessionStorage.getItem("versionList")),
			value: [],
			option: {},
			tableReq: {
				"ec_platform":"1",
			    "ec_appKey":"1495694327946r8oxt1165a05t90k3i2",
			    "ec_ranges_start": timeToString(lMonthY).startTime,
			    "ec_ranges_end": timeToString(yesterday).endTime,
			    "ec_app_version":"all"
			},
			channelReq: {
				"platform":"1",
    			"appkey":"1495694327946r8oxt1165a05t90k3i2"
			},
			chartReq: {
				"ec_platform":"1",
			    "ec_appKey":"1495694327946r8oxt1165a05t90k3i2",
			    "ec_ranges_start": timeToString(lMonthY).startTime,
			    "ec_ranges_end": timeToString(yesterday).endTime,
			    "ec_app_version":"all",
			    "ec_tab":"active_user",
			    "channel_id":"",
			    // "channel_id":"ZXYH#wandoujia",
			    "tranTime":"30"
			}
		}
	}

	componentWillMount(){
		var mySelf = this;
		const { getTableData , getChartData , getChannelList } = this.props
		getTableData(this.state.tableReq)
		getChannelList(this.state.channelReq,(param)=>{
			
			var channel_id = '';
			
			console.log(mySelf.state)
			if(param.length){
				param.map((item,index,arr)=>{
					if(arr.length-1 == index){
						channel_id += item
					}else{
						channel_id += item+'#'
					}
				})
				this.state.chartReq.channel_id = channel_id
				getChartData(this.state.chartReq,()=>{
					// mySelf.state.value = param
					console.log(param)
					mySelf.setState({value: param})
				})
				mySelf.setState({value: param})
			}else{
				console.log('暂无数据')
			}
		})
		
		// const { chartOutput, channelList } = this.props.state
		// var channel_id = '';
		// this.state.value = channelList.valueArr
		// console.log(channelList.valueArr)
		// if(channelList.valueArr.length){
		// 	channelList.valueArr.map((item,index,arr)=>{
		// 		if(arr.length-1 == index ){
		// 			channel_id += item
		// 		}else{
		// 			channel_id += item+'#'
		// 		}
				
		// 	})
		// 	console.log(channel_id)
		// 	getChartData({
		// 		...this.state.chartReq,
		// 		channel_id: channel_id
		// 	})
		// }
		
		// this.state.option = getOption(chartOutput)
		// this.setState({})
	}
	handleClick(e,param){
		const childs = e.currentTarget.parentNode.childNodes;
		for(let i=0; i < childs.length; i++){
			childs[i].classList.remove('active');
		}
		e.currentTarget.classList.add('active');
		
		const {getChartData} = this.props
		getChartData({
		    ...this.state.chartReq,
		    ec_tab: param,
		})
		this.state.chartReq.ec_tab = param;
	}
	onChangeTime(dateString){
		var time = timeToString(dateString).endTime
		var preTime = time-2592000000
		const { getTableData, getChartData } = this.props
		this.state.tableReq.ec_ranges_start = this.state.chartReq.ec_ranges_start = preTime
		this.state.tableReq.ec_ranges_end = this.state.chartReq.ec_ranges_end = time
		// this.state.tableReq.tranTime = this.state.chartReq.tranTime = 
		getTableData(this.state.tableReq)
		getChartData(this.state.chartReq)
	}
	onTypeChange(value){
		const { getChartData } = this.props
		
		getChartData({
			...this.state,
			"ec_brands": value
		})
		this.state.chartReq.ec_brands = value;
	}
	onVersionChange(value){
		const { getTableData, getChartData } = this.props
		
		this.state.tableReq.ec_app_version = this.state.chartReq.ec_app_version = value
		getTableData(this.state.tableReq)
		getChartData(this.state.chartReq)
	}
	outputClick(e){
		
	}
  
	handleTopClick() {

	}
	onChange = (value) => {
		// document.getElementsByClassName('react_for_echarts')[0].firstChild.style.height = 350+'px'
		document.getElementsByClassName('react_for_echarts')[0].style.display = "block"
		document.getElementsByClassName('noDataLoading')[0].style.display = "none"
		this.setState({value: value})

		const { getChartData } = this.props
		var channel_id = '';
		var a = ['wandou','qidzi','sdija']
		if(value.length){
			value.map((item,index,arr)=>{
				if(arr.length-1 == index ){
					channel_id += item
				}else{
					channel_id += item+'#'
				}
				
			})
			console.log(channel_id)
			getChartData({
				...this.state.chartReq,
				channel_id: channel_id
			})
		}else{
			// document.getElementsByClassName('react_for_echarts')[0].firstChild.style.height = 0
			document.getElementsByClassName('react_for_echarts')[0].style.display = "none"
			document.getElementsByClassName('noDataLoading')[0].style.display = "block"
		}
		
		// const values = this.state.value, tempLeg = [], tempSer = [];
		// if(values.length>=1){
		// 	for(var i=0;i<values.length;i++){
		// 		chartOutput.legend.map((item,index)=>{
		// 			if(item.name == values[i]){
		// 				tempLeg.push(item)
		// 			}
		// 		})
		// 		chartOutput.series.map((item,index)=>{
		// 			if(item.name == values[i]){
		// 				tempSer.push(item)
		// 			}
		// 		})
		// 	}
		// 	chartOutput.legend = tempLeg
		// 	chartOutput.series = tempSer
		// 	console.log(chartOutput)

		// 	this.setState({option:getOption(chartOutput)})
		// 	console.log(this.state)
		// }else{
		// 	this.setState({option:this.state.option})
		// }
	}
	devTypeClick(num){
    	let app = ['iPad','iPhone','Android']
    	this.setState({ current:num })
    	const { getTableData, getChartData } = this.props
    	this.state.tableReq.ec_platform = this.state.chartReq.ec_platform = num
    	getTableData(this.state.tableReq)
    	getChartData(this.state.chartReq)
  	}
  	getClass(num){
    	return num == this.state.current ? 'active': ''
  	}
	
	render(){
		const columns = [{
		      title: '合作方名称',
		      dataIndex: 'channel_name',
		      key: 'channel_name',
		      sorter: (a, b) => a.channel_name - b.channel_name,
		    }, {
		      title: '活跃用户',
		      dataIndex: 'active_user',
		      key: 'active_user',
		      sorter: (a, b) => a.active_user - b.active_user,
		    }, {
		      title: '新增用户',
		      dataIndex: 'new_user',
		      key: 'new_user',
		      sorter: (a, b) => a.new_user - b.new_user,
		    },{
		      title: '登录会员',
		      dataIndex: 'login_user',
		      key: 'login_user',
		      sorter: (a, b) => a.login_user - b.login_user,
		    },{
		      title: '人均启动次数',
		      dataIndex: 'avg_start_count',
		      key: 'avg_start_count',
		      sorter: (a, b) => a.avg_start_count - b.avg_start_count,
		    },{
		      title: '次均使用时长(秒)',
		      dataIndex: 'avg_time',
		      key: 'avg_time',
		      sorter: (a, b) => a.avg_time - b.avg_time,
		    }];


		const { tableOutput, chartOutput, channelList } = this.props.state

		var option = getOption(chartOutput)

		const tProps = {
		        treeData:channelList.treeData,
		        value: this.state.value,
		        onChange: this.onChange,
		        multiple: true,
		        treeCheckable: true,
		        // showCheckedStrategy: SHOW_PARENT,
		        searchPlaceholder: '选择渠道',
		        style: {
		          width: 340
		      	}
		    }

    	return (
			<div className='layout-container'>
				<div className="app-header">
        			<header>
            			<nav className="device-type clearfix">
                			<h3>{getCookie('appName')}</h3>
                			<ul className="clearfix">
                				<li className={this.getClass(1)} onClick={e=>this.devTypeClick(1)}><a>iPhone</a></li>
                			    <li className={this.getClass(2)} onClick={e=>this.devTypeClick(2)}><a>Android</a></li>
                			</ul>
            			</nav>
            			<Link to="applist/applist.html" className="back"><Button type="primary" ghost>返回APP列表</Button></Link>
        			</header>
      			</div>
				<Row className='header-container' style={{position:'relative'}} id='area1'>
      				<Col span={6} className='fix-left'><h5>渠道效果</h5><Icon type="question-circle" /></Col>
			      	<Col span={10}></Col>
			      	<Col span={4}>
			      		<DatePicker 
			      			disabledDate={disabledDate}
			      			defaultValue={moment(yesterday, 'YYYY-MM-DD')} 
			      			onChange={(date,dateString) => this.onChangeTime(dateString)} />
			      	</Col>
			      	<Col span={4}>
			      		<Select
    						showSearch
    						style={{ width: 150, float: 'right' }}
    						defaultValue="all"
    						onChange={(value)=>this.onVersionChange(value)}
    						getPopupContainer={() => document.getElementById('area1')}
  						>
    						<Option value="all">全部版本</Option>
    						{
              					this.state.versionList.map((item) => {
                				return <Option value={item.appVersion} key={item.appVersion}>{item.appVersion}</Option>
              					})
            				}
  						</Select>
			    	</Col>
    			</Row>		

				<div className='table-title-bar'>
	    			<div className='table-title-text'>合作方指标</div>
	    			
	    			<div className='outputBtn'><Button onClick={this.outputClick}>导出</Button></div>
	    		</div>
				<Table 
					pagination={{ pageSize: 5,showQuickJumper: true }} 
					columns={columns} 
					dataSource={tableOutput} 
					onChange={this.handleChange} 
					style={{border:'1px solid #e9e9e9'}}/>


    			<ul className='nav-bar1'>
    				<li onClick={(e,param) => this.handleClick(e,'active_user')} className='active'><a>活跃用户</a></li>
    				<li onClick={(e,param) => this.handleClick(e,'new_user')} className=''><a>新增用户</a></li>	
    				<li onClick={(e,param) => this.handleClick(e,'login_user')} className=''><a>登录会员</a></li>
    				<li onClick={(e,param) => this.handleClick(e,'avg_start_count')} className=''><a>人均启动次数</a></li>
    				<li onClick={(e,param) => this.handleClick(e,'avg_time')} className='last-li'><a>次均使用时长(秒)</a></li>
    			</ul>

    			<div className='echartBox1' style={{position:'relative'}} id='area2'>
    				<div className='echartTitle'>趋势图</div>
    				<div style={{display:'inline-block',position:'absolute',right:'30px',top:'60px'}}>
    					<span>选择渠道：</span>
    					<TreeSelect {...tProps} 
    						getPopupContainer={() => document.getElementById('area2')}/>
    				</div>
                    <ReactEcharts
	                    option={option} 
	                    onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
                        style={{height: '350px', width: '100%'}} 
                        notMerge={true}
                        className='react_for_echarts' />
                    <div className='noDataLoading'>没有找到匹配的记录</div>
                </div>
        	</div>
        )
	}
}