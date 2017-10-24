import moment from 'moment'
import NProgress from 'nprogress'
import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import { DatePicker, Select, message,Button } from 'antd'
import { today, yesterday ,lMonthY,timeToMs} from 'GLOBAL'
import ImgTab from '../../components/utils/ImgTab1'
import TopTitle from '../../components/utils/TopTitle'
import './NetAndOperator.scss'
import { getCookie, setCookie } from 'UTIL/cookie'
import getTime from 'UTILS/getTime'
import { Link } from 'react-router'

const oneDay = 1000 * 60 * 60 * 24

let option2 =  {
    series: [
      {
        name: '访问来源',
        type: 'pie',
        hoverAnimation: false,
        radius: '75%',
        data: [ {value:10, name:'中国电信'},
                {value:5, name:'中国联通'},
                {value:15, name:'其他'},
                {value:25, name:'中国移动'},
              ]
      }
    ],
    color: ['#88c3e8', '#aedd8f', '#00ccff', '#ffbb33', '#00cc00', '#ff5c45'],
    tooltip: {
      formatter: function (params) {
        return params.name + '：' + params.value + '(' + params.percent + '%)'
      }
    },
    legend: {
      data: ['中国电信','中国联通','其他','中国移动'],
      bottom: '0%'
    }
}
const getOption1 = (data) =>{
  let option1 = {
    series: [
      {
        name: '访问来源',
        type: 'pie',
        hoverAnimation: false,
        radius: '75%',
        data: data.all
      }
    ],
    color: ['#88c3e8', '#aedd8f', '#00ccff', '#ffbb33', '#00cc00', '#ff5c45'],
    tooltip: {
      formatter: function (params) {
        return params.name + '：' + params.value + '(' + params.percent + '%)'
      }
    },
    legend: {
      data: data.title,
      bottom: '0%'
    }
  }
  return option1
}

const timer = () => {
  const oneDay = 1000 * 60 * 60 * 24
  let current = new Date()
  current.setHours(0)
  current.setMinutes(0)
  current.setSeconds(0)
  current.setMilliseconds(0)
  let end = current.getTime()
  return {
    start: end - oneDay,
    end
  }
}
let initObj = timer()

class NetAndOperator extends Component {
  constructor (props) {
    super(props)

    this.state = {
      reqData: {
        ec_platform: '1',
        ec_appKey: sessionStorage.getItem('appkey'),
        ec_ranges_start: timeToMs(today+' 00:00:00'),//初始化日期
        ec_ranges_end: Date.now(),//初始化日期
        ec_app_version: 'all',
        ec_net: 'nowDay',
        ec_carrier: 'nowDay',
        beginTime: timeToMs(today+' 00:00:00'),//初始化日期
        endTime: Date.now()//初始化日期
      },
      tabs: {
        tabInfo1: [
          {text: '当天活跃用户', mark: 'nowDay'},
          {text: '周日活跃用户', mark: 'weekDay'},
          {text: '月日活跃用户', mark: 'monthDay'}
        ],
        tabInfo2: [
          {text: '当天活跃用户', mark: 'nowDay'},
          {text: '周日活跃用户', mark: 'weekDay'},
          {text: '月日活跃用户', mark: 'monthDay'}
        ]
      },
      isToday: true,
      timeChoise:'',
      current:"1"
    }
  }
  componentWillMount () {
    this.props.netAndOperator(this.state.reqData,() => {
        NProgress.done()
      }, () => {
        NProgress.done()
    })
  }
  getClass(num){
      return num == this.state.current ? 'active': ''
    }
  handleClickTab(num){
      console.log(num)
      let app = ['iPad','iPhone','Android']
      this.setState({ current:num })
      this.setState({'reqData':{
        ec_platform: num,
        ec_appKey: this.state.reqData.ec_appKey,
        ec_ranges_start: this.state.reqData.ec_ranges_start,
        ec_ranges_end: this.state.reqData.ec_ranges_end,
        ec_app_version: this.state.reqData.ec_app_version,
        ec_net: this.state.reqData.ec_net,
        ec_carrier: this.state.reqData.ec_carrier,
        beginTime: this.state.reqData.beginTime,
        endTime: this.state.reqData.endTime
      }
    },()=>{
      this.props.netAndOperator(this.state.reqData,() => {
        NProgress.done()
      }, () => {
        NProgress.done()
      })
    })
  }
  handletab1(mark){
    let timeObj = {}
    if(this.state.isToday){
      switch(mark){
        case 'nowDay':
          timeObj = getTime('day',this.state.isToday)
          break
        case 'weekDay':
          timeObj = getTime('week',this.state.isToday)
          break
        case 'monthDay':
          timeObj = getTime('month',this.state.isToday)
          break
      }
    }else{
      switch(mark){
        case 'nowDay':
          timeObj = getTime('day',this.state.isToday,this.state.timeChoise)
          break
        case 'weekDay':
          timeObj = getTime('week',this.state.isToday,this.state.timeChoise)
          break
        case 'monthDay':
          timeObj = getTime('month',this.state.isToday,this.state.timeChoise)
          break
      }
    }  
    this.setState({'reqData':{
        ec_platform: this.state.reqData.ec_platform,
        ec_appKey: this.state.reqData.ec_appKey,
        ec_ranges_start: timeObj.ec_ranges_start,
        ec_ranges_end: timeObj.ec_ranges_end,
        ec_app_version: this.state.reqData.ec_app_version,
        ec_net: mark,
        ec_carrier: this.state.reqData.ec_carrier,
        beginTime: this.state.reqData.beginTime,
        endTime: this.state.reqData.endTime
      }
    },()=>{
      this.props.netAndOperator(this.state.reqData,() => {
        NProgress.done()
      }, () => {
        NProgress.done()
      })
    })
  }

  handletab2(mark){
    let timeObj = {}
    if(this.state.isToday){
      switch(mark){
        case 'nowDay':
          timeObj = getTime('day',this.state.isToday)
          break
        case 'weekDay':
          timeObj = getTime('week',this.state.isToday)
          break
        case 'monthDay':
          timeObj = getTime('month',this.state.isToday)
          break
      }
    }else{
      switch(mark){
        case 'nowDay':
          timeObj = getTime('day',this.state.isToday,this.state.timeChoise)
          break
        case 'weekDay':
          timeObj = getTime('week',this.state.isToday,this.state.timeChoise)
          break
        case 'monthDay':
          timeObj = getTime('month',this.state.isToday,this.state.timeChoise)
          break
      }
    }  
    this.setState({'reqData':{
        ec_platform: this.state.reqData.ec_platform,
        ec_appKey: this.state.reqData.ec_appKey,
        ec_ranges_start: this.state.reqData.ec_ranges_start,
        ec_ranges_end: this.state.reqData.ec_ranges_end,
        ec_app_version: this.state.reqData.ec_app_version,
        ec_net: this.state.reqData.ec_net,
        ec_carrier: mark,
        beginTime: timeObj.ec_ranges_start,
        endTime: timeObj.ec_ranges_end
      }
    },()=>{
      this.props.netAndOperator(this.state.reqData,() => {
        NProgress.done()
      }, () => {
        NProgress.done()
      })
    })
  }

  timeChange (funDate,dateString) {
    let obj1 ={},obj2 ={}
    this.setState({
      'isToday':false,
      'timeChoise':dateString
    },()=>{
      switch(this.state.reqData.ec_net){
        case 'nowDay':
          obj1 = getTime('day',this.state.isToday,this.state.timeChoise)
          break
        case 'weekDay':
          obj1 = getTime('week',this.state.isToday,this.state.timeChoise)
          break
        case 'monthDay':
          obj1 = getTime('month',this.state.isToday,this.state.timeChoise)
          break
      }
      switch(this.state.reqData.ec_carrier){
        case 'nowDay':
          obj2 = getTime('day',this.state.isToday,this.state.timeChoise)
          break
        case 'weekDay':
          obj2 = getTime('week',this.state.isToday,this.state.timeChoise)
          break
        case 'monthDay':
          obj2= getTime('month',this.state.isToday,this.state.timeChoise)
          break
      }
      this.setState({'reqData':{
          ec_platform: this.state.reqData.ec_platform,
          ec_appKey: this.state.reqData.ec_appKey,
          ec_ranges_start: obj1.ec_ranges_start,
          ec_ranges_end: obj1.ec_ranges_end,
          ec_app_version: this.state.reqData.ec_app_version,
          ec_net: this.state.reqData.ec_net,
          ec_carrier: this.state.reqData.ec_carrier,
          beginTime: obj2.ec_ranges_start,
          endTime: obj2.ec_ranges_end
        }
      },()=>{
        this.props.netAndOperator(this.state.reqData,() => {
          NProgress.done()
        }, () => {
          NProgress.done()
        })
      })    
    })   
  }
  selectChange(ver){
    this.setState({'reqData':{
          ec_platform: this.state.reqData.ec_platform,
          ec_appKey: this.state.reqData.ec_appKey,
          ec_ranges_start: this.state.reqData.ec_ranges_start,
          ec_ranges_end: this.state.reqData.ec_ranges_end,
          ec_app_version: ver,
          ec_net: this.state.reqData.ec_net,
          ec_carrier: this.state.reqData.ec_carrier,
          beginTime: this.state.reqData.beginTime,
          endTime: this.state.reqData.endTime
        }
      },()=>{
        this.props.netAndOperator(this.state.reqData,() => {
          NProgress.done()
        }, () => {
          NProgress.done()
        })
      })  
  }
  render () {
    const versionList = JSON.parse(sessionStorage.getItem('versionList'))
    const { data0 , data1 } = this.props
    const { tabInfo1, tabInfo2 } = this.state.tabs
    const { netAndOperator, netAndCarrier, netOption, oprOption } = this.props
    const disabledDate = current => current && current.valueOf() > Date.now()
    const timer = () => {
      const current = new Date()
      current.setHours(0)
      current.setMinutes(0)
      current.setSeconds(0)
      current.setMilliseconds(0)
      const date = new Date(current.getTime() - oneDay)
      const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      return `${date.getFullYear()}-${month}-${date.getDate()}`
    }
    const initTime = timer()

    return (
      <div className='net'>
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
        <TopTitle value='网络与运营商'>
          <Select defaultValue='all' style={{ width: 120, float: 'right' }} onChange={(value) => this.selectChange(value)}>
            <Select.Option value='all'>全部版本</Select.Option>
            {
              versionList.map((item,index) => {
                 return(
                      <Select.Option value={item.appVersion} key={item.appVersion}>{item.appVersion}</Select.Option>
                   )
              })
            }
          </Select>
          <DatePicker style={{ float: 'right', marginRight: 30 }} defaultValue={moment(today, 'YYYY-MM-DD')} disabledDate={disabledDate} onChange={(date,dateString) => this.timeChange(date,dateString)} />
        </TopTitle>
        <div className='content'>
          <ImgTab tabInfo={tabInfo1} click={(mark) => this.handletab1(mark)} />
          <div className='tab-img'>
            <h4>网络分布</h4>
            <ReactEcharts
              option={getOption1(data0)}
              style={{height: '400px'}}
            />
          </div>
        </div>
        <div className='content'>
          <ImgTab tabInfo={tabInfo2} click={(mark) => this.handletab2(mark)} />
          <div className='tab-img'>
            <h4>运营商分布</h4>
            <ReactEcharts
              option={getOption1(data1)}
              style={{height: '400px'}}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default NetAndOperator
