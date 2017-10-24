import React, { Component } from 'react'
import { Link } from 'react-router'
import './userActivity.scss'
import { Button, Icon, Select, Input, DatePicker, Table, message, Tooltip } from 'antd'
import { today, yesterday, lastWeekY, lMonthY, thrMonth ,sixMonth } from 'GLOBAL'
import moment from 'moment'
import ReactEcharts from 'echarts-for-react'
import { getOption6 } from '../../option/todayDetails'
import { getCookie, setCookie } from 'UTIL/cookie'
const { Option, OptGroup } = Select;
const Search = Input.Search;
const disabledDate = current => current && current.valueOf() > Date.now()-86400000
export default class UserActivity extends Component {
	constructor(props) {
		super(props)
		this.state = {
			index: '0',
			current: '1',
			versionList: JSON.parse(sessionStorage.getItem("versionList")),
			tableReq: {
				"platform":"1",
                "beginTime":lMonthY.replace(/\-/g,''),
                "appVersion":"all",
          		"appkey":"1495694327946r8oxt1165a05t90k3i2",
                "endTime":yesterday.replace(/\-/g,''),
                "dateTime":"20120101"
			}
		}
	}
	handleClick(e,index) {
		const childs = e.currentTarget.parentNode.parentNode.childNodes
		for (let i = 0; i < childs.length; i++) {
			childs[i].classList.remove('active')
		}
		e.currentTarget.parentNode.classList.add('active')
		const { getTableData } = this.props
		getTableData(this.state.tableReq, index)
		this.state.index = index
	}
	componentWillMount(){
		const { getTableData } = this.props
  		getTableData(this.state.tableReq, '0')
	}
	onBeginTimeChange(dateString){
		var beginTime = dateString.replace(/\-/g,'')
		if(this.state.tableReq.endTime>beginTime){
			this.state.tableReq.beginTime = beginTime
			const { getTableData } = this.props
			getTableData(this.state.tableReq, this.state.index)
		}else{
			message.error('请选择正确的日期')
		}
		
	}
	onEndTimeChange(dateString){
		var endTime = dateString.replace(/\-/g,'')
		if(endTime > this.state.tableReq.beginTime){
			this.state.tableReq.endTime = endTime
			const { getTableData } = this.props
			getTableData(this.state.tableReq, this.state.index)
		}else{
			message.error('请选择正确的日期')
		}
	}
	onSelChange(value){
		var dateTime = value.replace(/\-/g,'')
		this.state.tableReq.dateTime = dateTime
		const { getTableData } = this.props
		getTableData(this.state.tableReq, this.state.index)
		
	}
	onVersionChange(value){
		const { getTableData } = this.props
		this.state.tableReq.appVersion = value
		getTableData(this.state.tableReq, this.state.index)
	}
	devTypeClick(num){
    	let app = ['iPad','iPhone','Android']
    	const { getTableData } = this.props
		this.state.tableReq.platform = num
		getTableData(this.state.tableReq, this.state.index)
    	this.setState({ current:num })
  	}
  	getClass(num){
    	return num == this.state.current ? 'active': ''
  	}
	render() {
		const columns = [{
			title: '日期',
			dataIndex: 'date',
			sorter: (a, b) => a.date - b.date
		},
		{
			title: '日活跃度',
			dataIndex: 'dateLiveness',
			sorter: (a, b) => a.dateLiveness.slice(0,5) - b.dateLiveness.slice(0,5)
		},{
			title: '活跃用户',
			dataIndex: 'activeUser',
			sorter: (a, b) => a.activeUser - b.activeUser
		}, {
			title: '周活跃度',
			dataIndex: 'weekLiveness',
			sorter: (a, b) => a.weekLiveness - b.weekLiveness
		}, {
			title: '周活跃用户',
			dataIndex: 'weekActiveUser',
			sorter: (a, b) => a.weekActiveUser - b.weekActiveUser
		}, {
			title: '月活跃度',
			dataIndex: 'monLiveness',
			sorter: (a, b) => a.monLiveness - b.monLiveness
		}, {
			title: '月活跃用户',
			dataIndex: 'monActiveUser',
			sorter: (a, b) => a.monActiveUser - b.monActiveUser
		}];

		const { tableOutput, chartOutput } = this.props.state
		
		return (
			<div className="userActivity">
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
				<div className="row1">
					<div>
						<h5 className="title">
							用户活跃度
							<Tooltip placement="right" title="用户活跃度">
        						<Icon type="question-circle" />
      						</Tooltip>
						</h5>
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
						<Select
    						showSearch
    						style={{ float: 'right', marginRight: 20 }}
    						defaultValue="all"
    						onChange={(value)=>this.onVersionChange(value)}
  						>
  							<Option value="all">全部版本</Option>
    						{
              					this.state.versionList.map((item) => {
                				return <Option value={item.appVersion} key={item.appVersion}>{item.appVersion}</Option>
              					})
            				}
  						</Select>
  						<div>
  							<span style={{ display: 'inline-block', height: '28px', lineHeight: '28px', marginRight: '5px' }}>选择起始时间：</span>
  							<Select
    							showSearch
    							style={{ float: 'right', marginRight: 20 }}
    							defaultValue="2012-01-01"
    							onChange={value=>this.onSelChange(value)}
  							>
    							<Option value="2012-01-01">2012-01-01(最开始)</Option>
    							<Option value={sixMonth}>{`${sixMonth}(半年前)`}</Option>
    							<Option value={thrMonth}>{`${thrMonth}(三月前)`}</Option>
    							<Option value={lMonthY}>{`${lMonthY}(一月前)`}</Option>
    							<Option value={lastWeekY}>{`${lastWeekY}(一周前)`}</Option>
  							</Select>
  						</div>
					</div>
				</div>

				<div className="row2">
					<ul className="nav">
						<li className="active">
							<a className="fz12" onClick={(e,index) => this.handleClick(e, 0)}>日活跃度</a>
						</li>
						<li>
							<a className="fz12" onClick={(e,index) => this.handleClick(e, 1)}>周活跃度</a>
						</li>
						<li>
							<a className="fz12" onClick={(e,index) => this.handleClick(e, 2)}>月活跃度</a>
						</li>
					</ul>
				</div>
				<div className="row3">
					<div>
						<ReactEcharts
                        	option={getOption6(chartOutput)} 
                        	style={{height: '435px', width: '100%', marginTop: '5px', marginRight: 0 }} 
                        	className='react_for_echarts' 
                        	onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
                        	notMerge={true}
                        />
					</div>
				</div>
				<div className="row4">
					<div className="tableTitle">
						<div className="tableTitleText">数据表</div>
						<div className="rightBtn">
							<Button>导出</Button>
						</div>
					</div>
					<Table
						pagination={{ pageSize: 5,showQuickJumper: true }} 
    					columns={columns}
    					dataSource={tableOutput}
    					className="tableContent"
    					onChange={this.handleChange}
 					/>
				</div>
			</div>
		)
	}
}