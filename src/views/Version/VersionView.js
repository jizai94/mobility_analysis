import React, { Component } from 'react'
import NProgress from 'nprogress'
import { Link } from 'react-router'
import './VersionView.scss'
import { DatePicker, Select, Input , Button , Table , message } from 'antd'
import { today, yesterday ,lMonthY} from 'GLOBAL'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import moment from 'moment';
import { getCookie, setCookie } from 'UTIL/cookie'
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD'
const monthFormat = 'YYYY-MM'
const Option = Select.Option
const columns = [{
  title: '版本',
  dataIndex: 'appVersion',
  sorter: (a, b) => a.appVersion - b.appVersion,
}, {
  title: '活跃用户',
  dataIndex: 'activeUser',
  sorter: (a, b) => a.activeUser - b.activeUser,
  width:120
},{
  title: '占比',
  dataIndex: 'zb1',
  sorter: (a, b) => a.zb1 - b.zb1,
}, {
  title: '新增用户',
  dataIndex: 'addUser',
  sorter: (a, b) => a.addUser - b.addUser,
  width:120
}, {
  title: '占比',
  dataIndex: 'zb2',
  sorter: (a, b) => a.zb2 - b.zb2,
},{
  title: '登录会员',
  dataIndex: 'loginMember',
  sorter: (a, b) => a.loginMember - b.loginMember,
}, {
  title: '人均启动次数',
  dataIndex: 'perStartTimes',
  sorter: (a, b) => a.perStartTimes - b.perStartTimes,
}, {
  title: '次均使用时长(毫秒)',
  dataIndex: 'perUserTime',
  sorter: (a, b) => a.perUserTime - b.perUserTime
}];

const getOtion = (dateArr,versionArr,series) =>{
      const option = {
          tooltip : {
              trigger: 'axis'
          },
          legend: {
              bottom:true,
              data:versionArr
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '15%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  splitLine: {
                    show: true,
                    lineStyle: {
                      type: 'solid'
                  }
              },
                  data : dateArr
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : series
      }
      return option
  }

let state = "activeUser"

export default class VersionView extends Component{

	constructor(props){
		super(props)
    this.state = {
        "ver":{
            "platform":"1",
            "beginTime":lMonthY,
            "appkey":sessionStorage.getItem('appkey'),
            "endTime":yesterday
        },
        "verTable":{
            "platform":"1",
            "beginTime":yesterday,
            "appkey":sessionStorage.getItem('appkey'),
            "endTime":yesterday
        },
        "current":"1"
    }
	}
  componentWillMount(){
    const { version,versionTablelist } = this.props   
    version(this.state.ver,state,() => {
        NProgress.done()
      }, () => {
        NProgress.done()
    })
    versionTablelist(this.state.verTable,() => {
        NProgress.done()
      }, () => {
        NProgress.done()
    })

  }
  handleClick(e) {
    const childs = e.currentTarget.parentNode.childNodes
    for(let i = 0; i < childs.length; i++){
      childs[i].classList.remove('active')
    }
    e.currentTarget.classList.add('active')
    let state = e.currentTarget.getAttribute("data-value")
    const { version } = this.props
    NProgress.start()
    version(this.state.ver,state,() => {
      NProgress.done()
    }, () => {
      NProgress.done()
    })
  }
  handleChange1(dateString){
    const { version ,str } = this.props
    this.setState({"ver":{
              "platform":this.state.ver.platform,
              "beginTime":dateString,
              "appkey":this.state.ver.appkey,
              "endTime":this.state.ver.endTime
          }},()=>{
            version(this.state.ver,str,() => {
            NProgress.done()
            }, () => {
                NProgress.done()
            })
          }
      )
  }
  handleChange2(dateString){
    const { version ,str } = this.props
    this.setState({"ver":{
              "platform":this.state.ver.platform,
              "beginTime":this.state.ver.beginTime,
              "appkey":this.state.ver.appkey,
              "endTime":dateString
          }},()=>{
            version(this.state.ver,str,() => {
            NProgress.done()
            }, () => {
                NProgress.done()
            })
          }
      )
  }
  handleChange3(dateString){
    const { versionTablelist } = this.props
    this.setState({"verTable":{
              "platform":this.state.verTable.platform,
              "beginTime":dateString,
              "appkey":this.state.verTable.appkey,
              "endTime":dateString
          }},()=>{
            versionTablelist(this.state.verTable,() => {
            NProgress.done()
            }, () => {
                NProgress.done()
            })
          }
      )
  }
  getClass(num){
      return num == this.state.current ? 'active': ''
  }
  handleClickTab(num){
      console.log(num)
      let app = ['iPad','iPhone','Android']
      this.setState({ current:num })
      const { versionTablelist ,version,str } = this.props
      this.setState({"ver":{
                "platform":num,
                "beginTime":this.state.ver.beginTime,
                "appkey":this.state.ver.appkey,
                "endTime":this.state.ver.endTime
            },"verTable":{
                "platform":num,
                "beginTime":this.state.verTable.beginTime,
                "appkey":this.state.verTable.appkey,
                "endTime":this.state.verTable.endTime
            }},()=>{
              versionTablelist(this.state.verTable,() => {
                  NProgress.done()
              }, () => {
                  NProgress.done()
              })
              version(this.state.ver,str,() => {
                  NProgress.done()
              }, () => {
                  NProgress.done()
              })
            }
        )
  }
  handleVersion(e){
    console.log(e)
    const { version,str,verChoise } = this.props
    if(e == 'all'){
      this.setState({"ver":{
                "platform":this.state.ver.platform,
                "beginTime":this.state.ver.beginTime,
                "appkey":this.state.ver.appkey,
                "endTime":this.state.ver.endTime
            }},()=>{
              version(this.state.ver,str,() => {
              NProgress.done()
              }, () => {
                  NProgress.done()
              })
            }
        )
    }else{
      verChoise({
          "platform":this.state.ver.platform,
          "beginTime":this.state.ver.beginTime,
          "appkey":this.state.ver.appkey,
          "endTime":this.state.ver.endTime
      },str,e)
    } 
  }



	render(){
      const { dateArr,versionArr,series ,dataTable} = this.props
      const versionList = JSON.parse(sessionStorage.getItem('versionList'))
		return(
				<div className="ver">
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
							<h4>版本分布</h4>
						</div>
						<div className="verb verw">
						    <DatePicker size="default" defaultValue={moment(lMonthY, 'YYYY-MM-DD')} disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }  onChange = { (date, dateString) => { this.handleChange1(dateString) } }/>
                {`  至  `}
                <DatePicker size="default" defaultValue={moment(yesterday, 'YYYY-MM-DD')}  onChange = { (date, dateString) => { this.handleChange2(dateString) } } disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }/>
						</div>
					</div>
					<div className="mid">
						<div className="row1">
							<ul>
								<li style={{width:"20%"}} className="active" onClick={ e => this.handleClick(e)} data-value="activeUser">活跃用户</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick(e)} data-value="addUser">新增用户</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick(e)} data-value="loginMember">登录会员</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick(e)} data-value="perStartTimes">人均启动次数</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick(e)} data-value="perUserTime">次均使用时长(秒)</li>
							</ul>
						</div>
						<div className="row2">
							<div className="r1">趋势图</div>
							<div className="r2">
							</div>						
              <div className="r3">
                <Select
                  showSearch
                  style={{ width: 150, float: 'right' }}
                  defaultValue="all"
                  onChange={e=>this.handleVersion(e)}
                  >
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
						</div>
						<div className="row3">
							<ReactEcharts
                    option = {getOtion(dateArr,versionArr,series)}
                    notMerge={true}
                    style={{height: '350px', width: '100%'}} 
                    className='react_for_echarts' 
                    ref="main"
                    onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
              />
						</div>
					</div>
					<div className="bottom">
						<div className="row1">
							<div className="l1">数据表</div>					
							<div className="l3">
								<Button>导出</Button>
							</div>
              <div className="l2">
                <DatePicker 
                defaultValue={moment(yesterday, dateFormat)} 
                format={dateFormat} 
                onChange = { (date, dateString) => { this.handleChange3(dateString) } }
                disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }
                />
              </div>
						</div>
						<div className="row2">
							<Table columns={columns} pagination={false} dataSource={dataTable} onChange={this.onChange} className="bb"/>
						  <div className="tableFooter"></div>
            </div>
					</div>
				</div>
			)
	}
}