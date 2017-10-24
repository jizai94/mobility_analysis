import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './slider.scss'
import { Link } from 'react-router'
import logo from 'IMAGE/logo1.png'

import slideConfig from './SlidebarConfig'

class Slider extends Component{
  constructor(props){
    super(props);
    this.state = {
      nav : slideConfig[window.location.hash.split('/').pop().replace(/.html/g, '')],
      which : null
    }

    this.handleClick = this.handleClick.bind(this);
  }
  getClass(num){
    const { which, nav } = this.state;
    return which != null ? (which == num ? 'active' : '') : nav == num ? 'active' : ''
  }
  handleClick(num){
    num == this.state.which ? 
    this.setState({which:null,nav:null}) :
    this.setState({ which:num });
  }
  render(){
        return (
        <div id="sidebar" style={{top: 0}}>
            <div className="logo" style={{width: 200, height: 52, lineHeight: '52px', textAlign: 'center', color: '#fff', fontSize: '12pt'}}>
              <img src={logo} alt="logo" style={{position: 'relative', top: 5, right: 5}} />移动数据分析平台</div>
            <div className="sideContainer">
                  <div className="smenu">
                    <div className="grp">
                      <Link to="applist/applist.html" activeClassName="active">APP列表</Link>
                      <Link to="applist/downloadSDK.html" activeClassName="active">SDK下载</Link>
                    </div>
                  </div>
              </div>
          </div>
        )
    }
}

export default Slider