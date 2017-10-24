import React, { Component, PropTypes } from 'react'
import NProgress from 'nprogress'
import { message, Modal, Input, Tooltip } from 'antd'
import { APP_PATH } from 'GLOBAL'
import { Link } from 'react-router'
import handleChange from 'UTIL/handleChange'
import 'STYLE/pages/login.scss'
import avatarImg from 'IMAGE/avatar.png'

export default class LoginView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: 'false',
      userName: '',
      pswd: '',
      register: false,
      confirmLoading: false,
      loginName: '',
      loginPwd: '',
      loginNameCn: '',
      loginEmail: '',
      loginPhoneNum: ''
    }
    // this.reloadCode = this.reloadCode.bind(this)
    this.triggerSubmit = this.triggerSubmit.bind(this)
    this.handleChange = handleChange.bind(this)
  }

  /*reloadCode() {
    this.props.setSessionID()
  }*/

  handleFocus(e) {
    e.currentTarget.parentNode.classList.add('focus')
  }

  handleBlur(e) {
    e.currentTarget.parentNode.classList.remove('focus')
  }

  triggerSubmit(e) {
    if (e.key == 'Enter')
      this.handleSubmit()
  }

  componentWillMount() {
    // this.reloadCode()
  }

  componentDidMount() {
    // NProgress.done()
    window.addEventListener('keyup', this.triggerSubmit, false)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.triggerSubmit)
  }

  handleOk(e) {
    this.setState({confirmLoading: true})
    const loginName = this.state.loginName,
          loginPwd = this.state.loginPwd,
          loginNameCn = this.state.loginNameCn,
          loginEmail = this.state.loginEmail,
          loginPhoneNum = this.state.loginPhoneNum
    const { validateRegister } = this.props
    if(loginName.trim() == '') {
      message.error('请输入用户名！')
    } else if(loginPwd.trim() == ''){
      message.error('请输入密码！')
    } else if (loginNameCn.trim() == '') {
      message.error('请输入中文名！')
    } else if (loginEmail.trim() == '') {
      message.error('请输入邮箱！')
    } else if (loginPhoneNum.trim() == '') {
      message.error('请输入手机号！')
    } else {
      validateRegister(this.state, () => {
        this.setState({
          confirmLoading: false,
          register: false
        })
        message.success('注册成功')
      }, () => {
        this.setState({
          confirmLoading: false
        })
        message.error('注册失败')
      })
    }
  }

  handleCancel(e) {
    this.setState({register: false})
  }

  handleSubmit() {
    const { router, validateLogin } = this.props
    if(this.state.userName.trim() == '') {
      message.error('请输入用户名！')
    } else if (this.state.pswd.trim() == '') {
      message.error('请输入密码！')
    } else {
      /*if(this.state.userName.trim() == 'admin' && this.state.pswd.trim() == 'admin') {
        message.success('登陆成功')
        router.push(APP_PATH)
      }*/
      NProgress.start()
      validateLogin(this.state, () => {
        NProgress.done()
        message.success('登陆成功')
        router.push(APP_PATH)
      }, () => {
        NProgress.done()
        message.error('登陆失败')
      })
    }
  }

  render() {
    const { userName, pswd, vcode } = this.state
    return (
      <div className="pageLogin">
        <div className="loginBox">
          <div className="avatar"><img alt='avatar' src={avatarImg} /></div>
          <div className="input pre-icon">
            <i className="user"></i>
            <input
              placeholder="请输入用户名"
              value={userName}
              name="userName"
              onChange={this.handleChange}
              onFocus={e => this.handleFocus(e)}
              onBlur={e => this.handleBlur(e)}
              ref={node => this.userNameInput = node}
            />
          </div>
          <div className="input pre-icon">
            <i className="pswd"></i>
            <input
              placeholder="请输入密码"
              type="password"
              value={pswd}
              name="pswd"
              onFocus={e => this.handleFocus(e)}
              onBlur={e => this.handleBlur(e)}
              onChange={this.handleChange}
              ref={node => this.pswdInput = node}
            />
          </div>
          {/*<div className="input vcode">
            <input
              placeholder="请输入验证码"
              value={vcode}
              name="vcode"
              onFocus={e => this.handleFocus(e)}
              onBlur={e => this.handleBlur(e)}
              onChange={this.handleChange}
            />
            <img 
              src={this.props.vcodeSrc} 
              onClick={this.reloadCode} 
            />
          </div>*/}
          <div className="btn-wrap">
            <button onClick={e => this.handleSubmit()}>立即登录</button>
          </div>
          <div className="register" onClick={ (e) => { this.setState({register: true}) } }>点击注册</div>
          
          <Modal 
            title="注册"
            visible={this.state.register}
            onOk={(e) => this.handleOk(e)} 
            onCancel={(e) => this.handleCancel(e)}
            confirmLoading={this.state.confirmLoading}
            okText="注册" cancelText="取消"
          >
            <div className='list'>
              <span className='title'><b style={{color: '#F00'}}>*</b> 登录名：</span>
              <Tooltip placement="top" title=''>
                <Input 
                  placeholder="请输入登录名" 
                  onChange={ (e) => { this.setState({loginName: e.target.value}) }}
                />
              </Tooltip>
            </div>
            <div className='list'>
              <span className='title'><b style={{color: '#F00'}}>*</b> 密码：</span>
              <Tooltip placement="top" title=''>
                <Input 
                  type="password"
                  placeholder="请输入密码" 
                  onChange={ (e) => { this.setState({loginPwd: e.target.value}) }}
                />
              </Tooltip>
            </div>
            <div className='list'>
              <span className='title'><b style={{color: '#F00'}}>*</b> 中文名：</span>
              <Tooltip placement="top" title=''>
                <Input placeholder="请输入中文名" onChange={ (e) => { this.setState({loginNameCn: e.target.value}) }}/>
              </Tooltip>
            </div>
            <div className='list'>
              <span className='title'><b style={{color: '#F00'}}>*</b> 邮箱：</span>
              <Tooltip placement="top" title=''>
                <Input 
                  type="email"
                  placeholder="请输入邮箱地址" 
                  onChange={ (e) => { this.setState({loginEmail: e.target.value}) }}
                />
              </Tooltip>
            </div>
            <div className='list'>
              <span className='title'><b style={{color: '#F00'}}>*</b> 手机号码：</span>
              <Tooltip placement="top" title='请输入11位数手机号码'>
                <Input 
                  maxLength="11"
                  placeholder="请输入手机号码" 
                  onChange={ (e) => { this.setState({loginPhoneNum: e.target.value}) }}
                />
              </Tooltip>
            </div>
          </Modal>

        </div>
      </div>
    )
  }

}
