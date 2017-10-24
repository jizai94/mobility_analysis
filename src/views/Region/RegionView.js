import React, { Component } from 'react'
import './china.js'
import ReactEcharts from 'echarts-for-react'
import { Link } from 'react-router'
import NProgress from 'nprogress'
import { DatePicker, Select, Input , Button , Table , message } from 'antd'
import { today, yesterday ,lMonthY} from 'GLOBAL'
import { getCookie, setCookie } from 'UTIL/cookie'
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD'
const monthFormat = 'YYYY-MM'
const Option = Select.Option
import './RegionView.scss'
const columns = [{
  title: '排名',
  dataIndex: 'nameSort'
}, {
  title: '省份',
  dataIndex: 'name'
},{
  title: '占比',
  dataIndex: 'zb'
},{
  title: '用户数量',
  dataIndex: 'value'
}];
const columns1 = [{
  title: '排名',
  dataIndex: 'v1'
}, {
  title: '国家',
  dataIndex: 'v2'
},{
  title: '占比',
  dataIndex: 'v3'
},{
  title: '用户数量',
  dataIndex: 'v4'
}];
const data1 = [{
  v1: '1',
  v2: '中国',
  v3: '0',
  v4:'0'
},{
  v1: '2',
  v2: '日本',
  v3: '0',
  v4:'0'
}];


const getOption1 = (arr1) => {
  console.log(arr1)
  const option = {
      tooltip: {
          trigger: 'item',
          formatter:function(p){
            return p.name +'<br/>占比:'+p.data.zb +'<br/>排名:' + p.data.nameSort+ '<br/>数量:' + p.data.value
          }
      },
      visualMap: {
          min: 0,
          max: 2000,
          left: 'left',
          top: 'bottom',
          text: ['高','低'],           // 文本，默认为数值文本
          calculable: true,
          inRange: {
              color: ['#e0ffff','#006edd']
          }
      },
      series: [
          {
              name: '用户数量',
              type: 'map',
              mapType: 'china',
              roam: false,
              label: {
                  normal: {
                      show: true
                  },
                  emphasis: {
                      show: true
                  }
              },
              itemStyle: {
                  emphasis: {
                      borderColor: 'red',
                      borderWidth: 0
                  },
                  normal:{
                     borderWidth: 0
                  }
              },
              data: arr1          
          }
      ]
  }
  return option
}

let state = "ACTIVEUSER"

export default class RegionView extends Component{
  constructor(props){
    super(props)
    this.state = {
      "reg":{
        platform: '1',
        appkey: sessionStorage.getItem('appkey'),
        date: yesterday,
        appVersion: 'all'
      },
      "current":"1"
    }
  }
  componentWillMount(){
      const { region } = this.props
      NProgress.start()
      region(this.state.reg,state,() => {
          NProgress.done()
          message.info('请求发送成功')
      }, () => {
          NProgress.done()
          message.info('请求发送失败')
      })
  }
  handleChange1(dateString){
    const { region ,str } = this.props
    this.setState({
            "platform":this.state.reg.platform,
            "date":dateString,
            "appVersion":this.state.reg.appVersion,
            "appkey":this.state.reg.appkey
          },()=>{
            region(this.state.reg,str,() => {
            NProgress.done()
            message.info('请求发送成功')
            }, () => {
                NProgress.done()
                message.info('请求发送失败')
            })
          }
      )    
  }
  handleClick(e) {
    const childs = e.currentTarget.parentNode.childNodes
    for(let i = 0; i < childs.length; i++){
      childs[i].classList.remove('active')
    }
    e.currentTarget.classList.add('active')
    let state = e.currentTarget.getAttribute("data-value")
    const { menuChange } = this.props
    menuChange(state)
  }
  handleClick1(e) {
    const childs = e.currentTarget.parentNode.childNodes
    for(let i = 0; i < childs.length; i++){
      childs[i].classList.remove('active')
    }
    e.currentTarget.classList.add('active')
  }
  getClass(num){
      return num == this.state.current ? 'active': ''
  }
  handleClickTab(num){
      console.log(num)
      let app = ['iPad','iPhone','Android']
      this.setState({ current:num })
  }
  handleVersion(e){
    console.log(e)
    const { region ,str } = this.props
    this.setState({
            "platform":this.state.reg.platform,
            "date":this.state.reg.date,
            "appVersion":e,
            "appkey":this.state.reg.appkey
          },()=>{
            region(this.state.reg,str,() => {
            NProgress.done()
            message.info('请求发送成功')
            }, () => {
                NProgress.done()
                message.info('请求发送失败')
            })
          }
      )   
  }
	render(){
    const { data ,arr1 } = this.props
    const versionList = JSON.parse(sessionStorage.getItem('versionList'))
		return(
				<div className="reg">
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
							<h4>地域分布</h4>
						</div>
            <div className="verc verw">
              <Select defaultValue="全部版本" style={{ width: 120 }} onChange ={e => this.handleVersion(e)}>
                <Option value="all">全部版本</Option>
                  {
                    versionList.map((item,index) => {
                       return(
                            <Option value={item.appVersion} key={item.appVersion}>{item.appVersion}</Option>
                         )
                    })
                  }
              </Select>
            </div>
						<div className="verb verw">
						    <DatePicker defaultValue={moment(yesterday, dateFormat)} format={dateFormat} onChange = { (date, dateString) => { this.handleChange1(dateString) } }  disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }/>					    							  
						</div>		
					</div>
					<div className="mid">
						<div className="row1">
							<ul>
								<li style={{width:"20%"}} className="active" onClick={ e => this.handleClick(e)} data-value="ACTIVEUSER">活跃用户</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick(e)} data-value="ADDUSER">新增用户</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick(e)} data-value="LOGINMEMBER">登录会员</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick(e)} data-value="PERSTARTTIMES">人均启动次数</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick(e)} data-value="PERUSERTIMES">次均使用时长</li>
							</ul>
						</div>
						<div className="row3">
							<ReactEcharts
	                        option={getOption1(arr1)}
	                        style={{height: '500px', width: '100%'}} 
	                        className='react_for_echarts' 
                          onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
                          />
						</div>
					</div>
					<div className="bottom">
						<div className="row1">
							<div className="l1">省份分布</div>
							<div className="l3">
								<Button>导出</Button>
							</div>
						</div>
						<div className="row2">
							<Table columns={columns} dataSource={arr1} onChange={this.onChange} className='tableBorder'/>
						</div>
					</div>
{/*					<div className="mid">
						<div className="row1">
							<ul>
								<li style={{width:"20%"}} className="active" onClick={ e => this.handleClick1(e)}>活跃用户</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick1(e)}>新增用户</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick1(e)}>登录会员</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick1(e)}>人均启动次数</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick1(e)}>次均使用时长</li>
							</ul>
						</div>
					</div>
					<div className="bottomb">
						<div className="row1">
							<div className="l1">TOP 10 国家（地区）分布</div>
							<div className="l3">
								<Button>导出</Button>
							</div>
						</div>
						<div className="row2">
							<Table columns={columns1} pagination={false} dataSource={data1} onChange={this.onChange} />
						</div>
					</div>*/}
				</div>
			)
	}
}