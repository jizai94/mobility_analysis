import React, { Component } from 'react'
import './applicationTrend.scss'
import NProgress from 'nprogress'
import { Link } from 'react-router'
import { Button, Icon, Select, Tooltip, DatePicker, Table , message } from 'antd'
import { today, yesterday ,lMonthY ,lastWeek } from 'GLOBAL'
import moment from 'moment';
import ReactEcharts from 'echarts-for-react'
import { getOption3 } from '../../option/todayDetails'
import { getCookie, setCookie } from 'UTIL/cookie'
const { Option, OptGroup } = Select;
const columns1 = [{
		  title: '对比时间',
		  dataIndex: 'contrastTime'
		}, {
		  title: '活跃用户',
		  dataIndex: 'activeUser',
		}, {
		  title: '新增用户',
		  dataIndex: 'addUser',
		},{
		  title: '登录会员',
		  dataIndex: 'loginMember',
		},{
		  title: '人均启动次数',
		  dataIndex: 'perStartTimes',
		},{
		  title: '活跃度',
		  dataIndex: 'activityDegree',
		}];
		
let state = 'ACTIVEUSER'

export default class ApplicationTrend extends Component {
	constructor(props){
		super(props)
		this.state = {
			"req":{
				"platform":"1",
	         	"beginTime":lMonthY,
	          	"appVersion":"all",
				"appkey":sessionStorage.getItem('appkey'),
	            "endTime":yesterday,
	            "currentPage":"1",
	          	"turnPageShowNum":"100"
	        },
	        current:"1"
		}
	}
	componentWillMount(){
		const { applicationTrend } = this.props
        NProgress.start()
        applicationTrend(this.state.req,state,() => {
            NProgress.done()
            message.info('请求发送成功')
        }, () => {
            NProgress.done()
            message.info('请求发送失败')
        })
	}
	handleClick(e) {		
		const childs = e.currentTarget.parentNode.parentNode.childNodes
		for(let i = 0; i < childs.length; i++){
			childs[i].classList.remove('active')
		}
		e.currentTarget.parentNode.classList.add('active')
		const { menuTab } = this.props
		let state1 = e.currentTarget.getAttribute('data-value')
		menuTab(state1)
	}
	handleChange1(dateString){
		const { applicationTrend ,str } = this.props
		this.setState({'req':{
				"platform":this.state.req.platform,
	         	"beginTime":dateString,
	          	"appVersion":this.state.req.appVersion,
				"appkey":this.state.appkey,
	            "endTime":this.state.req.endTime,
	            "currentPage":this.state.req.currentPage,
	          	"turnPageShowNum":this.state.req.turnPageShowNum
	        }
	    },()=>{
	        	applicationTrend(this.state.req,str,() => {
		            NProgress.done()
		            message.info('请求发送成功')
		        }, () => {
		            NProgress.done()
		            message.info('请求发送失败')
		        })
	        })	   
	}
	handleChange2(dateString){
		const { applicationTrend, str } = this.props
		this.setState({'req':{
				"platform":this.state.req.platform,
	         	"beginTime":this.state.req.beginTime,
	          	"appVersion":this.state.req.appVersion,
				"appkey":this.state.appkey,
	            "endTime":dateString,
	            "currentPage":this.state.req.currentPage,
	          	"turnPageShowNum":this.state.req.turnPageShowNum
	        }
	    },() => {
	        	applicationTrend(this.state.req,str,() => {
		            NProgress.done()
		        }, () => {
		            NProgress.done()
		        })
	        })	    
	}
	getClass(num){
    	return num == this.state.current ? 'active': ''
  	}
  	handleClickTab(num){
    	let app = ['iPad','iPhone','Android']
    	this.setState({ current:num })
    	const { applicationTrend, str } = this.props
		this.setState({'req':{
				"platform":num,
	         	"beginTime":this.state.req.beginTime,
	          	"appVersion":this.state.req.appVersion,
				"appkey":this.state.appkey,
	            "endTime":this.state.req.endTime,
	            "currentPage":this.state.req.currentPage,
	          	"turnPageShowNum":this.state.req.turnPageShowNum
	        }
	    },() => {
	        	applicationTrend(this.state.req,str,() => {
		            NProgress.done()
		        }, () => {
		            NProgress.done()
		        })
	        })	   
  	}
  	handleAve(e){
  		let timeChoise
  		if(e == 'seven'){
  			timeChoise = lastWeek
  		}else if( e == 'thirty'){
  			timeChoise = lMonthY
  		}
  		console.log(timeChoise)
  		const { applicationTrend, str } = this.props
    	applicationTrend({
				"platform":this.state.req.platform,
	         	"beginTime":timeChoise,
	          	"appVersion":this.state.req.appVersion,
				"appkey":this.state.req.appkey,
	            "endTime":yesterday,
	            "currentPage":this.state.req.currentPage,
	          	"turnPageShowNum":this.state.req.turnPageShowNum
	        },str,() => {
	        NProgress.done()
	    }, () => {
	        NProgress.done()
	    })	  
  	}
  	handleVersion(e){
  		const { applicationTrend, str } = this.props
  		this.setState({'req':{
				"platform":this.state.req.platform,
	         	"beginTime":this.state.req.beginTime,
	          	"appVersion":e,
				"appkey":this.state.appkey,
	            "endTime":this.state.req.endTime,
	            "currentPage":this.state.req.currentPage,
	          	"turnPageShowNum":this.state.req.turnPageShowNum
	        }
	    },() => {
	        	applicationTrend(this.state.req,str,() => {
		            NProgress.done()
		        }, () => {
		            NProgress.done()
		        })
        })	    
  	}
	render() {
		const { data2, arrNow, dateArr, str ,data1 } = this.props
		const versionList = JSON.parse(sessionStorage.getItem('versionList'))
    	const columns2 = [{
    	  title: '日期',
    	  dataIndex: 'date',
    	  sorter: (a, b) => a.date - b.date
    	}, {
    	  title: '活跃用户',
    	  dataIndex: 'activeUser',
    	  sorter: (a, b) => a.activeUser - b.activeUser
    	}, {
    	  title: '新增用户',
    	  dataIndex: 'addUser',
    	  sorter: (a, b) => a.addUser - b.addUser
    	},{
    	  title: '登录会员',
    	  dataIndex: 'loginMember',
    	  sorter: (a, b) => a.loginMember - b.loginMember
    	},{
    	  title: '人均启动次数',
    	  dataIndex: 'perStartTimes',
    	  sorter: (a, b) => a.perStartTimes - b.perStartTimes
    	},{
    	  title: '次均使用时长(毫秒)',
    	  dataIndex: 'perUserTime',
    	  sorter: (a, b) => a.perUserTime - b.perUserTime
    	}];
		return (
			<div className="applicationTrend">
				<div className="app-header">
        			<header>
            			<nav className="device-type clearfix">
                			<h3>{getCookie('appName')}</h3>
                			<ul className="clearfix">
                				<li className={this.getClass(1)} onClick={e=>this.handleClickTab(1)}><a>iPhone</a></li>
                			    <li className={this.getClass(2)} onClick={e=>this.handleClickTab(2)}><a>Android</a></li>
                			</ul>
            			</nav>
            			<Link to="applist/applist.html" className="back"><Button type="primary" ghost>返回APP列表</Button></Link>
        			</header>
      			</div>
				<div className="row1">
					<div>
						<h5 className="title">
							应用趋势
							<Tooltip placement="right" title="应用趋势">
        						<Icon type="question-circle" />
      						</Tooltip>
						</h5>
						<div>
							<Select
    						showSearch
    						style={{ width: 150, float: 'right' }}
    						defaultValue="all"
    						onChange={e => this.handleVersion(e)}
  							>
    							<Option value="all">全部版本</Option>
			                    {
			                      versionList.map((item,index) => {
			                         return(
			                              <Option value={item.appVersion} key={item.appVersion}>{item.appVersion}</Option>
			                           )
			                      })
			                    }
  							</Select>
						</div>
  						<div>
  							<DatePicker size="default" defaultValue={moment(lMonthY, 'YYYY-MM-DD')} disabledDate={ (current) => {return current && current.valueOf() > Date.now()} } onChange = { (date, dateString) => { this.handleChange1(dateString) } }/>
			              	{`  至  `}
			              	<DatePicker
				                size="default" 
				                defaultValue={moment(yesterday, 'YYYY-MM-DD')} 
				                onChange = {(date, dateString)=>{this.handleChange2(dateString)}}
				                disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }
			              	/> 							 							
  						</div>
					</div>
				</div>
				<div className="row2">
					<div className="tableTitle">
						<div className="tableTitleText">整体数据</div>
						<div className="rightBtn">
							<Button>导出</Button>
						</div>
					</div>
					<Table
    					columns={columns1}
    					dataSource={data1}
    					pagination={false}
    					size='middle'
    					className="tableContent"
    					key='tableContent1'
 					/>
 					<div className="tableFooter"></div>
				</div>
				<div className="row3">
					<ul className="nav">
						<li className="active">
							<a className="fz12" onClick={e => this.handleClick(e)} data-value="ACTIVEUSER">活跃用户</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick(e)} data-value="ADDUSER">新增用户</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick(e)} data-value="LOGINMEMBER">登录会员</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick(e)} data-value="PERSTARTTIMES">人均启动次数</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick(e)} data-value="PERUSERTIMES">次均使用时长(秒)</a>
						</li>
					</ul>
				</div>
				<div className="row4">
					<div>
						<h6 className="fz14">趋势图</h6>
						<div>
							<h6 className="fz14">对比：</h6>
							<Select
    						showSearch
    						style={{float: 'right' }}
    						defaultValue="近30天均值"
    						onChange={(e)=>this.handleAve(e)}
  							>
    							<Option value="seven">近7天均值</Option>
    							<Option value="thirty">近30天均值</Option>
  							</Select>
						</div>
						<ReactEcharts
                        	option={getOption3(arrNow,dateArr,str)} 
                        	style={{height: '450px', width: '100%'}} 
                        	className='react_for_echarts'
                        	onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
                        />
					</div>
				</div>
				<div className="row5">
					<div className="tableTitle">
						<div className="tableTitleText">数据表</div>
						<div className="rightBtn">
							<Button>导出</Button>
						</div>
					</div>
					<Table
						pagination={{ pageSize: 5,showQuickJumper: true }} 
    					columns={columns2}
    					dataSource={data2}
    					className="tableContent"
    					onChange={this.handleChange}
    					key='tableContent2'
 					/>
				</div>
			</div>
		)
	}
}