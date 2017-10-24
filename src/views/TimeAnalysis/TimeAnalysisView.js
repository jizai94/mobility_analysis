import React, { Component } from 'react'
import { Link } from 'react-router'
import './timeAnalysis.scss'
import { Button, Icon, Select, Tooltip, DatePicker, Table, message } from 'antd'
import { today, yesterday, lastWeekY } from 'GLOBAL'
import NProgress from 'nprogress'
import moment from 'moment';
import ReactEcharts from 'echarts-for-react'
import { getOption4 } from '../../option/todayDetails'
import { getCookie, setCookie } from 'UTIL/cookie'
const { Option } = Select;

let stateMenu = 'activeUser'

export default class TimeAnalysis extends Component {
	constructor(props){
		super(props)
		this.state = {
        current: 1,
        versionList: JSON.parse(sessionStorage.getItem('versionList')),
			  platform: '1',
        chooseDate1: yesterday,
        chooseDate2: lastWeekY,
    		// appkey: 'sads213',
    		date: yesterday,
    		appVersion: 'all',
    		interfaceName: 'startTimes',
    		eventIdentifier: 'AppStart',
    		stateMenu: 'activeUser',
    		echeart1: {},
    		echeart2: {},
    		tableData: []
		}
	}
	handleClick(e) {
		stateMenu = e.currentTarget.getAttribute('data-value')
		const childs = e.currentTarget.parentNode.parentNode.childNodes
		for(let i = 0; i < childs.length; i++){
			childs[i].classList.remove('active')
		}
		e.currentTarget.parentNode.classList.add('active')
		const { changeMenu } = this.props
		changeMenu(stateMenu)
	}
	handleChange1(dateString) {
		const { timeAnalysis } = this.props
    this.setState({
      chooseDate1: dateString
    })
		timeAnalysis(
      	{
      		...this.state,
      		dateTime: dateString
      	}, stateMenu, () => {
      		NProgress.done()
      		message.info(`${dateString}请求发送成功`)
      	}, () => {
      		NProgress.done()
      		message.info('请求发送失败')
      	}, 'datePicker1')
	}
	handleChange2(dateString) {
		const { timeAnalysis } = this.props
    this.setState({
      chooseDate2: dateString
    })
		timeAnalysis(
      	{
      		...this.state,
      		dateTime: dateString
      	}, stateMenu, () => {
      		NProgress.done()
      		message.info(`${dateString}请求发送成功`)
      	}, () => {
      		NProgress.done()
      		message.info('请求发送失败')
      	}, 'datePicker2')
	}

    getClass(num){
      return num == this.state.current ? 'active': ''
    }
    handleClickNum(num){
      console.log(num)
      let app = ['iPhone','Android']
      this.setState({
        current: num,
        platform: num
      })
      const { timeAnalysis } = this.props
      timeAnalysis(
        {
          ...this.state,
          platform: num,
          dateTime: this.state.chooseDate1
        }, stateMenu, () => {
          NProgress.done()
          message.info(`${dateString}请求发送成功`)
        }, () => {
          NProgress.done()
          message.info('请求发送失败')
        }, 'datePicker1')
      timeAnalysis(
        {
          ...this.state,
          platform: num,
          dateTime: this.state.chooseDate2
        }, stateMenu, () => {
          NProgress.done()
          message.info(`${dateString}请求发送成功`)
        }, () => {
          NProgress.done()
          message.info('请求发送失败')
        }, 'datePicker2')
    }
  	componentWillMount() {
        stateMenu = 'activeUser'
  		const { timeAnalysis } = this.props
  		timeAnalysis(
      	{
      		...this.state,
      		dateTime: yesterday
      	}, stateMenu, () => {
      		NProgress.done()
      		message.info(`昨天请求发送成功`)
      	}, () => {
      		NProgress.done()
      		message.info('请求发送失败')
      	})
      	timeAnalysis(
      	{
      		...this.state,
      		dateTime: lastWeekY
      	}, stateMenu, () => {
      		NProgress.done()
      		message.info(`上周请求发送成功`)
      	}, () => {
      		NProgress.done()
      		message.info('请求发送失败')
      	})

        
  	}
  resizeChart(chart){
    
    setTimeout(function(){
          chart.resize();
      },0)
  }
  handleChangeVersion(value) {
    console.log(value)
    this.setState({
      appVersion: value
    })
    const { timeAnalysis } = this.props
    timeAnalysis(
      {
        ...this.state,
        appVersion: value,
        dateTime: this.state.chooseDate1
      }, stateMenu, () => {
        NProgress.done()
        message.info(`${dateString}请求发送成功`)
      }, () => {
        NProgress.done()
        message.info('请求发送失败')
      }, 'datePicker1')
    timeAnalysis(
      {
        ...this.state,
        appVersion: value,
        dateTime: this.state.chooseDate2
      }, stateMenu, () => {
        NProgress.done()
        message.info(`${dateString}请求发送成功`)
      }, () => {
        NProgress.done()
        message.info('请求发送失败')
      }, 'datePicker2')
  }
	render() {
		const state = this.props.state,
			  echeart1 = state.echeart1,
			  echeart2 = state.echeart2,
			  tableData = state.tableData
		const columns = [{
    	  title: '时间',
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
    	  title: '次均使用时长(秒)',
    	  dataIndex: 'perUserTime',
    	  sorter: (a, b) => a.perUserTime - b.perUserTime
    	}];
		return (
			<div className="timeAnalysis">
        <div className="app-header">
          <header>
            <nav className="device-type clearfix">
              <h3>{getCookie('appName')}</h3>
              <ul className="clearfix">
                <li className={this.getClass(1)} onClick={e=>this.handleClickNum(1)}><a>iPhone</a></li>
                <li className={this.getClass(2)} onClick={e=>this.handleClickNum(2)}><a>Android</a></li>
              </ul>
            </nav>
            <Link to="applist/applist.html" className="back"><Button type="primary" ghost>返回APP列表</Button></Link>
          </header>
        </div>
				<div className="row1">
					<div>
						<h5 className="title">
							时段分析
							<Tooltip placement="right" title="时段分析">
        						<Icon type="question-circle" />
      						</Tooltip>
						</h5>
						<div>
							<Select 
                defaultValue="all" 
                style={{ width: 120, float: 'right' }}
                onChange={ (e, value) => this.handleChangeVersion(e, value) }
              >
                <Option value="all">全部版本</Option>
                {
                  this.state.versionList.map((item) => {
                    return <Option value={item.appVersion} key={item.appVersion}>{item.appVersion}</Option>
                  })
                }
              </Select>
						</div>
  						<div>
  							<DatePicker 
  								size="default" 
  								defaultValue={moment(yesterday, 'YYYY-MM-DD')} 
  								onChange = { (date, dateString) => { this.handleChange1(dateString) } }
  								disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }
  							/>
  						</div>
					</div>
				</div>
				<div className="row2">
					<ul className="nav">
						<li className="active">
							<a className="fz12" onClick={e => this.handleClick(e)} data-value="activeUser">活跃用户</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick(e)} data-value="addUser">新增用户</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick(e)} data-value="loginMember">登录会员</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick(e)} data-value="perStartTimes">人均启动次数</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick(e)} data-value="perUserTime">次均使用时长(秒)</a>
						</li>
					</ul>
				</div>
				<div className="row3">
					<div>
						<h6 className="fz14">24小时趋势</h6>
						<div>
							<h6 className="fz14">对比：</h6>
							<DatePicker 
								size="default" 
								defaultValue={moment(lastWeekY, 'YYYY-MM-DD')} 
								onChange = { (date, dateString) => { this.handleChange2(dateString) }}
								disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }
							/>
						</div>
						<ReactEcharts
              option={getOption4(echeart1, echeart2)} 
              style={{height: '450px', width: '100%', marginRight: 0}} 
              className='react_for_echarts'
              onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
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
    					columns={columns}
    					dataSource={tableData}
    					className="tableContent"
    					onChange={this.handleChange}
 					/>
				</div>
			</div>
		)
	}
}