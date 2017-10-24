import React, { Component } from 'react'
import { Link } from 'react-router'
import Sidebar from '../Sidebar'
import './header.scss'
import { Button } from 'antd'
import logo from 'IMAGE/logo.png'

export default class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current:2
    }

    this.handleClick = this.handleClick.bind(this);
  }
  getClass(num){
    return num == this.state.current ? 'active': '';
  }
  handleClick(num){
    let app = ['iPad','iPhone','Android'];
    this.setState({ current:num });
    this.props.sendData({
      type:app[num],
      platform:num
    })
  }
  render() {
    
    return (
      <div className="app-header">
        <header>
            <div className="logo"><span></span>移动数据分析平台</div>
            <nav className="device-type clearfix">
                <h3>设备类型</h3>
                <ul className="clearfix">
                    <li className={this.getClass(2)} onClick={e=>this.handleClick(2)}><a>Android</a></li>
                    <li className={this.getClass(1)} onClick={e=>this.handleClick(1)}><a>iPhone</a></li>
                </ul>
            </nav>
            <Link to="applist/applist.html" className="back"><Button type="primary" ghost>返回APP列表</Button></Link>
        </header>
        <Sidebar/>
      </div>
    )
  }
}