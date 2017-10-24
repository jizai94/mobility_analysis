import React, { ReactDom,Component, PropTypes } from 'react'
import { Table, Row, Col, Button, Modal, DatePicker, Dropdown, Icon, message, Select } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { Link } from 'react-router'
import './osVersion.scss'
import { yesterday, lMonthY, timeToString, durationToString } from 'GLOBAL'
import { getCookie, setCookie } from 'UTIL/cookie'
import moment from 'moment'
import { getOption } from '../../option/osVersion'
const { Option } = Select

const disabledDate = current => current && current.valueOf() > Date.now()-86400000

export default class OsVersion extends Component {
	constructor(props){
		super(props)
		this.state = {
			current:'1',
			versionList: JSON.parse(sessionStorage.getItem("versionList")),
			tableReq: {
				"ec_platform":"1",
	    		// "ec_appKey":"17882660f8d511e6885744a8420bf25c",
	    		"ec_appKey":"1495875563331uy68iqb1f47g2449818",
	    		// "ec_ranges_start":"1494691200000",
	    		// "ec_ranges_end":"1495036800000",
	    		"ec_ranges_start": timeToString(yesterday).startTime,
	    		"ec_ranges_end": timeToString(yesterday).endTime,
	    		"ec_app_version":"all"
			},
			chartReq: {
				"ec_platform":"1",
	    		// "ec_appKey":"17882660f8d511e6885744a8420bf25c",
	    		"ec_appKey":"1495694327946r8oxt1165a05t90k3i2",
	    		"ec_ranges_start": durationToString(lMonthY,yesterday).startTime,
	    		"ec_ranges_end": durationToString(lMonthY,yesterday).endTime,
	    		"ec_app_version":"all",

	    		"ec_tab":"active_user",
				"tranTime": durationToString(lMonthY,yesterday).tranTime,
				"ec_brands":"top5"
			}
			
		}
	}
	// getOtion() {
 //        const option = {
 //            title: {
 //                text: ''
 //            },
 //            tooltip : {
 //                trigger: 'axis'
 //            },
 //            legend: {
 //                bottom: 10,
 //                data:['6.0','5.1','5.1.1','4.4.2','4.2.2']
 //            },
 //            toolbox: {
 //                feature: {
                    
 //                }
 //            },
 //            grid: {
 //            	show: true,
 //            	top: '5%',
 //                left: '5%',
 //                right: '5%',
 //                bottom: '20%',
 //                containLabel: true
 //            },
 //            xAxis : [
 //                {
 //                    type : 'category',
 //                    boundaryGap : false,
 //                    data : ['3/26','3/27','3/28','3/29','3/30','4/01','4/02','4/03','4/04','4/05','4/06']
 //                }
 //            ],
 //            yAxis : [
 //                {
 //                    type : 'value'
 //                }
 //            ],
 //            series : [
 //                {
 //                    name:'6.0',
 //                    type:'line',
 //                    data:[320, 132, 301, 445, 90, 230, 210, 132, 111, 184, 70]
 //                },
 //                {
 //                    name:'5.1',
 //                    type:'line',
 //                    data:[220, 182, 191, 234, 290, 330, 310, 200, 100, 139, 175]
 //                },
 //                {
 //                    name:'5.1.1',
 //                    type:'line',
 //                    data:[150, 232, 201, 154, 190, 339, 410, 201, 139, 191, 234]
 //                },
 //                {
 //                    name:'4.4.2',
 //                    type:'line',
 //                    data:[230, 632, 101, 354, 190, 330, 410, 190, 190, 398, 102]
 //                },
 //                {
 //                    name:'4.2.2',
 //                    type:'line',
 //                    data:[350, 432, 201, 154, 150, 230, 110, 791, 234, 394, 340]
 //                }
 //            ]
 //        };
 //        return option;
 //    }
	componentWillMount(){
		
		const { getTableData , getChartData } = this.props
		getTableData(this.state.tableReq)
		getChartData(this.state.chartReq)
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
	onBeginTimeChange(dateString){
		var startTime = timeToString(dateString).startTime
		this.state.chartReq.ec_ranges_start = startTime
		if(this.state.chartReq.ec_ranges_end > startTime){
			this.state.chartReq.tranTime = ((this.state.chartReq.ec_ranges_end)-startTime)/86400000
			const { getChartData } = this.props
			getChartData(this.state.chartReq)
		}else{
			message.error('请选择正确的日期')
		}
		
	}
	onEndTimeChange(dateString){
		var endTime = timeToString(dateString).endTime
		this.state.chartReq.ec_ranges_end = endTime
		if(endTime > this.state.chartReq.ec_ranges_start){
			this.state.chartReq.tranTime = (endTime-(this.state.chartReq.ec_ranges_start))/86400000
			const { getChartData } = this.props
			getChartData(this.state.chartReq)
		}else{
			message.error('请选择正确的日期')
		}
		
	}
	onTimeChange2(dateString){
		var time = timeToString(dateString);
		
		const { getTableData } = this.props
		getTableData({
			...this.state.tableReq,
			"ec_ranges_start": time.startTime,
		    "ec_ranges_end": time.endTime,
		})
	}
	onTypeChange(value){
		const { getChartData } = this.props
		
		getChartData({
			...this.state.chartReq,
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
	      title: '操作系统版本',
	      dataIndex: 'os_version',
	      key: 'os_version',
	      sorter: (a, b) => a.os_version - b.os_version,
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

		const { tableOutput, chartOutput } = this.props.state
		const option = getOption(chartOutput)

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
				<Row className='header-container'>
      				<Col span={6} className='fix-left'><h5>操作系统版本分布</h5></Col>
			      	<Col span={4}></Col>
			      	<Col span={10}>
						<div>
  							<DatePicker size="default" defaultValue={moment(lMonthY, 'YYYY-MM-DD')} 
  								onChange={(date,dateString)=>this.onBeginTimeChange(dateString)}
  								disabledDate={disabledDate}
  							/>
  							{`  至  `}
  							<DatePicker size="default" defaultValue={moment(yesterday, 'YYYY-MM-DD')} 
								onChange={(date,dateString)=>this.onEndTimeChange(dateString)}
								disabledDate={disabledDate}
  							/>
  						</div>
			      	</Col>
			      	<Col span={4}>
			      		<Select
    						showSearch
    						style={{ width: 150, float: 'right' }}
    						defaultValue="all"
    						onChange = {value=>this.onVersionChange(value)}
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
    			<ul className='nav-bar'>
    				<li onClick={(e,param) => this.handleClick(e,'active_user')} className='active'><a>活跃用户</a></li>
    				<li onClick={(e,param) => this.handleClick(e,'new_user')} className=''><a>新增用户</a></li>	
    				<li onClick={(e,param) => this.handleClick(e,'login_user')} className=''><a>登录会员</a></li>
    				<li onClick={(e,param) => this.handleClick(e,'avg_start_count')} className=''><a>人均启动次数</a></li>
    				<li onClick={(e,param) => this.handleClick(e,'avg_time')} className='last-li'><a>次均使用时长(秒)</a></li>
    			</ul>

    			<div className='echartBox'>
    				<div className='echartTitle'>趋势图</div>
    				<div className='echart-select-btn' style={{display:'inline-block',position:'absolute',right:'30px',top:'185px'}}>
    					<Select
    						showSearch
    						style={{ width: 150, float: 'right' }}
    						defaultValue="top5机型"
    						onChange = {value=>this.onTypeChange(value)}
  						>
    						<Option value="top5">top5机型</Option>
    						<Option value="top10">top10机型</Option>
  						</Select>
    				</div>
                    <ReactEcharts
                        option={option} 
                        style={{height: '350px', width: '100%'}} 
                        notMerge={true}
                        onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
                        className='react_for_echarts' />
                </div>

    			<div className='table-title-bar'>
	    			<div className='table-title-text'>数据表</div>
	    			<span className='table-datePicker'>
	    				<DatePicker /*onChange={this.onChange}*/ 
							defaultValue={moment(yesterday, 'YYYY-MM-DD')}
	    					disabledDate={disabledDate}
	    					onChange={(date,dateString) => this.onTimeChange2(dateString)}
	    					ref='simgleDataPicker'
	    				/>
	    			</span>
	    			<div className='outputBtn'><Button onClick={this.outputClick}>导出</Button></div>
	    		</div>
				<Table 
					pagination={{ pageSize: 5,showQuickJumper: true }} 
					columns={columns} 
					dataSource={tableOutput} 
					onChange={this.handleChange} 
					style={{border:'1px solid #e9e9e9'}}/>
        	</div>
        )
	}
}