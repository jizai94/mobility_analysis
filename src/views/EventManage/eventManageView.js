import React, { Component } from 'react'
import { Link } from 'react-router'
import { Modal, Button, Input, Select, Checkbox, Tooltip, Icon, message } from 'antd'
import { today, yesterday ,lMonthY} from 'GLOBAL'
import { getCookie, setCookie } from 'UTIL/cookie'
import NProgress from 'nprogress'
import './eventManageView.scss'


export default class EventManageView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			event: {
				"platform": "1",
				"date": yesterday,
				"appkey": sessionStorage.getItem('appkey'),
				"appVersion": "all"
			},
			createEventVisible: false,
			updateEventVisible: false,
			"id": "",
			"id2": "",
			eventId: "",
			eventName: "",
			eventUse: "",
			current: "1",
			eventId1: "",
			eventName1: "",
			eventUse1: "",
		}
	}
	componentWillMount() {
		const {
			eventManage
		} = this.props
		eventManage(this.state.event, () => {
			NProgress.done()
		}, () => {
			NProgress.done()
		})
	}
	createEvent() {
		this.setState({
			createEventVisible: true
		})
	}
	handleCancel() {
		this.setState({
			createEventVisible: false
		})
	}
	handleCancel2() {
		this.setState({
			updateEventVisible: false
		})
	}
	handleOk() {
		const {
			eventUpDateManage,
			eventManage
		} = this.props
		if (!this.state.eventId1) {
			message.info('事件ID不能为空')
			return
		}
		if (!this.state.eventName1) {
			message.info('事件名称不能为空')
			return
		}
		eventUpDateManage({
			"platform": "1",
			"id": "",
			"appkey": this.state.event.appkey,
			"appVersion": "All",
			"eventId": this.state.eventId1,
			"eventName": this.state.eventName1,
			"eventUse": this.state.eventUse1
		}, () => {
			NProgress.done()
			this.setState({
				createEventVisible: false
			});
			message.success('添加成功')
			eventManage(this.state.event, () => {
				NProgress.done()
			}, () => {
				NProgress.done()
			})
		}, () => {
			NProgress.done()
			message.error('添加失败')
		})
	}
	handleOk2() {
		const {
			eventUpDateManage,
			eventManage
		} = this.props
		if (!this.state.eventId) {
			message.info('事件ID不能为空')
			return
		}
		if (!this.state.eventName) {
			message.info('事件名称不能为空')
			return
		}
		eventUpDateManage({
			"platform": "1",
			"id": this.state.id2,
			"appkey": this.state.event.appkey,
			"appVersion": "All",
			"eventId": this.state.eventId,
			"eventName": this.state.eventName,
			"eventUse": this.state.eventUse
		}, () => {
			NProgress.done()
			this.setState({
				createEventVisible: false
			});
			message.success('更新成功')
			eventManage(this.state.event, () => {
				NProgress.done()
			}, () => {
				NProgress.done()
			})
		}, () => {
			NProgress.done()
			message.error('更新失败')
		})
		this.setState({
			updateEventVisible: false
		})
	}
	update(e) {
		let id = e.currentTarget.parentNode.parentNode.getAttribute('data-value')
		this.setState({
			'id2': id
		})
		const {
			dataTable,
			eventUpDateManage,
			eventManage
		} = this.props
		dataTable.map((item, i) => {
			if (item.id == id) {
				this.setState({
					eventId: item.eventId,
					eventName: item.eventName,
					eventUse: item.eventUse
				})
			}
		})
		this.setState({
			updateEventVisible: true
		})
	}
	delete(e) {
		let id = e.currentTarget.parentNode.parentNode.getAttribute('data-value')
		const {
			eventDeleteManage,
			eventManage
		} = this.props
		eventDeleteManage({
			id
		}, () => {
			NProgress.done()
			this.setState({
				createEventVisible: false
			});
			message.success('删除成功')
			eventManage(this.state.event, () => {
				NProgress.done()
			}, () => {
				NProgress.done()
			})
		}, () => {
			NProgress.done()
		})
	}
	getClass(num) {
		return num == this.state.current ? 'active' : ''
	}
	handleClickTab(num) {
		console.log(num)
		let app = ['iPad', 'iPhone', 'Android']
		this.setState({
			current: num
		})
		const {
			eventManage
		} = this.props
		this.setState({
			event: {
				"platform": num,
				"date": this.state.event.date,
				"appkey": this.state.event.appkey,
				"appVersion": this.state.event.appVersion
			}
		}, () => {
			eventManage(this.state.event, () => {
				NProgress.done()
			}, () => {
				NProgress.done()
			})
		})
	}
	render() {
		const {
			dataTable
		} = this.props
		return (
			<div className="eve">
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
						<div className="list">自定义事件</div>
						<Button type="primary" onClick={(e) => this.createEvent(e)} className="btn3">添加自定义事件</Button>
					</div>
					<div className="tb">
						<table>
							<tbody>
								<tr style={{'background':'#F5F6FA','color':'#666'}}>
									<td style={{'width':'15%'}}>事件ID</td>
									<td style={{'width':'15%'}}>事件名称</td>
									<td style={{'width':'45%'}}>事件用途</td>
									<td style={{'width':'25%'}}>操作</td>
								</tr>
								{
				                  dataTable.map((item, index) => {
				                    return (
				                      <tr key={item.id} data-value={item.id}>
										<td style={{'width':'15%'}}>{item.eventId}</td>
										<td style={{'width':'15%'}}>{item.eventName}</td>
										<td style={{'width':'45%'}}>{item.eventUse}</td>
										<td style={{'width':'25%'}}>			
											<span onClick={e=>this.update(e)}>修改</span>
											<span onClick={e=>this.delete(e)}>删除</span>
											<span><Link to={`home/eventDetails.html?eventId=${item.eventId}`}>查看数据</Link></span>
										</td>
									</tr>
				                    )
				                  })
				                }					
							</tbody>
						</table>
						
					</div>
					<Modal 
						title="注册自定义事件"
						visible={this.state.createEventVisible}
          				onOk={(e) => this.handleOk(e)} 
          				onCancel={(e) => this.handleCancel(e)}
          				cancelText="取消" okText="确定"
          				key="add"
        			>
          				<div className='list'>
          					<span className='title'><b style={{color: '#F00'}}>*</b> 事件ID:</span>         					
    						<Input placeholder="请输入事件ID" onChange={(e) => this.setState({eventId1: e.target.value})} ref='eid'/>
          				</div>
          				<div className='list'>
          					<span className='title'><b style={{color: '#F00'}}>*</b> 事件名称:</span>          					
    						<Input placeholder="请输入事件名称" onChange={(e) => this.setState({eventName1: e.target.value})}/>    
  						</div>
          				<div className='list'>
          					<span style={{ height: '82px', lineHeight: '82px' }} className='title'>事件用途:</span>
          					<Input type="textarea" rows={4} onChange={(e) => this.setState({eventUse1: e.target.value})}/>
          				</div>
        			</Modal>
        			<Modal 
						title="更新自定义事件"
						visible={this.state.updateEventVisible}
          				onOk={(e) => this.handleOk2(e)} 
          				onCancel={(e) => this.handleCancel2(e)}
          				cancelText="取消" okText="确定"
          				key="update"
        			>
          				<div className='list'>
          					<span className='title'><b style={{color: '#F00'}}>*</b> 事件ID:</span>         					
    						<Input placeholder="请输入事件ID"  value={this.state.eventId} disabled='true'/>
          				</div>
          				<div className='list'>
          					<span className='title'><b style={{color: '#F00'}}>*</b> 事件名称:</span>          					
    						<Input placeholder="请输入事件名称" onChange={(e) => this.setState({eventName: e.target.value})} value={this.state.eventName}/>    
  						</div>
          				<div className='list'>
          					<span style={{ height: '82px', lineHeight: '82px' }} className='title'>事件用途:</span>
          					<Input type="textarea" rows={4} onChange={(e) => this.setState({eventUse: e.target.value})} value={this.state.eventUse}/>
          				</div>
        			</Modal>
				</div>
		)

	}
}