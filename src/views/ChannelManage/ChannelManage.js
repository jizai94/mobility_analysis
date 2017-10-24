import React, { Component } from 'react'
import { Link } from 'react-router'
import NProgress from 'nprogress'
import { Modal, Button, Input, Select, Checkbox, Tooltip, Icon, message, Table } from 'antd'
import './channelManage.scss'
import { getCookie, setCookie } from 'UTIL/cookie'
const { Option, OptGroup } = Select


export default class ChannelManageView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      createChannel: false,
      manageVisible: false,
      deleteVisible: false,
      confirmLoading: false,
      channelName: '',
      channelType: '',
      channelId: '',
      platform: '1',
      appkey: sessionStorage.getItem('appkey')
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
    const { selectChannel } = this.props
    selectChannel({
      ...this.state,
      platform: num
    }, () => {
      NProgress.done()
      message.info('请求成功')
    }, () => {
      NProgress.done()
      message.info('请求失败')
    })
  }

  componentWillMount() {
    const { selectChannel } = this.props
    selectChannel(this.state, () => {
      NProgress.done()
      message.info('请求成功')
    }, () => {
      NProgress.done()
      message.info('请求失败')
    })
  }
  componentDidMount() {

  }
  manage(e) {
    const { chooseChannelAction } = this.props
    chooseChannelAction(e.currentTarget.parentNode.parentNode.getAttribute('data-value'), (chooseChannel) => {
      this.setState({
        channelName: chooseChannel.channel_name,
        channelType: chooseChannel.channel_type
      })
      this.setState({
        manageVisible: true
      })
    })
  }
  delete(e) {
    const { chooseChannelAction } = this.props
    chooseChannelAction(e.currentTarget.parentNode.parentNode.getAttribute('data-value'), () => {
      this.setState({
        deleteVisible: true
      })
    })
  }
  handleOk1(e) {
    if(this.state.channelName == ''){
      message.warning('请输入渠道名称')
    } else if (this.state.channelType == '') {
      message.warning('请选择渠道类型')
    } else {
      this.setState({
        confirmLoading: true
      })
      const { createChannel } = this.props
      createChannel(this.state, () => {
        message.success('创建成功')
        setTimeout(() => {
          this.setState({
            createChannel: false,
            confirmLoading: false,
          });
        }, 500);
      }, () => {
        message.error('创建失败')
        this.setState({
          confirmLoading: false
        });
      })
    }
  }
  handleCancel1(e) {
    console.log(e)
    this.setState({createChannel: false})
  }
  handleOk2(e, id) {
    if(this.state.channelName == ''){
      message.warning('请输入渠道名称')
    } else if (this.state.channelType == '') {
      message.warning('请选择渠道类型')
    } else {
      this.setState({
        confirmLoading: true
      })
      const { updateChannel } = this.props
      updateChannel({
        ...this.state,
        channelId: id
      }, () => {
        message.success('更新成功')
        setTimeout(() => {
          this.setState({
            manageVisible: false,
            confirmLoading: false,
          });
        }, 500);
      }, () => {
        message.error('更新失败')
        this.setState({
          confirmLoading: false
        });
      })
    }
  }
  handleCancel2(e) {
    console.log(e);
    this.setState({
      manageVisible: false
    });
  }
  handleOk3(e, id) {
    this.setState({
      confirmLoading: true
    })
    const { deleteChannel } = this.props
    deleteChannel({
      ...this.state,
      channelId: id
    }, () => {
      message.success('删除成功')
      setTimeout(() => {
        this.setState({
          deleteVisible: false,
          confirmLoading: false,
        });
      }, 500);
    }, () => {
      message.error('删除失败')
      this.setState({
          confirmLoading: false
      });
    })
  }
  handleCancel3(e) {
    console.log(e);
    this.setState({
      deleteVisible: false
    });
  }
  handleChange(value) {
    console.log(value)
    this.setState({
      channelType: value
    })
  }
  render() {
    const selectList = this.state.platform == '2' ? ['大互联网'] : ['大互联网']
    const { channelManageTable, chooseChannel } = this.props.state
    return (
      <div className="channelManage">
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
                渠道管理
                <Tooltip placement="right" title="渠道管理">
                  <Icon type="question-circle" />
                </Tooltip>
              </h5>
              <Button type="primary" onClick={(e) => {this.setState({createChannel: true})}}>新建渠道</Button>
            </div>
            <div className="tb">
              <table>
                <tbody>
                  <tr style={{'background':'#F5F6FA','color':'#666'}}>
                    <td style={{'width':'15%'}}>渠道类型</td>
                    <td style={{'width':'15%'}}>渠道名称</td>
                    <td style={{'width':'15%'}}>渠道ID</td>
                    <td style={{'width':'15%'}}>申请人</td>
                    <td style={{'width':'15%'}}>申请日期</td>
                    <td style={{'width':'25%','textAlign':'right','paddingRight':'18px'}}>操作</td>
                  </tr>
                  {
                    channelManageTable.map((item) => {
                      return (
                        <tr key={item.channel_id} data-value={item.channel_id}>
                          <td style={{'width':'15%'}}>{item.channel_type}</td>
                          <td style={{'width':'15%'}}>{item.channel_name}</td>
                          <td style={{'width':'15%'}}>{item.channel_id}</td>
                          <td style={{'width':'15%'}}>{item.apply_user}</td>
                          <td style={{'width':'15%'}}>{item.apply_date}</td>
                          <td style={{'width':'25%','textAlign':'right'}}>
                            <span onClick={(e) => this.manage(e)}>管理</span>
                            <span onClick={(e) => this.delete(e)}>删除</span>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>

            <Modal 
              title="新增渠道"
              visible={this.state.createChannel}
              onOk={(e) => this.handleOk1(e)} 
              onCancel={(e) => this.handleCancel1(e)}
              confirmLoading={this.state.confirmLoading}
              okText="确定" cancelText="取消"
            >
              <div className='list'>
                <span className='title'><b style={{color: '#F00'}}>*</b> 渠道名称：</span>
                <Input placeholder="请输入渠道名称" onChange={(e) => this.setState({channelName: e.target.value})} />
              </div>
              <div className='list'>
                <span className='title'><b style={{color: '#F00'}}>*</b> 渠道类型：</span>
                <Select
                  showSearch
                  style={{ width: '60%' }}
                  onChange={ (e, value) => this.handleChange(e, value) }
                >
                  {
                    selectList.map((item, index) => {
                      return <Option value={item} key={index}>{item}</Option>
                    })
                  }
                </Select>
              </div>
            </Modal>

            <Modal 
              title="修改渠道"
              visible={this.state.manageVisible}
              onOk={(e) => this.handleOk2(e, chooseChannel.channel_id)} 
              onCancel={(e) => this.handleCancel2(e)}
              confirmLoading={this.state.confirmLoading}
              okText="更新" cancelText="取消"
            >
              <div className='list'>
                <span className='title'><b style={{color: '#F00'}}>*</b> 渠道名称：</span>
                <Input 
                  placeholder="请输入渠道名称" 
                  onChange={(e) => this.setState({channelName: e.target.value})}
                  value={this.state.channelName}
               />
              </div>
              <div className='list'>
                <span className='title'><b style={{color: '#F00'}}>*</b> 渠道类型：</span>
                <Select
                  showSearch
                  style={{ width: '60%' }}
                  value={this.state.channelType}
                  onChange={ (e, value) => this.handleChange(e, value) }
                >
                  {
                    selectList.map((item, index) => {
                      return <Option value={item} key={index}>{item}</Option>
                    })
                  }
                </Select>
              </div>
            </Modal>

            <Modal 
              title="删除"
              visible={this.state.deleteVisible}
              confirmLoading={this.state.confirmLoading}
              onOk={(e) => this.handleOk3(e, chooseChannel.channel_id)} 
              onCancel={(e) => this.handleCancel3(e)}
              okText="确定" cancelText="取消"
              className="delete"
            >
              <Icon type="exclamation-circle" className='deleteImg'/>
              <div className='deletePoint'>
                <p>{`您确定要删除 ${ chooseChannel.channel_name } 吗 ？`}</p>
                <p className="blod">删除后将导致该渠道将不能正常使用！</p>
              </div>
            </Modal>

        </div>
			</div>
    )
  }
}