import React, { Component } from 'react'
import { Link } from 'react-router'
import NProgress from 'nprogress'
import './eventDetailsView.scss'
import { Button, Icon, Select, Input, DatePicker, Table, message, Tooltip } from 'antd'
import { today, yesterday ,lMonthY} from 'GLOBAL'
import moment from 'moment'
import ReactEcharts from 'echarts-for-react'
const { Option, OptGroup } = Select;
const Search = Input.Search;

const getOption5 = (dateArr,arrDate,str) => {
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom: '20',
            data: [str]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid'
                }
            },
            boundaryGap: false,
            data: dateArr
        }],
        yAxis: {
            type: 'value',
            axisTick: {
                // 刻度与标签对齐
                alignWithLabel: true
            },
            splitLine: {
                lineStyle: {
                    type: 'solid'
                }
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: str,
            type: 'line',
            zlevel: 10,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: 'rgb(136, 195, 232)'
                }
            },
            data: arrDate
        }]
    };
    return option;
}
let state = '触发次数'
export default class EventDetailsView extends Component {
	constructor(props) {
		super(props)
		let eventId = location.href.split("?")[1].split("=")[1]
		if(!eventId){
			history.back();
			return
		}
		console.log(eventId)
		this.state = {
			    "platform":"1",
                "beginTime":"20170507",
                "endTime":"20170509",
      			"appkey":sessionStorage.getItem('appkey'),
                "appVersion":"1.0.6",
                "eventId":eventId
		}
	}
	componentWillMount(){
		const { eventDetails } = this.props
		console.log(this.props)
		eventDetails(this.state,state,() => {
            NProgress.done()
            message.info('请求发送成功')
        }, () => {
            NProgress.done()
            message.info('请求发送失败')
        })
	}
	handleClick(e) {
		const childs = e.currentTarget.parentNode.parentNode.childNodes
		for (let i = 0; i < childs.length; i++) {
			childs[i].classList.remove('active')
		}
		e.currentTarget.parentNode.classList.add('active')

	}
	handleTab(e){	
		const childs = e.currentTarget.parentNode.parentNode.childNodes
		for (let i = 0; i < childs.length; i++) {
			childs[i].classList.remove('active')
		}
		e.currentTarget.parentNode.classList.add('active')
		const { eventDetails } = this.props
		let str = e.currentTarget.innerHTML
		eventDetails(this.state,str,() => {
            NProgress.done()
            message.info('请求发送成功')
        }, () => {
            NProgress.done()
            message.info('请求发送失败')
        })
	}
	render() {
		const { dataTable,avgDateTriggerUser,avgDateTriggerNum,perUserTime,avgUserTime,dateArr,arrDate,str } = this.props
		const versionList = JSON.parse(sessionStorage.getItem('versionList'))
		const columns = [{
			title: '统计日期',
			dataIndex: 'date',
			sorter: (a, b) => a.date - b.date
		}, {
			title: '触发次数',
			dataIndex: 'triggerNum',
			sorter: (a, b) => a.triggerNum - b.triggerNum
		}, {
			title: '触发用户数',
			dataIndex: 'activeUser',
			sorter: (a, b) => a.activeUser - b.activeUser
		}, {
			title: '登录会员',
			dataIndex: 'loginMember',
			sorter: (a, b) => a.loginMember - b.loginMember
		}, {
			title: '次均使用时长(秒)',
			dataIndex: 'perStartTimes',
			sorter: (a, b) => a.perStartTimes - b.perStartTimes
		}, {
			title: '人均使用时长(秒)',
			dataIndex: 'perUserTime',
			sorter: (a, b) => a.perUserTime - b.perUserTime
		}];
		return (
			<div className="eventDetail">
				<div className="row1">
					<div>
						<h5 className="title">
							{this.state.eventId}
							<Tooltip placement="right" title="页面详情">
        						<Icon type="question-circle" />
      						</Tooltip>
      						<Link to="home/event.html" style={{marginLeft: 10}}>返回自定义事件</Link>
						</h5>
						<Select
    						showSearch
    						style={{ float: 'right', marginRight: 20 }}
    						defaultValue="all"
  						>
    						<Option value="all">全部版本</Option>
	                        {
	                          versionList.map((item,index) => {
	                             return(
	                                  <Option value={item.appVersion}>{item.appVersion}</Option>
	                               )
	                          })
	                        }
  						</Select>
						<div>
  							<DatePicker size="default" defaultValue={moment(lMonthY, 'YYYY-MM-DD')} />
  							{`  至  `}
  							<DatePicker size="default" defaultValue={moment(yesterday, 'YYYY-MM-DD')} />
  						</div>
					</div>
				</div>
				<div className="row2">
					<ul className="nav">
						<li>
							<a>
								<span className="fz16">日均触发次数</span><br/>
								<span className="fz24">{avgDateTriggerNum}</span><br/>
							</a>
						</li>
						<li>
							<a>
								<span className="fz16">日均触发用户数</span><br/>
								<span className="fz24">{avgDateTriggerUser}</span><br/>
							</a>
						</li>
						<li>
							<a>
								<span className="fz16">次均使用时长(秒)</span><br/>
								<span className="fz24">{perUserTime}</span><br/>
							</a>
						</li>
						<li>
							<a>
								<span className="fz16">人均使用时长(秒)</span><br/>
								<span className="fz24">{avgUserTime}</span><br/>
							</a>
						</li>
					</ul>
				</div>
				<div className="row3">
					<ul className="nav">
						<li className="active">
							<a className="fz12" onClick={e => this.handleClick(e)}>趋势分析</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick(e)}>参数分析</a>
						</li>
					</ul>
				</div>
				<div className="row4">
					<div className="menuChart">
						<ul>
							<li className="active">
								<a onClick={e => this.handleTab(e)}>触发次数</a>|
							</li>
							<li>
								<a onClick={e => this.handleTab(e)}>触发用户数</a>|
							</li>
							<li>
								<a onClick={e => this.handleTab(e)}>次均使用时长(秒)</a>|
							</li>
							<li>
								<a onClick={e => this.handleTab(e)}>人均使用时长(秒)</a>
							</li>
						</ul>
						<ReactEcharts
                        	option={getOption5(dateArr,arrDate,str)} 
                        	style={{height: '450px', width: '100%', margin: 0 }} 
                        	className='react_for_echarts' 
                        	onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
                        />
					</div>
					<div className="tableTitle">
						<div className="tableTitleText">数据表</div>
						<div className="rightBtn">
							<Button>导出</Button>
						</div>
					</div>
					<Table
    					columns={columns}
    					dataSource={dataTable}
    					className="tableContent"
    					onChange={this.handleChange}
 					/>
				</div>
			</div>
		)
	}
}
