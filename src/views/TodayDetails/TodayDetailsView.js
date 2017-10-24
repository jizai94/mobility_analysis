import React, { Component } from 'react'
import { Link } from 'react-router'
import NProgress from 'nprogress'
import './todayDetails.scss'
import { today, yesterday } from 'GLOBAL'
import { Button, Icon, Select, Tooltip, DatePicker, message } from 'antd'
import moment from 'moment';
import ReactEcharts from 'echarts-for-react'
import { getOption1, getOption2 } from '../../option/todayDetails'
import { getCookie, setCookie } from 'UTIL/cookie'
const { Option, OptGroup } = Select;

let state1 = 'activeUser',
	state2 = 'activeUser',
	t = ''

export default class TodayDetails extends Component {
	constructor(props){
		super(props);
		this.state = {
			current: 1,
			versionList: JSON.parse(sessionStorage.getItem('versionList')),
			platform: '1',
    	dateTime: today,
    	chooseTime1: yesterday,
    	chooseTime2: yesterday,
    	appVersion: 'all',
    	time: '',
    	state1: 'activeUser',
    	state2: 'activeUser',
    	activeUser: 0,
    	addUser: 0,
    	loginMember: 0,
    	startTimes: 0,
    	echeart1: {},
    	echeart2: {},
    	echeart3: {},
    	echeart4: {}
		}
	}
	handleClick1(e) {
		state1 = e.currentTarget.getAttribute('data-value')
		this.setState({
			state1: state1
		})
		const childs = e.currentTarget.parentNode.parentNode.childNodes
		for(let i = 0; i < childs.length; i++){
			childs[i].classList.remove('active')
		}
		e.currentTarget.parentNode.classList.add('active')
		const { changeMenu1 } = this.props
		changeMenu1(state1)
	}
	handleClick2(e) {
		state2 = e.target.getAttribute('data-value')
		this.setState({
			state2: state2
		})
		const childs = e.currentTarget.parentNode.parentNode.childNodes
		for(let i = 0; i < childs.length; i++){
			childs[i].classList.remove('active')
		}
		e.currentTarget.parentNode.classList.add('active')
		const { changeMenu2 } = this.props
		changeMenu2(state2)
	}
	handleChange1(dateString) {
		const { todayDetails } = this.props
		this.setState({
			chooseTime1: dateString
		})
		todayDetails(
      	{
      		...this.state,
      		dateTime: dateString
      	}, state1, state2, () => {
      		NProgress.done()
      		message.info(`${dateString}请求发送成功`)
      	}, () => {
      		NProgress.done()
      		message.info('请求发送失败')
      	}, 'datePicker1')
	}
	handleChange2(dateString) {
		const { todayDetails } = this.props
		this.setState({
			chooseTime2: dateString
		})
		todayDetails(
      	{
      		...this.state,
      		dateTime: dateString
      	}, state1, state2, () => {
      		NProgress.done()
      		message.info(`${dateString}请求发送成功`)
      	}, () => {
      		NProgress.done()
      		message.info('请求发送失败')
      	}, 'datePicker2')
	}
	handleChangeVersion(value) {
    	console.log(value)
    	this.setState({
    	  appVersion: value
    	})
    	console.log(this.state)
    	const { todayDetails } = this.props
      	NProgress.start()
      	todayDetails({
      		...this.state,
      		appVersion: value
      	}, state1, state2, () => {
      		NProgress.done()
      		message.info('今天请求发送成功')
      	}, () => {
      		NProgress.done()
      		message.info('请求发送失败')
      	})
      	todayDetails(
      	{
      		...this.state,
      		appVersion: value,
      		dateTime: this.state.chooseTime1
      	}, state1, state2, () => {
      		NProgress.done()
      		message.info('昨天请求发送成功')
      	}, () => {
      		NProgress.done()
      		message.info('请求发送失败')
      	}, 'datePicker1')
  	}

	getClass(num){
    	return num == this.state.current ? 'active': ''
  	}
  	handleClick(num){
  		console.log(num)
    	let app = ['iPhone','Android']
    	this.setState({
    		current: num,
			platform: num
    	})
    	const { todayDetails } = this.props
      	NProgress.start()
      	todayDetails({
      		...this.state,
      		platform: num
      	}, state1, state2, () => {
      		NProgress.done()
      		message.info('今天请求发送成功')
      	}, () => {
      		NProgress.done()
      		message.info('请求发送失败')
      	})
      	todayDetails(
      	{
      		...this.state,
      		platform: num,
      		dateTime: this.state.chooseTime1
      	}, state1, state2, () => {
      		NProgress.done()
      		message.info('昨天请求发送成功')
      	}, () => {
      		NProgress.done()
      		message.info('请求发送失败')
      	}, 'datePicker1')
  	}

	componentWillMount() {
		state1 = 'activeUser',
		state2 = 'activeUser'
		const { todayDetails } = this.props
      	NProgress.start()
      	todayDetails(this.state, state1, state2, () => {
      		NProgress.done()
      		message.info('今天请求发送成功')
      	}, () => {
      		NProgress.done()
      		message.info('请求发送失败')
      	})
      	todayDetails(
      	{
      		...this.state,
      		dateTime: yesterday
      	}, state1, state2, () => {
      		NProgress.done()
      		message.info('昨天请求发送成功')
      	}, () => {
      		NProgress.done()
      		message.info('请求发送失败')
      	})
	}
	componentDidMount() {
		let now = () => {
			let date = new Date(),
    		checkTime = (i) => {
    			if (i<10) {
    				i="0" + i
    			}
  				return i
    		},
    		year = checkTime(date.getFullYear()),
    		month = checkTime(date.getMonth() + 1),
    		day = checkTime(date.getDate()),
    		hour = checkTime(date.getHours()),
    		min = checkTime(date.getMinutes()),
    		sec = checkTime(date.getSeconds());
    		// document.getElementsByClassName('time')[0].innerHTML = `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    		this.setState({
    			time: `${year}-${month}-${day} ${hour}:${min}:${sec}`
    		})
		}
		t = setInterval(now, 1000);
  	}
  	componentWillUnmount() {
  		clearInterval(t)
  	}
	render() {
		const isEmptyObject = (obj) => {
    		var t;
    		for (t in obj)
        		return !1;
    		return !0
		}
		const state = this.props.state,
			  activeUser = state.activeUser,
			  addUser = state.addUser,
			  loginMember = state.loginMember,
			  startTimes = state.startTimes,
			  echeart1 = state.echeart1,
			  echeart2 = state.echeart2,
			  echeart3 = state.echeart3,
			  echeart4 = state.echeart4
		return (
			<div className="todayDetails">
				<div className="app-header">
        			<header>
            			<nav className="device-type clearfix">
                			<h3>{getCookie('appName')}</h3>
                			<ul className="clearfix">
                				<li className={this.getClass(1)} onClick={e=>this.handleClick(1)}><a>iPhone</a></li>
                			    <li className={this.getClass(2)} onClick={e=>this.handleClick(2)}><a>Android</a></li>
                			</ul>
            			</nav>
            			<Link to="applist/applist.html" className="back"><Button type="primary" ghost>返回APP列表</Button></Link>
        			</header>
      			</div>
				<div className="row1">
					<div>
						<h5 className="title">
							今日实时
							<Tooltip placement="right" title="今日实时">
        						<Icon type="question-circle" />
      						</Tooltip>
						</h5>
						<h5 className="time">{this.state.time}</h5>
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
				</div>
				<div className="row2">
					<ul className="nav">
						<li className="active">
							<a onClick={e => this.handleClick1(e)} data-value="activeUser">
								<span className="fz16">活跃用户</span><br/>
								<span className="fz24">{ activeUser }</span><br/>
							</a>
						</li>
						<li>
							<a onClick={e => this.handleClick1(e)} data-value="addUser">
								<span className="fz16">新增用户</span><br/>
								<span className="fz24">{ addUser }</span><br/>
							</a>
						</li>
						<li>
							<a onClick={e => this.handleClick1(e)} data-value="loginMember">
								<span className="fz16">登陆会员</span><br/>
								<span className="fz24">{ loginMember }</span><br/>
							</a>
						</li>
						<li>
							<a onClick={e => this.handleClick1(e)} data-value="startTimes">
								<span className="fz16">启动次数</span><br/>
								<span className="fz24">{ startTimes }</span><br/>
							</a>
						</li>
					</ul>
				</div>
				<div className="row3">
					<div>
						<h6 className="fz14">区间分布</h6>
						<div style={{marginRight: 10}}>
							<h6 className="fz14">对比：</h6>
							<DatePicker 
								size="default" 
								defaultValue={moment(yesterday, 'YYYY-MM-DD')} 
								onChange = { (date, dateString) => { this.handleChange1(dateString) } }
								disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }
							/>
						</div>
						<div style={{width: '100%'}}>
							<ReactEcharts
                        		option={getOption1(echeart1, echeart3)}
                        		style={{height: '435px', width: '100%', marginTop: '5px', marginRight: '0'}} 
                        		className='react_for_echarts'
                        		onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
                        	/>
						</div>
					</div>
				</div>
				<div className="row4">
					<ul className="nav">
						<li className="active">
							<a className="fz12" onClick={e => this.handleClick2(e)} data-value="activeUser">活跃用户</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick2(e)} data-value="addUser">新增用户</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick2(e)} data-value="loginMember">登陆会员</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick2(e)} data-value="startTimes">启动次数</a>
						</li>
					</ul>
				</div>
				<div className="row5">
					<div>
						<h6 className="fz14">24小时累计</h6>
						<div style={{marginRight: 10}}>
							<h6 className="fz14">对比：</h6>
							<DatePicker 
								size="default"
								defaultValue={moment(yesterday, 'YYYY-MM-DD')} 
								onChange = { (date, dateString) => { this.handleChange2(dateString) }}
								disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }
							/>
						</div>
						<div style={{width: '100%'}}>
							<ReactEcharts
                        		option={getOption2(echeart2, echeart4)} 
                        		style={{height: '450px', width: '100%', marginRight: '0'}} 
                        		className='react_for_echarts' 
                        		onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
                        	/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}