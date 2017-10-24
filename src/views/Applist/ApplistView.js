import React, { Component } from 'react'
import { Link } from 'react-router'
import NProgress from 'nprogress'
import { Modal, Button, Input, Select, Checkbox, Tooltip, Icon, message } from 'antd'
import './ApplistView.scss'
import { getCookie, setCookie } from 'UTIL/cookie'
const { Option, OptGroup } = Select


export default class ApplistView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createAppVisible: false,
      certificateVisible: false,
      manageVisible: false,
      deleteVisible: false,
      changePwdVisible: false,
      confirmLoading: false,
      appState: '1',
      appName: '',
      appClassify: '',
      appDescribe: '',
      oldPwd: '',
      newPwd: '',
      isRead: true,
      useId: getCookie('cstName'),
      id: getCookie('cstName')
    }
  }
  componentWillMount() {
    const { selectAppList } = this.props
    selectAppList(this.state, () => {
      NProgress.done()
      message.info('请求成功')
    }, () => {
      NProgress.done()
      message.info('请求失败')
    })
  }
  componentDidMount() {

  }
  resetStateList() {

  }
  handleClick() {
    console.log(123)
  }
  changePwd(e) {
    this.setState({
      changePwdVisible: true
    })
  }
  createApp(e) {
    this.setState({
      appName: '',
      appClassify: '',
      appDescribe: '',
    })
    this.setState({
      createAppVisible: true
    })
  }
  appCertificate(e) {
    const { chooseAppAction } = this.props
    chooseAppAction(e.currentTarget.parentNode.parentNode.getAttribute('data-value'), () => {
      this.setState({
        certificateVisible: true
      })
    })
  }
  manage(e) {
    const { chooseAppAction } = this.props
    chooseAppAction(e.currentTarget.parentNode.parentNode.getAttribute('data-value'), (chooseApp) => {
      this.setState({
        appName: chooseApp.appName,
        appClassify: chooseApp.appClassify,
        appDescribe: chooseApp.appDescribe
      })
      this.setState({
        manageVisible: true
      })
    })
  }
  searchData(e){
    const { chooseAppAction,getVersionList } = this.props
    chooseAppAction(e.currentTarget.parentNode.parentNode.getAttribute('data-value'),(chooseApp)=>{
      sessionStorage.setItem('appkey',chooseApp.appkey)
      setCookie('appkey', chooseApp.appkey)
      setCookie('appName', chooseApp.appName)
      getVersionList({
        "platform":"1",
        "appkey": chooseApp.appkey,
      }, () => {
        NProgress.done()
        location.href="#/home/todayDetails.html"
      }, () => {
        NProgress.done()
      })    
    })
  }
  delete(e) {
    const { chooseAppAction } = this.props
    chooseAppAction(e.currentTarget.parentNode.parentNode.getAttribute('data-value'), () => {
      this.setState({
        deleteVisible: true
      })
    })
  }
  handleOk1(e) {
    const { createAppList } = this.props
    if (this.state.appName == ''){
      message.warning("请输入APP名称")
    } else if (this.state.appClassify == ''){
      message.warning("请选择分类")
    } else if(this.state.appDescribe.length < 10) {
      message.warning("请在描述框中至少10个文字")
    } else {
      this.setState({
        confirmLoading: true
      })
      createAppList(this.state, () => {
        message.success('创建成功')
        setTimeout(() => {
          this.setState({
            createAppVisible: false,
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
  handleOk3(e, id) {
    this.setState({
      confirmLoading: true
    })
    const { updateAppList } = this.props
    updateAppList({
      ...this.state,
      id: id
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
  handleOk4(e, id) {
    this.setState({
      confirmLoading: true
    })
    const { deleteAppList } = this.props
    deleteAppList({
      ...this.state,
      id: id
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
  handleCancel1(e) {
    console.log(e);
    this.setState({
      createAppVisible: false,
    });
  }
  handleCancel2(e) {
    console.log(e);
    this.setState({
      certificateVisible: false
    });
  }
  handleCancel3(e) {
    console.log(e);
    this.setState({
      manageVisible: false
    });
  }
  handleCancel4(e) {
    console.log(e);
    this.setState({
      deleteVisible: false,
    });
  }
  handleOk5(e) {
    const { changePassWordAction } = this.props
    if (this.state.oldPwd == ''){
      message.warning("请输入旧密码")
    } else if (this.state.newPwd == ''){
      message.warning("请输入新密码")
    } else {
      this.setState({
        confirmLoading: true
      })
      changePassWordAction(this.state, () => {
        message.success('修改成功')
        setTimeout(() => {
          this.setState({
            changePwdVisible: false,
            confirmLoading: false
          });
        }, 500);
      }, () => {
        message.error('修改失败')
        this.setState({
          confirmLoading: false
        });
      })
    }
  }
  handleCancel5(e) {
    console.log(e);
    this.setState({
      oldPwd: '',
      newPwd: '',
      changePwdVisible: false,
    });
  }
  handleChange(value) {
    console.log(value)
    this.setState({
      appClassify: value
    })
  }
  loginOut(e) {
    console.log('你点击了退出登陆')
    const { loginOutAction } = this.props
    loginOutAction(() => {
      message.success(`用户 ${getCookie('cstName')} 退出成功`)
      location.href = '#/login'
    }, () => {
      message.success(`退出登陆出错啦。。。`)
    })
  }
  render() {
    const slelectList = ['社交', '摄影与摄像', '效率', '生活', '美食佳饮',
      '工具', '娱乐', '游戏', '儿童', '教育',
      '报刊杂志', '健康健美', '旅游', '音乐', '体育',
      '商务', '新闻', '财务', '参考', '导航', '医疗',
      '图书', '天气', '智能物联网', '其他'
    ]
    const { appManageTable, chooseApp } = this.props.state
    return (
      <div className="applist">
					<div className="top">
						<div className="list">APP列表</div>
						{/*<div className="btn1">我创建的APP</div>*/}
            <div className="user">
              用户：
                <a>
                  {getCookie('cstName')}
                  <Tooltip placement="bottom" title="退出登录">
                    <Icon type="logout" onClick={(e) => this.loginOut(e)} style={{'marginLeft':'15px','color': '#f00', 'fontSize' : '15px'}}/>
                  </Tooltip>
                  <Tooltip placement="bottom" title="修改密码">
                    <Icon type="edit" onClick={(e) => this.changePwd(e)} style={{'marginLeft':'10px','color': '#blue', 'fontSize' : '15px'}}/>
                  </Tooltip>
                </a>
            </div>
						<div className="btn3" onClick={(e) => this.createApp(e)}>创建APP</div>
           {/* <div className="btn3" onClick={(e) => this.loginOut(e)} style={{'marginRight':'25px'}}>退出登录</div>*/}
					</div>
					<div className="tb">
						<table>
							<tbody>
								<tr style={{'background':'#F5F6FA','color':'#666'}}>
									<td style={{'width':'25%'}}>APP名称</td>
									<td style={{'width':'15%'}}>分类</td>
									<td style={{'width':'10%'}}>状态</td>
									<td style={{'width':'50%','textAlign':'right','paddingRight':'18px'}}>操作</td>
								</tr>
                {
                  appManageTable.map((item, index) => {
                    return (
                      <tr key={item.id} data-value={item.id}>
                        <td style={{'width':'15%'}}>{item.appName}</td>
                        <td style={{'width':'15%'}}>{item.appClassify}</td>
                        <td style={{'width':'10%'}}>{ item.appState == 1 ? '正常' : '已删除'}</td>
                        <td style={{'width':'50%','textAlign':'right'}}>
                          <span onClick={e => this.searchData(e)}>查看数据</span>
                          <span><Link to="applist/downloadSDK.html">下载SDK</Link></span>
                          <span onClick={(e) => this.appCertificate(e)}>应用证书</span>
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
						title="创建APP"
						visible={this.state.createAppVisible}
          				onOk={(e) => this.handleOk1(e)} 
          				onCancel={(e) => this.handleCancel1(e)}
                  confirmLoading={this.state.confirmLoading}
          				okText="创建" cancelText="取消"
        			>
          				<div className='list'>
          					<span className='title'><b style={{color: '#F00'}}>*</b> APP名称：</span>
          					<Tooltip placement="top" title='APP名称支持中文、英文字母、数字和下划线，长度限制4~30，其中中文算2位'>
        						<Input placeholder="请输入APP名称" onChange={(e) => this.setState({appName: e.target.value})}/>
      						</Tooltip>
          				</div>
          				<div className='list'>
          					<span className='title'>分类：</span>
          					<Select
    							   showSearch
    							   style={{ width: '60%' }}
                     onChange={ (e, value) => this.handleChange(e, value) }
  							    >
    							     {
    							     	slelectList.map((item, index) => {
									     	return <Option value={item} key={index}>{item}</Option>
    							     	})
    							     }
  							   </Select>
  						</div>
          				<div className='list'>
          					<span style={{ height: '82px', lineHeight: '82px' }} className='title'>描述：</span>
          					<Input type="textarea" rows={4}  onChange={(e) => this.setState({appDescribe: e.target.value})}/>
          				</div>
          				<div style={{textAlign: 'center'}}>
          					<Checkbox onChange={(e) => this.setState({isRead: e.target.checked})} checked={this.state.isRead}>我已阅读并同意 <b style={{color: '#06C', fontWeight: 'normal'}}>《移动服务用户服务条款》</b></Checkbox>
          				</div>
        			</Modal>

					<Modal 
						title="提醒"
						visible={this.state.certificateVisible}
          	onCancel={(e) => this.handleCancel2(e)}
          	cancelText="取消"
          	className="appCertificate"
        	>
          	<div className='certificate'>
          		<p>提示：应用证书信息属于敏感数据，请确保周围环境安全</p>
          	</div>
          	<div className='certificate'>
          		<span className='title'>应用：</span>
          	  <p>{ chooseApp.appName }</p>
  					</div>
          	<div className='certificate'>
          		<span className='title'>AppKey：</span>
          		<p>{ chooseApp.appkey }</p>
          	</div>
          	{/*<div className='certificate'>
          		<span className='title'>AppSecret：</span>
          		<p>{ chooseApp.appkey }</p>
          	</div>*/}
        	</Modal>

        	<Modal 
						title="修改信息"
						visible={this.state.manageVisible}
            confirmLoading={this.state.confirmLoading}
          	onOk={(e) => this.handleOk3(e, chooseApp.id)}
          	onCancel={(e) => this.handleCancel3(e)}
          	okText="更新" cancelText="取消"
        	>
          	<div className='list'>
          		<span className='title'><b style={{color: '#F00'}}>*</b> APP名称：</span>
          		<Tooltip placement="top" title='APP名称支持中文、英文字母、数字和下划线，长度限制4~30，其中中文算2位'>
        		    <Input 
                  placeholder="请输入APP名称" 
                  value={ this.state.appName }
                  onChange={(e) => this.setState({appName: e.target.value})}
                />
      				</Tooltip>
          	</div>
          	<div className='list'>
          		<span className='title'>分类：</span>
          		<Select
    						showSearch
    						style={{ width: '60%' }}
    						value={ this.state.appClassify }
                onChange={ (e, value) => this.handleChange(e, value) }
  						>
    						{
    							slelectList.map((item, index) => {
									 return <Option value={item} key={index}>{item}</Option>
    							})
    						}
  						</Select>
  						</div>
          				<div className='list'>
          					<span style={{ height: '82px', lineHeight: '82px' }} className='title'>描述：</span>
          					<Input type="textarea" rows={4} value={ this.state.appDescribe } onChange={(e) => this.setState({appDescribe: e.target.value})}/>
          				</div>
          				<div style={{textAlign: 'center'}}>
          					<Checkbox onChange={(e) => this.setState({isRead: e.target.checked})} checked={this.state.isRead}>我已阅读并同意 <b style={{color: '#06C', fontWeight: 'normal'}}>《移动服务用户服务条款》</b></Checkbox>
          				</div>
        		</Modal>

        			<Modal 
						    title="删除"
						    visible={this.state.deleteVisible}
                confirmLoading={this.state.confirmLoading}
          				onOk={(e) => this.handleOk4(e, chooseApp.id)} 
          				onCancel={(e) => this.handleCancel4(e)}
          				okText="确定" cancelText="取消"
          				className="delete"
        			>
        				<Icon type="exclamation-circle" className='deleteImg'/>
          				<div className='deletePoint'>
          					<p>{`您确定要删除 ${ chooseApp.appName } 吗 ？`}</p>
          					<p className="blod">删除后将导致该APP下关联的所有移动服务相关产品不可用</p>
          				</div>
        			</Modal>

              <Modal 
                title="修改密码"
                visible={this.state.changePwdVisible}
                onOk={(e) => this.handleOk5(e)} 
                onCancel={(e) => this.handleCancel5(e)}
                confirmLoading={this.state.confirmLoading}
                okText="修改" cancelText="取消"
              >
                <div className='list'>
                  <span className='title'><b style={{color: '#F00'}}>*</b> 用户：</span>
                  <Input value={this.state.useId} disabled={true} />
                </div>
                <div className='list'>
                  <span className='title'><b style={{color: '#F00'}}>*</b> 旧密码：</span>
                  <Input type="password" placeholder="请输入旧密码" onChange={(e) => this.setState({oldPwd: e.target.value})}/>
                </div>
                <div className='list'>
                  <span className='title'><b style={{color: '#F00'}}>*</b> 新密码：</span>
                  <Input type="password" placeholder="请输入新密码" onChange={(e) => this.setState({newPwd: e.target.value})}/>
                </div>
              </Modal>

				</div>
    )
  }
}