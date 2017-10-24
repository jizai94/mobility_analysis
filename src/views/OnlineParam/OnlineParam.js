import React, { Component } from 'react'
import { Link } from 'react-router'
import NProgress from 'nprogress'
import { Modal, Button, Input, Select, Checkbox, Tooltip, Icon, message, Table } from 'antd'
import './OnlineParam.scss'
import { getCookie, setCookie } from 'UTIL/cookie'
const { Option, OptGroup } = Select

export default class OnlineParamView extends Component {
	constructor(props) {
    	super(props)
    	this.state = {
        createOnlineParamVisible: false,
        manageOnlineParam: false,

        createBuriedVisible: false,
        manageBuriedVisible: false,
        deleteBuriedVisible: false,

        confirmLoading: false,
        current: 1,
        platform: 1,

        id: '',
        flush_interval: '',
        flush_size: '',
        max_cachesize: '',
        flush_onlywifi: '',
        update_onlywifi: '',
        check_eventbinding: '',
        configureURL: '',

        buriedId: '',
        event_name: '',
        event_type: '',
        table_delegate: '',
        web_delegate: '',
        path: '',
        control_event: ''
      }
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
    const { selectOnlineParam, selectBuried } = this.props
    selectOnlineParam({
      ...this.state,
      platform: num
    }, () => {
      message.success('请求成功')
    }, () => {
      message.error('请求失败')
    })

    selectBuried({
      ...this.state,
      platform: num
    }, () => {
      message.success('请求成功')
    }, () => {
      message.error('请求失败')
    })
  }

  manageOnlineParam(e) {
    const { chooseOnlineParamAction } = this.props
    chooseOnlineParamAction(e.currentTarget.parentNode.parentNode.getAttribute('data-value'), (chooseOnlineParam) => {
      this.setState({
        id: chooseOnlineParam.id,
        flush_interval: chooseOnlineParam.flush_interval,
        flush_size: chooseOnlineParam.flush_size,
        max_cachesize: chooseOnlineParam.max_cachesize,
        flush_onlywifi: chooseOnlineParam.flush_onlywifi,
        update_onlywifi: chooseOnlineParam.update_onlywifi,
        check_eventbinding: chooseOnlineParam.check_eventbinding,
        configureURL: chooseOnlineParam.configureURL
      })
       this.setState({
        manageOnlineParam: true
      })
    })
  }
  deleteOnlineParam() {
    this.setState({
      manageOnlineParam: true
    })
  }

  manageBuried(e) {
    const { chooseBuriedAction } = this.props
    chooseBuriedAction(e.currentTarget.parentNode.parentNode.getAttribute('data-value'), (chooseBuried) => {
      this.setState({
        buriedId: chooseBuried.id,
        event_name: chooseBuried.event_name,
        event_type: chooseBuried.event_type,
        table_delegate: chooseBuried.table_delegate,
        web_delegate: chooseBuried.web_delegate,
        path: chooseBuried.path,
        control_event: chooseBuried.control_event
      })
       this.setState({
        manageBuriedVisible: true
      })
    })
  }
  deleteBuried(e) {
    const { chooseBuriedAction } = this.props
    chooseBuriedAction(e.currentTarget.parentNode.parentNode.getAttribute('data-value'), (chooseBuried) => {
      this.setState({
        buriedId: chooseBuried.id,
        event_name: chooseBuried.event_name,
        event_type: chooseBuried.event_type,
        table_delegate: chooseBuried.table_delegate,
        web_delegate: chooseBuried.web_delegate,
        path: chooseBuried.path,
        control_event: chooseBuried.control_event
      })
      this.setState({
        deleteBuriedVisible: true
      })
    })
  }

  handleOk1() {
    this.setState({
      confirmLoading: true
    })
    const { createOnlineParam } = this.props
    createOnlineParam(this.state, () => {
      message.success('新增在线参数在成功')
      setTimeout(() => {
        this.setState({
          createOnlineParamVisible: false,
          confirmLoading: false,
        });
      }, 500)
    }, () => {
      message.error('新增在线参数失败')
      this.setState({
        confirmLoading: false
      });
    })
  }
  handleCancel1() {
    this.setState({
      createOnlineParamVisible: false
    })
  }

  handleOk2() {
    this.setState({
      confirmLoading: true
    })
    const { updateOnlineParam } = this.props
    updateOnlineParam(this.state, () => {
      message.success('修改在线参数在成功')
      setTimeout(() => {
        this.setState({
          manageOnlineParam: false,
          confirmLoading: false,
        });
      }, 500)
    }, () => {
      message.error('修改在线参数失败')
      this.setState({
        confirmLoading: false
      });
    })
  }

  handleCancel2() {
    this.setState({
      manageOnlineParam: false
    })
  }

  handleOk3() {
    this.setState({
      confirmLoading: true
    })
    const { createBuried } = this.props
    createBuried(this.state, () => {
      message.success('新增无码埋点成功')
      setTimeout(() => {
        this.setState({
          createBuriedVisible: false,
          confirmLoading: false,
        });
      }, 500)
    }, () => {
      message.error('新增无码埋点失败')
      this.setState({
        confirmLoading: false
      });
    })
  }

  handleCancel3() {
    this.setState({
      createBuriedVisible: false
    })
  }

  handleOk4() {
    this.setState({
      confirmLoading: true
    })
    const { updateBuried } = this.props
    updateBuried(this.state, () => {
      message.success('修改无码埋点在成功')
      setTimeout(() => {
        this.setState({
          manageBuriedVisible: false,
          confirmLoading: false,
        });
      }, 500)
    }, () => {
      message.error('修改无码埋点失败')
      this.setState({
        confirmLoading: false
      });
    })
  }

  handleCancel4() {
    this.setState({
      manageBuriedVisible: false
    })
  }

  handleOk5() {
    this.setState({
      confirmLoading: true
    })
    const { deleteBuried } = this.props
    deleteBuried(this.state, () => {
      message.success('删除无码埋点在成功')
      setTimeout(() => {
        this.setState({
          deleteBuriedVisible: false,
          confirmLoading: false,
        });
      }, 500)
    }, () => {
      message.error('删除无码埋点失败')
      this.setState({
        confirmLoading: false
      });
    })
  }

  handleCancel5() {
    this.setState({
      deleteBuriedVisible: false
    })
  }


  handleChange1(value) {
    console.log(value)
    let chooseValue = value == '是' ? '1' : '0'
    this.setState({
      flush_onlywifi: chooseValue
    })
  }

  handleChange2(value) {
    console.log(value)
    let chooseValue = value == '是' ? '1' : '0'
    this.setState({
      update_onlywifi: chooseValue
    })
  }

  handleChange3(value) {
    console.log(value)
    let chooseValue = value == '是' ? '1' : '0'
    this.setState({
      check_eventbinding: chooseValue
    })
  }

  handleChange4(value) {
    console.log(value)
    this.setState({
      event_type: value
    })
  }

  componentWillMount() {
    const { selectOnlineParam, selectBuried } = this.props

    selectOnlineParam(this.state, () => {
      message.success('请求成功')
    }, () => {
      message.error('请求失败')
    })

    selectBuried(this.state, () => {
      message.success('请求成功')
    }, () => {
      message.error('请求失败')
    })
  }
  componentDidMount() {

  }
  render() {
    const selectList = ['是', '否']
    const selectBuried = ['UIControl', 'UITableView', 'UIWebView']
    const onlineParamTable = this.props.state.onlineParamTable
    const buriedTable = this.props.state.buriedTable
    return (
      <div className="onlineParam">
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
                在线参数
                <Tooltip placement="right" title="在线参数">
                    <Icon type="question-circle" />
                </Tooltip>
              </h5>
              {
                onlineParamTable.map((item) => {
                  if(item.id == '') {
                    return (
                      <Button type="primary" key={item.id} onClick={(e) => {this.setState({createOnlineParamVisible: true})}}>新建在线参数</Button>
                    )
                  } else {
                    return ''
                  }
                })
              }
            </div>
          <div className="tb">
              <table>
                <tbody>
                    <tr style={{'background':'#F5F6FA','color':'#666'}}>
                      <td style={{'width':'13%'}}>上送事件间隔(毫秒)</td>
                      <td style={{'width':'13%'}}>上送日志条数(条)</td>
                      <td style={{'width':'13%'}}>日志最大缓存(M)</td>
                      <td style={{'width':'13%'}}>仅wifi上送</td>
                      <td style={{'width':'13%'}}>仅wifi更新配置</td>
                      <td style={{'width':'13%'}}>支持无码埋点</td>
                      <td style={{'width':'13%'}}>无码埋点配置接口</td>
                      <td style={{'width':'9%','textAlign':'right','paddingRight':'18px'}}>操作</td>
                    </tr>
                    {
                      onlineParamTable.map((item) => {
                        if(item.id == '') {
                          return (
                            <tr key={item.id}>
                              <td colSpan='8'>暂无在线参数，请建立</td>
                            </tr>
                          )
                        } else {
                          return (
                            <tr key={item.id} data-value={item.id}>
                              <td style={{'width':'13%'}}>{item.flush_interval}</td>
                              <td style={{'width':'13%'}}>{item.flush_size}</td>
                              <td style={{'width':'13%'}}>{item.max_cachesize}</td>
                              <td style={{'width':'13%'}}>{item.flush_onlywifi == '1' ? '是' : '否' }</td>
                              <td style={{'width':'13%'}}>{item.update_onlywifi == '1' ? '是' : '否' }</td>
                              <td style={{'width':'13%'}}>{item.check_eventbinding == '1' ? '是' : '否' }</td>
                              <td style={{'width':'13%'}}>{item.configureURL}</td>
                              <td style={{'width':'9%','textAlign':'right'}}>
                                <span onClick={(e) => this.manageOnlineParam(e)}>修改</span>
                              </td>
                            </tr>
                          )
                        }
                      })
                    }
                </tbody>
              </table>
          </div>
          <div style={{marginTop:20}}>
              <h5 className="title">
                无码埋点
                <Tooltip placement="right" title="无码埋点">
                    <Icon type="question-circle" />
                </Tooltip>
              </h5>
              <Button type="primary" onClick={(e) => {this.setState({createBuriedVisible: true})}}>新建无码埋点</Button>
          </div>
          <div className="tb">
              <table>
                <tbody>
                    <tr style={{'background':'#F5F6FA','color':'#666'}}>
                      <td style={{'width':'15%'}}>事件名称</td>
                      <td style={{'width':'15%'}}>事件类型</td>
                      <td style={{'width':'15%'}}>UITableView事件代理</td>
                      <td style={{'width':'15%'}}>UIWebView事件代理代理</td>
                      <td style={{'width':'15%'}}>路径</td>
                      <td style={{'width':'15%'}}>触发行为</td>
                      <td style={{'width':'10%','textAlign':'right','paddingRight':'18px'}}>操作</td>
                    </tr>
                    {
                      buriedTable.map((item, index, array) => {
                        if(item.id == '') {
                          return (
                            <tr key={0}>
                              <td colSpan='7'>暂无无码埋点，请建立</td>
                            </tr>
                          )
                        } else {
                          return (
                            <tr key={item.id} data-value={item.id}>
                              <td style={{'width':'15%'}}>{item.event_name}</td>
                              <td style={{'width':'15%'}}>{item.event_type}</td>
                              <td style={{'width':'15%'}}>{item.table_delegate}</td>
                              <td style={{'width':'15%'}}>{item.web_delegate}</td>
                              <td style={{'width':'15%'}}>{item.path}</td>
                              <td style={{'width':'15%'}}>{item.control_event}</td>
                              <td style={{'width':'10%','textAlign':'right'}}>
                                <span onClick={(e) => this.manageBuried(e)}>修改</span>
                                <span onClick={(e) => this.deleteBuried(e)}>删除</span>
                              </td>
                            </tr>
                          )
                        }
                      })
                    }
                </tbody>
              </table>
          </div>
        </div>

        <Modal 
          title="新增在线参数"
          visible={this.state.createOnlineParamVisible}
          onOk={(e) => this.handleOk1(e, this.state.id)} 
          onCancel={(e) => this.handleCancel1(e)}
          confirmLoading={this.state.confirmLoading}
          okText="新增" cancelText="取消"
        >
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 上送事件间隔(毫秒)：</span>
            <Input 
              placeholder="请输入上送事件间隔" 
              onChange={(e) => { this.setState({ flush_interval: e.target.value })}}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 上送日志条数(条)：</span>
            <Input 
              placeholder="请输入上送日志条数" 
              onChange={(e) => { this.setState({ flush_size: e.target.value })}}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 日志最大缓存(M)：</span>
            <Input 
              placeholder="请输入日志最大缓存" 
              onChange={(e) => { this.setState({ max_cachesize: e.target.value }) }}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 仅wifi上送：</span>
            <Select
              showSearch
              style={{ width: '60%' }}
              onChange={ (e, value) => this.handleChange1(e, value) }
              placeholder="请选择是否仅在wifi情况下上送" 
            >
              {
                selectList.map((item, index) => {
                  return <Option value={item} key={index}>{item}</Option>
                })
              }
            </Select>
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 仅wifi更新配置：</span>
            <Select
              showSearch
              style={{ width: '60%' }}
              onChange={ (e, value) => this.handleChange2(e, value) }
              placeholder="请选择是否仅在wifi情况下更新配置" 
            >
              {
                selectList.map((item, index) => {
                  return <Option value={item} key={index}>{item}</Option>
                })
              }
            </Select>
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 支持无码埋点：</span>
            <Select
              showSearch
              style={{ width: '60%' }}
              onChange={ (e, value) => this.handleChange3(e, value) }
              placeholder="请选择是否支持无码埋点" 
            >
              {
                selectList.map((item, index) => {
                  return <Option value={item} key={index}>{item}</Option>
                })
              }
            </Select>
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 无码埋点配置接口：</span>
            <Input 
              placeholder="请输入无码埋点配置接口" 
              onChange={(e) => { this.setState({ configureURL: e.target.value }) }}
            />
          </div>
        </Modal>

        <Modal 
          title="修改在线参数"
          visible={this.state.manageOnlineParam}
          onOk={(e) => this.handleOk2(e)} 
          onCancel={(e) => this.handleCancel2(e)}
          confirmLoading={this.state.confirmLoading}
          okText="修改" cancelText="取消"
        >
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 上送事件间隔(毫秒)：</span>
            <Input 
              placeholder="请输入上送事件间隔" 
              onChange={(e) => { this.setState({ flush_interval: e.target.value })}}
              value={this.state.flush_interval}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 上送日志条数(条)：</span>
            <Input 
              placeholder="请输入上送日志条数" 
              onChange={(e) => { this.setState({ flush_size: e.target.value })}}
              value={this.state.flush_size}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 日志最大缓存(M)：</span>
            <Input 
              placeholder="请输入日志最大缓存" 
              onChange={(e) => { this.setState({ max_cachesize: e.target.value }) }}
              value={this.state.max_cachesize}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 仅wifi上送：</span>
            <Select
              showSearch
              style={{ width: '60%' }}
              value={this.state.flush_onlywifi == '1' ? '是' : '否'}
              onChange={ (e, value) => this.handleChange1(e, value) }
            >
              {
                selectList.map((item, index) => {
                  return <Option value={item} key={index}>{item}</Option>
                })
              }
            </Select>
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 仅wifi更新配置：</span>
            <Select
              showSearch
              style={{ width: '60%' }}
              value={this.state.update_onlywifi == '1' ? '是' : '否'}
              onChange={ (e, value) => this.handleChange2(e, value) }
            >
              {
                selectList.map((item, index) => {
                  return <Option value={item} key={index}>{item}</Option>
                })
              }
            </Select>
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 支持无码埋点：</span>
            <Select
              showSearch
              style={{ width: '60%' }}
              value={this.state.check_eventbinding == '1' ? '是' : '否'}
              onChange={ (e, value) => this.handleChange3(e, value) }
            >
              {
                selectList.map((item, index) => {
                  return <Option value={item} key={index}>{item}</Option>
                })
              }
            </Select>
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 无码埋点配置接口：</span>
            <Input 
              placeholder="请输入无码埋点配置接口" 
              onChange={(e) => { this.setState({ configureURL: e.target.value }) }}
              value={this.state.configureURL}
            />
          </div>
        </Modal>


        <Modal 
          title="新增无码埋点"
          visible={this.state.createBuriedVisible}
          onOk={(e) => this.handleOk3(e)} 
          onCancel={(e) => this.handleCancel3(e)}
          confirmLoading={this.state.confirmLoading}
          okText="新增" cancelText="取消"
        >
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 事件名称：</span>
            <Input 
              placeholder="请输入事件名称" 
              onChange={(e) => { this.setState({ event_name: e.target.value })}}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 事件类型：</span>
            <Select
              showSearch
              style={{ width: '60%' }}
              onChange={ (e, value) => this.handleChange4(e, value) }
              placeholder="请选择事件类型" 
            >
              {
                selectBuried.map((item, index) => {
                  return <Option value={item} key={index}>{item}</Option>
                })
              }
            </Select>
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> TableView事件代理：</span>
            <Input 
              placeholder="请输入TableView事件代理" 
              onChange={(e) => { this.setState({ table_delegate: e.target.value }) }}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> WebView事件代理：</span>
            <Input 
              placeholder="请输入WebView事件代理" 
              onChange={(e) => { this.setState({ web_delegate: e.target.value }) }}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 路径：</span>
            <Input 
              placeholder="请输入路径" 
              onChange={(e) => { this.setState({ path: e.target.value }) }}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 触发行为：</span>
            <Input 
              placeholder="请输入触发行为" 
              onChange={(e) => { this.setState({ control_event: e.target.value }) }}
            />
          </div>
        </Modal>


        <Modal 
          title="修改无码埋点"
          visible={this.state.manageBuriedVisible}
          onOk={(e) => this.handleOk4(e)} 
          onCancel={(e) => this.handleCancel4(e)}
          confirmLoading={this.state.confirmLoading}
          okText="修改" cancelText="取消"
        >
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 事件名称：</span>
            <Input 
              placeholder="请输入事件名称" 
              onChange={(e) => { this.setState({ event_name: e.target.value })}}
              value={this.state.event_name}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 事件类型：</span>
            <Select
              showSearch
              style={{ width: '60%' }}
              value={this.state.event_type}
              onChange={ (e, value) => this.handleChange4(e, value) }
              placeholder="请选择事件类型" 
            >
              {
                selectBuried.map((item, index) => {
                  return <Option value={item} key={index}>{item}</Option>
                })
              }
            </Select>
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> TableView事件代理：</span>
            <Input 
              placeholder="请输入TableView事件代理" 
              value={this.state.table_delegate}
              onChange={(e) => { this.setState({ table_delegate: e.target.value }) }}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> WebView事件代理：</span>
            <Input 
              placeholder="请输入WebView事件代理" 
              value={this.state.web_delegate}
              onChange={(e) => { this.setState({ web_delegate: e.target.value }) }}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 路径：</span>
            <Input 
              placeholder="请输入路径" 
              value={this.state.path}
              onChange={(e) => { this.setState({ path: e.target.value }) }}
            />
          </div>
          <div className='list'>
            <span className='title'><b style={{color: '#F00'}}>*</b> 触发行为：</span>
            <Input 
              placeholder="请输入触发行为" 
              value={this.state.control_event}
              onChange={(e) => { this.setState({ control_event: e.target.value }) }}
            />
          </div>
        </Modal>

        <Modal 
          title="删除"
          visible={this.state.deleteBuriedVisible}
          confirmLoading={this.state.confirmLoading}
          onOk={(e) => this.handleOk5(e)} 
          onCancel={(e) => this.handleCancel5(e)}
          okText="确定" cancelText="取消"
          className="delete"
        >
          <Icon type="exclamation-circle" className='deleteImg'/>
          <div className='deletePoint'>
            <p>{`您确定要删除id为 ${ this.state.buriedId } 的无码埋点吗 ？`}</p>
            <p className="blod">删除后将导致该无码埋点将不能正常使用！</p>
          </div>
        </Modal>

      </div>
    )
  }
}