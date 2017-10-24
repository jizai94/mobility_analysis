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
                        <div className={this.getClass(0)} onClick={e=>this.handleClick(0)}>今日实时</div>
                          <ul>
                            {/*<li><a href="#/todayDetails">今日实时</a></li>*/}
                            <li><Link to="home/todayDetails.html" activeClassName="active">今日实时</Link></li>
                          </ul>
                      </div>
                      <div className="grp">
                        <div className={this.getClass(1)} onClick={e=>this.handleClick(1)}>基本统计</div>
                          <ul>
                            <li><Link to="home/applicationTrend.html" activeClassName="active">应用趋势</Link></li>
                              <li><Link to="home/timeAnalysis.html" activeClassName="active">时段分析</Link></li>
                              <li><Link to="home/version.html" activeClassName="active">版本分布</Link></li>
                              <li><Link to="home/region.html" activeClassName="active">地域分析</Link></li>
                          </ul>
                      </div>
                      <div className="grp">
                        <div className={this.getClass(2)} onClick={e=>this.handleClick(2)}>用户行为</div>
                          <ul>
                            <li><Link to="home/startCount.html" activeClassName="active">启动次数</Link></li>
                              <li><Link to="home/useTime.html" activeClassName="active">使用时长</Link></li>
                              <li><Link to="home/pagePath.html" activeClassName="active">页面路径分析</Link></li>
                              <li><Link to="home/event.html" activeClassName="active">自定义事件</Link></li>
                          </ul>
                      </div>
                      <div className="grp">
                        <div className={this.getClass(3)} onClick={e=>this.handleClick(3)}>活跃及留存</div>
                          <ul>
                              <li><Link to="home/userActivity.html" activeClassName="active">用户活跃度</Link></li>
                              <li><Link to="home/userRetain.html" activeClassName="active">用户留存</Link></li>
                              <li><Link to="home/pageRetain.html" activeClassName="active">页面留存</Link></li>
                          </ul>
                      </div>
                      <div className="grp">
                        <div className={this.getClass(4)} onClick={e=>this.handleClick(4)}>渠道分析</div>
                          <ul>
                            <li><Link to="home/channelAnalysis.html" activeClassName="active">渠道效果</Link></li>
                          </ul>
                      </div>
                      <div className="grp">
                        <div className={this.getClass(5)} onClick={e=>this.handleClick(5)}>终端与网络</div>
                          <ul>
                            <li><Link to="home/Brand.html" activeClassName="active">品牌分析</Link></li>
                              <li><Link to="home/modelAnalysis.html" activeClassName="active">机型分布</Link></li>
                              <li><Link to="home/osVersion.html" activeClassName="active">操作系统版本</Link></li>
                              <li><Link to="home/resolution.html" activeClassName="active">分辨率</Link></li>
                              <li><Link to="home/netAndOperator.html" activeClassName="active"><span>网络与运营商</span></Link></li>
                          </ul>
                      </div>
                      <div className="grp">
                        <div className={this.getClass(6)} onClick={e=>this.handleClick(6)}>Crash分析</div>
                          <ul>
                            <li><Link to="home/realCrash.html" activeClassName="active">实时Crash</Link></li>
                              <li><Link to="home/crashTrend.html" activeClassName="active">Crash趋势</Link></li>
                              <li><Link to="home/crashDetail.html" activeClassName="active">Crash详情</Link></li>
                          </ul>
                      </div>
                      <div className="grp">
                        <div className={this.getClass(9)} onClick={e=>this.handleClick(9)}>管理设置</div>
                          <ul>
                            <li><Link to="home/eventManage.html" activeClassName="active">自定义事件管理</Link></li>
                            <li><Link to="home/paramsManage.html" activeClassName="active">参数管理</Link></li>
                            <li><Link to="home/channelManage.html" activeClassName="active">渠道管理</Link></li>
                            <li><Link to="home/onlineParam.html" activeClassName="active">在线参数</Link></li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
        )
    }
}

export default Slider