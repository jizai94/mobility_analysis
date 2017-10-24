import React, { Component } from 'react'
import { DatePicker, Select, Input , Button , Table , Pagination,message } from 'antd'
import { Link } from 'react-router'
import moment from 'moment'
import NProgress from 'nprogress'
import { today, yesterday ,lMonthY} from 'GLOBAL'
import { getCookie, setCookie } from 'UTIL/cookie'
import './eventView.scss'
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD'
const monthFormat = 'YYYY-MM'
const Search = Input.Search;

const columns = [{
    title: '事件ID',
    dataIndex: 'eventId'
}, {
    title: '事件名称',
    dataIndex: 'eventName'
}, {
    title: '触发次数',
    dataIndex: 'triggerNum',
    sorter: (a, b) => a.triggerNum - b.triggerNum,
}, {
    title: '活跃用户数',
    dataIndex: 'activeUser',
    sorter: (a, b) => a.activeUser - b.activeUser,
}, {
    title: '次均使用时长(秒)',
    dataIndex: 'perStartTimes',
    sorter: (a, b) => a.perStartTimes - b.perStartTimes,
}, {
    title: '人均使用时长(秒)',
    dataIndex: 'perUserTime',
    sorter: (a, b) => a.perUserTime - b.perUserTime,
}, {
    title: '数据详情',
    dataIndex: 'detail'
}];

export default class EventView extends Component {
	constructor(props){
		super(props);
        this.state = {
            event:{
                "platform":"1",
                "date":yesterday,
                "appkey":sessionStorage.getItem('appkey'),
                "appVersion":"all",
                "eventId":""
            },
            "current":"1"
        }
	}
    componentWillMount(){
        const { event } = this.props
        event(this.state.event,() => {
            NProgress.done()
        }, () => {
            NProgress.done()
        })
    }
    checkHandle(value){
        const { event } = this.props
        this.setState({event:{
            "platform":this.state.event.platform,
            "date":this.state.event.date,
            "appkey":this.state.appkey,
            "appVersion":this.state.event.appVersion,
            "eventId":value
        }},()=>{
            event(this.state.event,() => {
                NProgress.done()
                message.info('请求发送成功')
            }, () => {
                NProgress.done()
                message.info('请求发送失败')
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
      const { event } = this.props
        this.setState({event:{
            "platform":num,
            "date":this.state.event.date,
            "appkey":this.state.event.appkey,
            "appVersion":this.state.event.appVersion,
            "eventId":this.state.event.eventId
        }},()=>{
            event(this.state.event,() => {
                NProgress.done()
            }, () => {
                NProgress.done()
            })
        })
    }
    handleVersion(e){
        console.log(e)
        const { event } = this.props
        this.setState({event:{
            "platform":this.state.event.platform,
            "date":this.state.event.date,
            "appkey":this.state.event.appkey,
            "appVersion":e,
            "eventId":this.state.event.eventId
        }},()=>{
            event(this.state.event,() => {
                NProgress.done()
            }, () => {
                NProgress.done()
            })
        })
    }
	render() {
        const { dataTable }  = this.props
        const versionList = JSON.parse(sessionStorage.getItem('versionList'))
        dataTable.map((item) => {
            item.detail = <Link to={`home/eventDetails.html?eventId=${item.eventId}`}>详细数据</Link>
        })
 		return (
			<div className="event">
                <div className="app-header" style={{padding: '0 25px'}}>
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
				<div className="top">
					<div className="vera verw">
						<h4>自定义事件</h4>
					</div>
					<div className="verc verw">
						<Select defaultValue="全部版本" style={{ width: 150 }} onChange ={e => this.handleVersion(e)}>
                        <Option value="all">全部版本</Option>
                        {
                          versionList.map((item,index) => {
                             return(
                                  <Option value={item.appVersion}>{item.appVersion}</Option>
                               )
                          })
                        }
			   			</Select>	
					</div>	
					<div className="verb verw">
					    <DatePicker defaultValue={moment(yesterday, dateFormat)} format={dateFormat}  disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }/>				    
					</div>									
				</div>
				<div className="bottom">
					<div className="row1">
						<div className="l1">数据表</div>
                        <div className="l3">
                            <Button>导出</Button>
                        </div>
						<div className="l2">
                            <Search
                              placeholder="输入关键字进行搜索..."
                              style={{ width: 200, marginRight: 15 }}
                              onSearch={value => this.checkHandle(value)}
                            />	
						</div>
					</div>
					<div className="row2">
						<Table columns={columns}  className="tableContent" dataSource={dataTable} onChange={this.onChange}/>
					</div>
				</div>
			</div>
		)
	}
}