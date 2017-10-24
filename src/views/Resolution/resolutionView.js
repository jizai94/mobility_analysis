import React, { Component, PropTypes } from 'react'
import { Table, Row, Col, Button, Modal, DatePicker, Menu, Pagination, Icon, message, Select } from 'antd'
import { today, yesterday, timeToString } from 'GLOBAL'
import moment from 'moment';
import { Link } from 'react-router'
import { getCookie, setCookie } from 'UTIL/cookie'
import NProgress from 'nprogress'
import './resolution.scss'
const { Option } = Select

const disabledDate = current => current && current.valueOf() > Date.now()-86400000
var columnsData = [{
				      title: '分辨率',
				      dataIndex: 'resolution',
				      key: 'resolution'
				    }, {
				      title: '活跃用户占比',
				      dataIndex: 'percent',
				      key: 'percent'
				    }, {
				      title: '活跃用户数量',
				      dataIndex: 'num',
				      key: 'num'
				    }];

export default class Resoution extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 1,
			versionList: JSON.parse(sessionStorage.getItem("versionList")),
		    tableReq: {
		    	"ec_platform":"1",
		    // "ec_appKey":"17882660f8d511e6885744a8420bf25c",
			    "ec_appKey":"1495694327946r8oxt1165a05t90k3i2",
			    "ec_ranges_start": timeToString(yesterday).startTime,
			    "ec_ranges_end": timeToString(yesterday).endTime,
			    "ec_app_version":"all",
			    "ec_tab":"active_user"
		    }
		}
	}
	onChangeTime(dateString) {
  		const { getDataList } = this.props
  		let timeObject = timeToString(dateString);
  		this.state.tableReq.ec_ranges_start = timeObject.startTime;
  		this.state.tableReq.ec_ranges_end = timeObject.endTime;
  		
		getDataList(this.state.tableReq)
	}
	onVersionChange(value){
		const { getDataList } = this.props
		this.state.tableReq.ec_app_version = value
		getDataList(this.state.tableReq)
	}
	handleClick(e,param){
		const childs = e.currentTarget.parentNode.parentNode.childNodes;
		
		for(let i=0; i < childs.length; i++){
			childs[i].childNodes[0].classList.remove('active');
		}
		
		e.currentTarget.classList.add('active');
		switch(param){
			case 'active_user': 
			  	columnsData = [{
				      title: '分辨率',
				      dataIndex: 'resolution',
				      key: 'resolution'
				    }, {
				      title: '活跃用户占比',
				      dataIndex: 'percent',
				      key: 'percent'
				    }, {
				      title: '活跃用户数量',
				      dataIndex: 'num',
				      key: 'num'
				    }];break;
			case 'new_user':
				 columnsData = [{
					      title: '分辨率',
					      dataIndex: 'resolution',
					      key: 'resolution'
					    }, {
					      title: '新增用户占比',
					      dataIndex: 'percent',
					      key: 'percent'
					    }, {
					      title: '新增用户数量',
					      dataIndex: 'num',
					      key: 'num'
					    }];break;
			case 'login_user':
				 columnsData = [{
					      title: '分辨率',
					      dataIndex: 'resolution',
					      key: 'resolution'
					    }, {
					      title: '登录会员占比',
					      dataIndex: 'percent',
					      key: 'percent'
					    }, {
					      title: '登录会员数量',
					      dataIndex: 'num',
					      key: 'num'
					    }];break;
			case 'avg_start_count':
				 columnsData = [{
					      title: '分辨率',
					      dataIndex: 'resolution',
					      key: 'resolution'
					    }, {
					      title: '人均启动次数占比',
					      dataIndex: 'percent',
					      key: 'percent'
					    }, {
					      title: '人均启动次数数量',
					      dataIndex: 'num',
					      key: 'num'
					    }];break;
			case 'avg_time':
				 columnsData = [{
					      title: '分辨率',
					      dataIndex: 'resolution',
					      key: 'resolution'
					    }, {
					      title: '次均使用时长占比',
					      dataIndex: 'percent',
					      key: 'percent'
					    }, {
					      title: '次均使用时长(秒)',
					      dataIndex: 'num',
					      key: 'num'
					    }];break;

		}
		const { getDataList } = this.props
		this.state.tableReq.ec_tab = param;
		getDataList(this.state.tableReq)
	}
	outputClick(){
		console.log("正在导出文件...")
	}
	onSearch(roleName) {
	    // const { getInfoByRoleName } = this.props
	    // getInfoByRoleName(roleName)
  	}
  	devTypeClick(num){
    	let app = ['iPad','iPhone','Android']
    	this.setState({ current:num })
    	this.state.tableReq.ec_platform = num
    	const { getDataList } = this.props
  		getDataList(this.state.tableReq)
  	}
  	getClass(num){
    	return num == this.state.current ? 'active': ''
  	}
  	componentWillMount(){
  		const { getDataList } = this.props
  		getDataList(this.state.tableReq)
  	}
	render() {
		const columns = columnsData;

		const {resolutionOutput} = this.props.state;
	
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
      				<Col span={6} className='fix-left'><h5>分辨率</h5><Icon type="question-circle" /></Col>
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
    			<ul className='nav-bar-resolution'>
    				<li className=''><a onClick={(e,param) => this.handleClick(e, 'active_user')} className='active'>活跃用户</a></li>
    				<li className=''><a onClick={(e,param) => this.handleClick(e, 'new_user')}>新增用户</a></li>
    				<li className=''><a onClick={(e,param) => this.handleClick(e, 'login_user')}>登录会员</a></li>
    				<li className=''><a onClick={(e,param) => this.handleClick(e, 'avg_start_count')}>人均启动次数</a></li>
    				<li className=''><a onClick={(e,param) => this.handleClick(e, 'avg_time')}>次均使用时长(秒)</a></li>
    			</ul>
    			<div>
    				<div className='table-title-bar'>
    					<div className='table-title-text'>分辨率</div>
    					<div className='outputBtn'><Button onClick={this.outputClick}>导出</Button></div>
	    			</div>
					<div className='app-narrow-table'>
	          			<Table
				            rowKey='resolution'
				            bordered
				            pagination={{ pageSize: 5,showQuickJumper: true }} 
				            columns={columns}
				            dataSource={ resolutionOutput }
	          			/>
	        		</div>
    			</div>
			</div>
		)
	}
}