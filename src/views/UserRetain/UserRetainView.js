import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import NProgress from 'nprogress'
import { Table, Row, Col, Button, Modal, DatePicker, Dropdown, Icon, message, Select, Pagination } from 'antd'
import ReactEcharts from 'echarts-for-react'
import './UserRetainView.scss'
import { getOption1 } from '../../option/pageRetain.js'
import { today, yesterday ,lMonthY} from 'GLOBAL'
import { getCookie, setCookie } from 'UTIL/cookie'
import { Link } from 'react-router'
let Option = Select.Option
let state = 'one'

export default class UserRetainView extends Component {
	constructor(props){
		super(props)
		this.state = {
			"userRetain":{
                "platform":"1",
             	"beginTime":lMonthY.replace(/\-/g,''),
              	"appVersion":"all",
      			"appkey":sessionStorage.getItem('appkey'),
                "endTime":yesterday.replace(/\-/g,''),
                "show":"1"
			},
			"current":"1"
		}
	}
	componentWillMount(){
		const { userRetain } = this.props
		userRetain(this.state.userRetain,state,() => {
        	NProgress.done()
	      }, () => {
	        NProgress.done()
	    })
	}
	handleClick(e){
		const childs = e.currentTarget.parentNode.childNodes;
		for(let i=0; i < childs.length; i++){
			childs[i].classList.remove('active');
		}
		e.currentTarget.classList.add('active');
		this.props.userRetain(this.state.userRetain,e.currentTarget.getAttribute('data-value'),() => {
        	NProgress.done()
	      }, () => {
	        NProgress.done()
	    })
	}
	handleTimeClick1(date,dateString){
		this.setState({'userRetain':{
		 		"platform":this.state.userRetain.platform,
             	"beginTime":dateString.replace(/\-/g,''),
              	"appVersion":this.state.userRetain.appVersion,
      			"appkey":this.state.userRetain.appkey,
                "endTime":this.state.userRetain.endTime,
                "show":this.state.userRetain.show
		}},()=>{
			this.props.userRetain(this.state.userRetain,this.props.str,() => {
        		NProgress.done()
		      }, () => {
		        NProgress.done()
		    })
		})		
	}
	handleTimeClick2(date,dateString){
		this.setState({'userRetain':{
		 		"platform":this.state.userRetain.platform,
             	"beginTime":this.state.userRetain.beginTime,
              	"appVersion":this.stateuserRetain.appVersion,
      			"appkey":this.state.userRetain.appkey,
                "endTime":dateString.replace(/\-/g,''),
                "show":this.state.userRetain.show
		}},()=>{
			this.props.userRetain(this.state.userRetain,this.props.str,() => {
        		NProgress.done()
		      }, () => {
		        NProgress.done()
		    })
		})		
	}
	handleTab(value){
		this.setState({'userRetain':{
		 		"platform":this.state.userRetain.platform,
             	"beginTime":this.state.userRetain.beginTime,
              	"appVersion":this.state.userRetain.appVersion,
      			"appkey":this.state.userRetain.appkey,
                "endTime":this.state.userRetain.endTime,
                "show":value
		}},()=>{
			this.props.userRetain(this.state.userRetain,this.props.str,() => {
        		NProgress.done()
		      }, () => {
		        NProgress.done()
		    })
		})		
	}
	handleVersion(value){
		this.setState({'userRetain':{
		 		"platform":this.state.userRetain.platform,
             	"beginTime":this.state.userRetain.beginTime,
              	"appVersion":value,
      			"appkey":this.state.userRetain.appkey,
                "endTime":this.state.userRetain.endTime,
                "show":this.state.userRetain.show
		}},()=>{
			this.props.userRetain(this.state.userRetain,this.props.str,() => {
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
	      console.log(num)
	      let app = ['iPad','iPhone','Android']
	      this.setState({ current:num })
	      this.setState({'userRetain':{
		 		"platform":num,
             	"beginTime":this.state.userRetain.beginTime,
              	"appVersion":this.state.userRetain.appVersion,
      			"appkey":this.state.userRetain.appkey,
                "endTime":this.state.userRetain.endTime,
                "show":this.state.userRetain.show
			}},()=>{
				this.props.userRetain(this.state.userRetain,this.props.str,() => {
	        		NProgress.done()
			      }, () => {
			        NProgress.done()
			    })
			})	
  	}
	render(){
		const versionList = JSON.parse(sessionStorage.getItem('versionList'))
		const { dataTable ,dateArr,arr} = this.props
		const date = new Date(),
			  year = date.getFullYear(),
			  month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
			  lastMonth = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
			  day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
			  preday = (date.getDate() - 1) < 10 ? '0' + (date.getDate() - 1) : (date.getDate() - 1),
			  lMonth = `${year}-${lastMonth}-${day}`,
			  yesterday = `${year}-${month}-${preday}`;
		const columns = [{
	      title: '首次使用日期',
	      dataIndex: 'date',
	      key: 'date',
	      sorter: (a, b) => a.date - b.date
	    }, {
	      title: '新增用户数',
	      dataIndex: 'addUser',
	      key: 'addUser',
	      sorter: (a, b) => a.addUser - b.addUser
	    }, {
	      title: '+1',
	      dataIndex: 'oneDate',
	      key: 'oneDate',
	      sorter: (a, b) => a.oneDate - b.oneDate
	    }, {
	      title: '+2',
	      dataIndex: 'twoDate',
	      key: 'twoDate',
	      sorter: (a, b) => a.twoDate - b.twoDate
	    }, {
	      title: '+3',
	      dataIndex: 'threeDate',
	      key: 'threeDate',
	      sorter: (a, b) => a.threeDate - b.threeDate
	    }, {
	      title: '+4',
	      dataIndex: 'fourDate',
	      key: 'fourDate',
	      sorter: (a, b) => a.fourDate - b.fourDate
	    }, {
	      title: '+5',
	      dataIndex: 'fiveDate',
	      key: 'fiveDate',
	      sorter: (a, b) => a.fiveDate - b.fiveDate
	    }, {
	      title: '+6',
	      dataIndex: 'sixDate',
	      key: 'sixDate',
	      sorter: (a, b) => a.sixDate - b.sixDate
	    }, {
	      title: '+7',
	      dataIndex: 'sevenDate',
	      key: 'sevenDate',
	      sorter: (a, b) => a.sevenDate - b.sevenDate
	    }, {
	      title: '+15',
	      dataIndex: 'fifteenDate',
	      key: 'fifteenDate',
	      sorter: (a, b) => a.fifteenDate - b.fifteenDate
	    }];
		return (
			<div className='layout-container'>
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
				<Row className='header-container'>
      				<Col span={6} className='fix-left'><h5>用户留存</h5><Icon type="question-circle" /></Col>
			      	<Col span={6}></Col>
			      	<Col span={8}>
						<div>
  							<DatePicker size="default" defaultValue={moment(lMonth, 'YYYY-MM-DD')} onChange={(date,dateString) =>{this.handleTimeClick1(date,dateString)}}/>
  							{`  至  `}
  							<DatePicker size="default" defaultValue={moment(yesterday, 'YYYY-MM-DD')}  onChange={(date,dateString) =>{this.handleTimeClick2(date,dateString)}}  disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }/>
  						</div>
			      	</Col>
			      	<Col span={4}>
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
			    	</Col>
    			</Row>
    			<Row className='header-container1'>
   					<ul className='nav-bar'>
	    				<li onClick={e => this.handleClick(e)} className='active last-li'><a>新增留存</a></li>
    				</ul>
    			</Row>
				<div className="topChoise">
					<span>留存分析</span>
					<Select
    						showSearch
    						style={{ width: 150, float: 'right' }}
    						defaultValue="按天展示"
    						className="chioseDay"
    						onChange={(e) => this.handleTab(e)}
  						>
    						<Option value="1">按天展示</Option>
    						<Option value="2">按周展示</Option>
    						<Option value="3">按月展示</Option>
					</Select>
				</div>
    			<Row>
	    			<div className='table-title-bar'>
	    				<div className='table-title-text'>数据表</div>
	    				<div className='outputBtn'><Button onClick={this.outputClick}>导出</Button></div>
	    			</div>
					<Table
    					columns={columns}
    					dataSource={dataTable}
    					className="tableContent"
    					onChange={this.handleChange}
    					style={{ border:'1px solid #e9e9e9' }}
    					pagination={{ pageSize: 5,showQuickJumper: true }}
 					/>
    			</Row>
    			<Row style={{marginBottom:'-1px',position: 'static'}}>
    				<ul className='nav-bar'>
	    				<li onClick={e => this.handleClick(e)} className='active' data-value='one'><a>次日留存率</a></li>
	    				<li onClick={e => this.handleClick(e)} className=''  data-value='seven'><a>7日留存率</a></li>
	    				<li onClick={e => this.handleClick(e)} className='last-li' data-value='fifteen'><a>15日留存率</a></li>
    				</ul>
    			</Row>
    			<Row>
	    			<div style={{borderTop:'1px solid #e9e9e9'}}>
	    				<ReactEcharts
                        	option={getOption1(dateArr,arr)} 
                        	style={{height: '450px', width: '100%'}} 
                        	className='react_for_echarts' 
                        	onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
                    />
	    			</div>
    			</Row>
			</div>
		)
	}
}