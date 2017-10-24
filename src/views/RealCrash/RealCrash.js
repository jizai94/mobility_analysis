import React, { Component } from 'react'
import { Link } from 'react-router'
import './RealCrash.scss'
import { today, yesterday, timeToMs } from 'GLOBAL'
import { Tooltip, Icon, Select, DatePicker, Button, Input, message } from 'antd'
import moment from 'moment'
import ReactEcharts from 'echarts-for-react'
import { getCookie, setCookie } from 'UTIL/cookie'

const Search = Input.Search
const Option = Select.Option

let t = ''

class RealCrash extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: 1,
      time: '',
      versionList: JSON.parse(sessionStorage.getItem('versionList')),
      chooseDate: yesterday,
      ec_ranges_start: timeToMs(`${today} 00:00:00`),
      ec_ranges_end: timeToMs(`${today} 23:00:00`),
      ec_app_version: 'all',
      ec_appKey: sessionStorage.getItem('appkey'),
      ec_platform: '1',
      ec_tab: 'crash_user_percent',
      tranTime: new Date().getHours(),
      beginTime: timeToMs(`${yesterday} 00:00:00`),
      endTime: timeToMs(`${yesterday} 23:00:00`)
    }
  }

  tabClick(e) {
    console.log(e.currentTarget.getAttribute('data-tab'))
    const tabs = e.currentTarget.parentNode.childNodes
    for(let i = 0; i < tabs.length; i++){
      tabs[i].classList.remove('active')
    }
    e.currentTarget.classList.add('active')
    this.setState({
      ec_tab: e.currentTarget.getAttribute('data-tab')
    })
    this.props.realCrashChart({
      ...this.state,
      ec_tab: e.currentTarget.getAttribute('data-tab')
    }, () => {

    }, () => {
      
    })
  }

  getClass(num) {
    return num == this.state.current ? 'active' : ''
  }
  handleClickNum(num) {
    console.log(num)
    let app = ['iPhone', 'Android']
    this.setState({
      current: num,
      ec_platform: num,

    })
    this.props.realCrashDynamic({
      ...this.state,
      ec_platform: num,
      chooseDate: this.state.chooseDate,
      beginTime: timeToMs(`${this.state.chooseDate} 00:00:00`),
      endTime: timeToMs(`${this.state.chooseDate} 23:00:00`)
    }, () => {

    }, () => {

    })
    this.props.realCrashChart({
      ...this.state,
      ec_platform: num,
      chooseDate: this.state.chooseDate,
      beginTime: timeToMs(`${this.state.chooseDate} 00:00:00`),
      endTime: timeToMs(`${this.state.chooseDate} 23:00:00`)
    }, () => {

    }, () => {
      
    })
  }

  componentWillMount() {
    this.props.realCrashDynamic(this.state, () => {

    }, () => {

    })
    this.props.realCrashChart(this.state, () => {

    }, () => {
      
    })
  }

  handleChange(dateString) {
    console.log(dateString)
    this.setState({
      chooseDate: dateString,
      beginTime: timeToMs(`${dateString} 00:00:00`),
      endTime: timeToMs(`${dateString} 23:00:00`)
    })
    this.props.realCrashChart({
      ...this.state,
      chooseDate: dateString,
      beginTime: timeToMs(`${dateString} 00:00:00`),
      endTime: timeToMs(`${dateString} 23:00:00`)
    }, () => {

    }, () => {
      
    })
  }

  handleChangeVersion(value) {
    console.log(value)
    this.setState({
      ec_app_version: value
    })
    this.props.realCrashDynamic({
      ...this.state,
      ec_app_version: value,
      chooseDate: this.state.chooseDate,
      beginTime: timeToMs(`${this.state.chooseDate} 00:00:00`),
      endTime: timeToMs(`${this.state.chooseDate} 23:00:00`)
    }, () => {

    }, () => {

    })
    this.props.realCrashChart({
      ...this.state,
      ec_app_version: value,
      chooseDate: this.state.chooseDate,
      beginTime: timeToMs(`${this.state.chooseDate} 00:00:00`),
      endTime: timeToMs(`${this.state.chooseDate} 23:00:00`)
    }, () => {

    }, () => {
      
    })
  }

  componentDidMount() {
    let now = () => {
      let date = new Date(),
        checkTime = (i) => {
          if (i<10) {
            i="0" + i
          }
          return i
        },
        year = checkTime(date.getFullYear()),
        month = checkTime(date.getMonth() + 1),
        day = checkTime(date.getDate()),
        hour = checkTime(date.getHours()),
        min = checkTime(date.getMinutes()),
        sec = checkTime(date.getSeconds());
        this.setState({
          time: `${year}-${month}-${day} ${hour}:${min}:${sec}`
        })
    }
    t = setInterval(now, 1000);
  }

  componentWillUnmount() {
      clearInterval(t)
  }

  render () {
    const { crashUserPercent, crashPercent, crashTimes, crashUsers, echeartOption } = this.props.state
    return (
      <div className="RealCrash">
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
        <div className="header">
          <h3>
            实时Crash
            <Tooltip placement="right" title="实时Crash">
              <Icon type="question-circle" />
            </Tooltip>
          </h3>
          <span>{ this.state.time }</span>
          <Select 
            defaultValue="all" 
            style={{ width: 120, float: 'right' }}
            onChange={ (e, value) => this.handleChangeVersion(e, value) }
          >
            <Option value="all">全部版本</Option>
            {
              this.state.versionList.map((item) => {
                return <Option value={item.appVersion} key={item.appVersion}>{item.appVersion}</Option>
              })
            }
          </Select>
        </div>
        <div className="RealCrash-img">
          <div className="img-header">
            <ul>
              <li className="active" data-tab="crash_user_percent" onClick={(e) => {this.tabClick(e)}}>
                <h5>Crash用户占比</h5>
                <span>{crashUserPercent.current}</span>
                <p>比昨日同期：
                  <b>{crashUserPercent.yestoday}</b>
                  { 
                    crashUserPercent.yestoday == 0 ? '' : (crashUserPercent.yestoday < 0 ? <Icon type="arrow-down" className="arrow-down"/> : <Icon type="arrow-up" className="arrow-up"/>)
                  }
                </p>
                <p>比上周同期：
                  <b>{crashUserPercent.lastweek}</b>
                  { 
                    crashUserPercent.lastweek == 0 ? '' : (crashUserPercent.lastweek < 0 ? <Icon type="arrow-down" className="arrow-down"/> : <Icon type="arrow-up" className="arrow-up"/>)
                  }
                </p>
              </li>
              <li data-tab="crash_percent" onClick={(e) => {this.tabClick(e)}}>
                <h5>Crash率</h5>
                <span>{crashPercent.current}</span>
                <p>比昨日同期：
                  <b>{crashPercent.yestoday}</b>
                  { 
                    crashPercent.yestoday == 0 ? '' : (crashPercent.yestoday < 0 ? <Icon type="arrow-down" className="arrow-down"/> : <Icon type="arrow-up" className="arrow-up"/>)
                  }
                </p>
                <p>比上周同期：
                  <b>{crashPercent.lastweek}</b>
                  { 
                    crashPercent.lastweek == 0 ? '' : (crashPercent.lastweek < 0 ? <Icon type="arrow-down" className="arrow-down"/> : <Icon type="arrow-up" className="arrow-up"/>)
                  }
                </p>
              </li>
              <li data-tab="crash_times" onClick={(e) => {this.tabClick(e)}}>
                <h5>Crash次数</h5>
                <span>{crashTimes.current}</span>
                <p>比昨日同期：
                  <b>{crashTimes.yestoday}</b>
                  { 
                    crashTimes.yestoday == 0 ? '' : (crashTimes.yestoday < 0 ? <Icon type="arrow-down" className="arrow-down"/> : <Icon type="arrow-up" className="arrow-up"/>)
                  }
                </p>
                <p>比上周同期：
                  <b>{crashTimes.lastweek}</b>
                  { 
                    crashTimes.lastweek == 0 ? '' : (crashTimes.lastweek < 0 ? <Icon type="arrow-down" className="arrow-down"/> : <Icon type="arrow-up" className="arrow-up"/>)
                  }
                </p>
              </li>
              <li data-tab="crash_users" onClick={(e) => {this.tabClick(e)}}>
                <h5>Crash用户数</h5>
                <span>{crashUsers.current}</span>
                <p>比昨日同期：
                  <b>{crashUsers.yestoday}</b>
                  { 
                    crashUsers.yestoday == 0 ? '' : (crashUsers.yestoday < 0 ? <Icon type="arrow-down" className="arrow-down"/> : <Icon type="arrow-up" className="arrow-up"/>)
                  }
                </p>
                <p>比上周同期：
                  <b>{crashUsers.lastweek}</b>
                  { 
                    crashUsers.lastweek == 0 ? '' : (crashUsers.lastweek < 0 ? <Icon type="arrow-down" className="arrow-down"/> : <Icon type="arrow-up" className="arrow-up"/>)
                  }
                </p>
              </li>
            </ul>
          </div>
          <div className="img-content">
            <div className="content-header">
              <h3>区间分布</h3>
              <DatePicker
                style={{ float: 'right', marginRight: 40 }} 
                size="default" 
                defaultValue={moment(yesterday, 'YYYY-MM-DD')} 
                onChange = { (date, dateString) => { this.handleChange(dateString) } }
                disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }
              />
              <h4>对比：</h4>
            </div>
            <ReactEcharts
              option={echeartOption}
              style={{height: '400px'}}
              onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
            />
          </div>
        </div>
        <div className="content-table">
          <div className="crash-table-header">
            <h4>Crash列表</h4>
            <Button style={{width: 80, float: 'right', margin: '6px 10px 0 0'}}>导出</Button>
            <Button style={{float: 'right', margin: '6px 10px 0 0'}}>查询</Button>
            <Search placeholder="输入关键字进行检索..." style={{ width: 200, float: 'right', margin: '6px 10px 0 0' }} />
          </div>
          <div id="real-table">
            <section className="table-header">
              <div className="long">
                <p>Crash摘要</p>
              </div>
              <div>
                <p>应用版本</p>
              </div>
              <div>
                <p>Crash次数</p>
              </div>
              <div>
                <p>Crash占比</p>
              </div>
              <div>
                <p>最近出现时间</p>
              </div>
              <div>
                <p>操作</p>
              </div>
            </section>
            <section>
              <div className="long">
                <p>StackTrace=====>java.lang.NullPointerException: println needs a message</p>
              </div>
              <div>
                <p>3.7.4.1</p>
              </div>
              <div>
                <p>1</p>
              </div>
              <div>
                <p>50%</p>
              </div>
              <div>
                <p>07:02:50</p>
              </div>
              <div>
                <p>查看详情+</p>
              </div>
            </section>
            <section>
              <div className="long">
                <p><nobr>StackTrace=====>java.lang.RuntimeException: Unable to start activity ComponentInfo: java.lang.NullPointerException</nobr></p>
              </div>
              <div>
                <p>3.7.4.1</p>
              </div>
              <div>
                <p>1</p>
              </div>
              <div>
                <p>50%</p>
              </div>
              <div>
                <p>07:02:50</p>
              </div>
              <div>
                <p>查看详情+</p>
              </div>
            </section>
            <section>
              <div className="long">
                <p>StackTrace=====>java.lang.NullPointerException: println needs a message</p>
              </div>
              <div>
                <p>3.7.4.1</p>
              </div>
              <div>
                <p>1</p>
              </div>
              <div>
                <p>50%</p>
              </div>
              <div>
                <p>07:02:50</p>
              </div>
              <div>
                <p>查看详情+</p>
              </div>
            </section>
            <section>
              <div className="long">
                <p>StackTrace=====>java.lang.NullPointerException: println needs a message</p>
              </div>
              <div>
                <p>3.7.4.1</p>
              </div>
              <div>
                <p>1</p>
              </div>
              <div>
                <p>50%</p>
              </div>
              <div>
                <p>07:02:50</p>
              </div>
              <div>
                <p>查看详情+</p>
              </div>
            </section>
            <section>
              <div className="long">
                <p><nobr>StackTrace=====>java.lang.RuntimeException: Unable to start activity ComponentInfo: java.lang.NullPointerException</nobr></p>
              </div>
              <div>
                <p>3.7.4.1</p>
              </div>
              <div>
                <p>1</p>
              </div>
              <div>
                <p>50%</p>
              </div>
              <div>
                <p>07:02:50</p>
              </div>
              <div>
                <p>查看详情+</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default RealCrash
