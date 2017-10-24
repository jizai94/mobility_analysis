import React, { Component } from 'react'
import moment from 'moment'
import ReactEcharts from 'echarts-for-react'
import NProgress from 'nprogress'
import { Tooltip, Icon, Select, DatePicker, Button , Table } from 'antd'
import ImgTab from '../../components/utils/ImgTab1'
import { today, yesterday ,lMonthY,lastWeek,timeToMs} from 'GLOBAL'
import { getCookie, setCookie } from 'UTIL/cookie'
import './CrashTrend.scss'
import { Link } from 'react-router'

const columns = [{
  title: '统计时间',
  dataIndex: 'date',
  sorter: (a, b) => a.addUser - b.addUser,
  color:'#fff'
}, {
  title: 'crash次数',
  dataIndex: 'crashClient',
  sorter: (a, b) => a.crashClient - b.crashClient,
},{
  title: '启动次数',
  dataIndex: 'currentClient',
  sorter: (a, b) => a.currentClient - b.currentClient,
}, {
  title: 'crash用户数',
  dataIndex: 'crashUser',
  sorter: (a, b) => a.crashUser - b.crashUser
}, {
  title: 'crash率',
  dataIndex: 'clientPercent',
  sorter: (a, b) => a.clientPercent - b.perUsclientPercenterTime1
}];

const columns1 = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

const getOption = (arrCrash,dateArr,str) => {
  switch(str){
    case 'userPercent':
        str = ['Crash用户占比']
        break
    case 'clientPercent':
        str = ['Crash率']
        break
    case 'crashClient':
        str = ['Crash次数']
        break
    case 'crashUser':
        str = ['Crash用户数']
        break
  }
  const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom: '20',
            data: str
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                // 刻度与标签对齐
                alignWithLabel: 3
                    // 隔1个显示1个标签
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid'
                }
            },
            boundaryGap: false,
            data: dateArr
        }],
        yAxis: {
            type: 'value',
            axisTick: {
                // 刻度与标签对齐
                alignWithLabel: true
            },
            splitLine: {
                lineStyle: {
                    type: 'solid'
                }
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: str,
            type: 'line',
            zlevel: 10,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: 'rgb(0, 153, 204)'
                }
            },
            data: arrCrash
        }]
    };
    return option;
}

const getTranstime = (start,end) => {
  let i = 0 ,oneDay = 1000 * 24 * 60 *60
  while(start<end){
    i++   
    start+= oneDay   
  }
  return i 
}

class CrashTrend extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabInfo1: [
        {text: 'Crash用户占比', mark: 'userPercent'},
        {text: 'Crash率', mark: 'clientPercent'},
        {text: 'Crash次数', mark: 'crashClient'},
        {text: 'Crash用户数', mark: 'crashUser'}
      ],
      realCrash: {
        ec_tab: 'userPercent',
        tranTime: 30,
        ec_appKey: sessionStorage.getItem('appkey'),
        ec_platform: '1',
        ec_app_version: 'all',
        ec_ranges_start: timeToMs(lMonthY+' 00:00:00'), 
        ec_ranges_end: timeToMs(lMonthY+' 23:59:59') +1000
      },
      tableCrash:{
        "ec_platform":"1",
        "ec_appKey":sessionStorage.getItem('appkey'),
        "ec_ranges_start":timeToMs(lMonthY+' 00:00:00'),
        "ec_ranges_end":timeToMs(today+' 00:00:00'),
        "ec_app_version":"all"
      },
      current:"1",
      endTime:timeToMs(today+' 00:00:00')
    }
  }

  tabClick (mark) {
    console.log(mark)
    this.setState({"realCrash":{
      ...this.state.realCrash,
      ec_tab:mark
    }},()=>{
      this.props.crashTrend(this.state.realCrash,this.state.realCrash.ec_tab,() => {
        NProgress.done()
        }, () => {
          NProgress.done()
      })
    })
  }
  getClass(num){
      return num == this.state.current ? 'active': ''
  }
  handleClickTab(num){
    console.log(num)
    let app = ['iPad','iPhone','Android']
    this.setState({ current:num })
    this.setState({"realCrash":{
      ...this.state.realCrash,
      ec_platform:num
    },"tableCrash":{
      ...this.state.tableCrash,
      ec_platform:num
    }},()=>{
      this.props.crashTrend(this.state.realCrash,this.state.realCrash.ec_tab,() => {
        NProgress.done()
        }, () => {
          NProgress.done()
      })
      this.props.crashTrendTable(this.state.tableCrash,() => {
        NProgress.done()
      }, () => {
          NProgress.done()
      })
    })
  }
  selectChange (value) {
    const { crashTrend, verSelect } = this.props
    this.setState({"realCrash":{
      ...this.state.realCrash,
      ec_app_version:value
    },"tableCrash":{
      ...this.state.tableCrash,
      ec_app_version:value
    }},()=>{
      this.props.crashTrend(this.state.realCrash,this.state.realCrash.ec_tab,() => {
        NProgress.done()
        }, () => {
          NProgress.done()
      })
      this.props.crashTrendTable(this.state.tableCrash,() => {
        NProgress.done()
      }, () => {
          NProgress.done()
      })
    })
  }

  endDateChange (date,dateString) {
    this.setState({"endTime":timeToMs(dateString+' 23:59:59') + 1000},()=>{
      let tranTime  = getTranstime(this.state.realCrash.ec_ranges_start,this.state.endTime)
      this.setState({"realCrash":{
        ...this.state.realCrash,
        tranTime
      },"tableCrash":{
        ...this.state.tableCrash,
        ec_ranges_end:timeToMs(dateString+' 23:59:59'),
        tranTime
      }},()=>{
        this.props.crashTrend(this.state.realCrash,this.state.realCrash.ec_tab,() => {
          NProgress.done()
          }, () => {
            NProgress.done()
        })
        this.props.crashTrendTable(this.state.tableCrash,() => {
          NProgress.done()
        }, () => {
            NProgress.done()
        })
      })
    })
  }

  staDateChange (date,dateString) {
    let tranTime  = getTranstime(timeToMs(dateString+' 00:00:00'),this.state.endTime)
    this.setState({"realCrash":{
      ...this.state.realCrash,
      ec_ranges_start:timeToMs(dateString+' 00:00:00'),
      ec_ranges_end:timeToMs(dateString+' 23:59:59') +1000,
      tranTime
    },"tableCrash":{
      ...this.state.tableCrash,
      ec_ranges_start:timeToMs(dateString+' 00:00:00'),
      tranTime
    }},()=>{
      this.props.crashTrend(this.state.realCrash,this.state.realCrash.ec_tab,() => {
        NProgress.done()
        }, () => {
          NProgress.done()
      })
      this.props.crashTrendTable(this.state.tableCrash,() => {
        NProgress.done()
      }, () => {
          NProgress.done()
      })
    })
  }

  componentWillMount () {
    this.props.crashTrend(this.state.realCrash,this.state.realCrash.ec_tab,() => {
        NProgress.done()
    }, () => {
        NProgress.done()
    })
    this.props.crashTrendTable(this.state.tableCrash,() => {
        NProgress.done()
    }, () => {
        NProgress.done()
    })
  }

  render () {
    const { tabInfo1 } = this.state
    const { countList,arrCrash,dateArr,str } = this.props
    const endDisabledDate = current => current && current.valueOf() > Date.now()
    const startDisabledDate = current => current && current.valueOf() > Date.now()
    const versionList = JSON.parse(sessionStorage.getItem('versionList'))
    return (
      <div className='crashTrend'>
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
        <div className='header'>
          <h3>
            Crash趋势
            <Tooltip placement='right' title='只能选择最近30天的趋势'>
              <Icon type='question-circle' />
            </Tooltip>
          </h3>
          <Select defaultValue='all' style={{ width: 120, float: 'right' }} onSelect={(value) => (this.selectChange(value))}>
            <Select.Option value='all'>全部版本</Select.Option>
            {
              versionList.map((item,index) => {
                 return(
                      <Select.Option value={item.appVersion} key={item.appVersion}>{item.appVersion}</Select.Option>
                   )
              })
            }
          </Select>
          <DatePicker style={{ float: 'right', marginRight: 40 }} defaultValue={moment(today, 'YYYY-MM-DD')} disabledDate={endDisabledDate} onChange={(date,dateString) => this.endDateChange(date,dateString)} />
          <span style={{float: 'right', lineHeight: 2, marginRight: 10}}>至</span>
          <DatePicker style={{ float: 'right', marginRight: 10 }} defaultValue={moment(lMonthY, 'YYYY-MM-DD')} disabledDate={startDisabledDate} onChange={(date,dateString) => this.staDateChange(date,dateString)} />
        </div>
        <div className='crashTrend-img'>
          <ImgTab tabInfo={tabInfo1} click={e=>this.tabClick(e)} />
          <div className='img-content'>
            <h4>Crash趋势</h4>
            <ReactEcharts
              option={getOption(arrCrash,dateArr,str)}
              style={{height: '400px'}}
              onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
            />
            <div className='crashTrend-table-header'>
              <h5>Crash列表</h5>
              <Button style={{float: 'right', margin: '6px 10px 0 0'}}>导出</Button>
            </div>
            <Table columns={columns} dataSource={countList} key='tableList' />
            <div className="tableFooter"></div>
          </div>
        </div>
{/*        <div className='crashTrend-table'>
          <div className='crashTrend-table-header' >
            <h5>Crash列表</h5>
            <Button style={{float: 'right', margin: '6px 10px 0 0'}}>导出</Button>
            <Select defaultValue='应用版本' style={{ width: 150, float: 'right', margin: '6px 10px 0 0' }}>
              <Option value='应用版本'>应用版本</Option>
              <Option value='发生页面'>发生页面</Option>
              <Option value='操作系统版本'>操作系统版本</Option>
              <Option value='品牌'>品牌</Option>
              <Option value='机型'>机型</Option>
            </Select>
            <h6>选择分布维度：</h6>
          </div>
        </div>*/}
      </div>
    )
  }
  }

export default CrashTrend
