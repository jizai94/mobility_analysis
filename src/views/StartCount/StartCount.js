import React, { Component } from 'react'
import { Link } from 'react-router'
import { DatePicker, Select, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'
import TopTitle from '../../components/utils/TopTitle'
import MiddleTitle from '../../components/utils/MiddleTitle'
import './StartCount.scss'
import ImgTab from '../../components/utils/ImgTab'
import moment from 'moment'
import { getCookie, setCookie } from 'UTIL/cookie'
const { Option, OptGroup } = Select;

class StartCount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      platform: '1',
      versionList: JSON.parse(sessionStorage.getItem('versionList')),
      tabInfo1: [{
        text: '人均启动次数'
      }, {
        text: '日启动次数'
      }, {
        text: '周日均启动次数'
      }, {
        text: '月日均启动次数'
      }],
      tabInfo2: [{
        text: '日启动次数'
      }, {
        text: '周日均启动次数'
      }, {
        text: '月日均启动次数'
      }],

    }
  }

  getOption() {
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        bottom: '5%',
        data: ['人均启动次数']
      },
      grid: {
        left: '5%',
        right: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'solid'
          }
        },
        boundaryGap: false,
        data: ['2017-04-03', '2017-04-04', '2017-04-05', '2017-04-06', '2017-04-07',
          '2017-04-08', '2017-04-09', '2017-04-10', '2017-04-11', '2017-04-12',
          '2017-04-13', '2017-04-14', '2017-04-15', '2017-04-16', '2017-04-17',
          '2017-04-18', '2017-04-19', '2017-04-20', '2017-04-21', '2017-04-22',
          '2017-04-23', '2017-04-24', '2017-04-25', '2017-04-26', '2017-04-27',
          '2017-04-28', '2017-04-29', '2017-04-30', '2017-05-01', '2017-05-02',
          '2017-05-03'
        ]
      },
      yAxis: {
        type: 'value',
        axisTick: {
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
      series: {
        name: '人均启动次数',
        type: 'line',
        zlevel: 10,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: 'rgb(0, 153, 204)'
          }
        },
        data: [
          1.95, 1.6, 2.75, 2.43, 1.89,
          1.95, 1.6, 2.75, 2.43, 1.89,
          1.95, 1.6, 2.75, 2.43, 1.89,
          1.95, 1.6, 2.75, 2.43, 1.89,
          1.95, 1.6, 2.75, 2.43, 1.89,
          1.95, 1.6, 2.75, 2.43, 1.89,
          1.95
        ]
      }
    };

    return option;
  }

  getOption1() {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#4c8dbe'
          }
        },
        formatter: '{b} <br /> {a0} : {c0}% <br /> {a1} : {c1}%'
      },
      legend: {
        data: ['2017-04-26', '2017-05-03'],
        bottom: '5%'
      },
      grid: {
        left: '3%',
        right: '4%',
        containLabel: true
      },
      color: [
        '#09c', '#ccc'
      ],
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: {
          formatter: '{value}%'
        }
      },
      yAxis: {
        type: 'category',
        data: ['50+', '20-49', '10-19', '6-9', '3-5', '1-2'],
        splitLine: {
          show: true,
          lineStyle: {
            type: 'solid'
          }
        }
      },
      series: [{
        name: '2017-04-26',
        type: 'bar',
        data: [0, 0, 0, 4.88, 7.32, 87.8]
      }, {
        name: '2017-05-03',
        type: 'bar',
        data: [0, 0, 0, 2.56, 7.69, 89.74]
      }]
    };

    return option;
  }

  tabClick() {
    console.log(1)
  }
  resizeChart(chart) {
    setTimeout(function() {
      chart.resize();
    }, 0)
  }

  handleChangeVersion(value) {
    console.log(value)
    this.setState({
      appVersion: value
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
      platform: num
    })
  }

  render() {
    const {
      tabInfo1,
      tabInfo2
    } = this.state
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    const day = (date.getDate() - 1) < 10 ? '0' + (date.getDate() - 1) : (date.getDate() - 1)
    const yesterday = `${year}-${month}-${day}`
    const time1 = `${year}-${month - 1}-${day}`
    const time2 = `${year}-${month}-${day - 7}`

    return (
      <div className='startCount'>
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
        <TopTitle value='启动次数'>
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
          <DatePicker style={{ float: 'right', marginRight: 40 }} defaultValue={moment(yesterday, 'YYYY-MM-DD')} />
          <span style={{float: 'right', lineHeight: 2, marginRight: 10}}>至</span>
          <DatePicker style={{ float: 'right', marginRight: 10 }} defaultValue={moment(time1, 'YYYY-MM-DD')} />
        </TopTitle>
        <div className='trend-img'>
          <ImgTab tabInfo={tabInfo1} click={this.tabClick} />
            <div className='img-content'>
                <h4>网络分布</h4>
                <ReactEcharts
                    option={this.getOption()}
                    style={{height: '400px'}}
                />
            </div>
        </div>
        <div className='datas'>
            <MiddleTitle value='数据表' style={{borderTop: '1px solid #000'}}>
                <Button style={{ float: 'right', margin: '6px 10px 0 0'}}>详情</Button>
                <Button style={{ float: 'right', margin: '6px 10px 0 0'}}>导出</Button>
            </MiddleTitle>
        </div>
        <div className='count-img'>
          <ImgTab tabInfo={tabInfo2} click={this.tabClick} />
            <div className='img-content'>
                <div>
                    <h4>分布图</h4>
                    <DatePicker style={{float: 'right', marginRight: 10}} defaultValue={moment(time2, 'YYYY-MM-DD')} />
                    <p>对比：</p>
                    <DatePicker style={{float: 'right', marginRight: 40}} defaultValue={moment(yesterday, 'YYYY-MM-DD')} />
                    <p>当前：</p>
                </div>
                <ReactEcharts
                    option={this.getOption1()} 
                    style={{height: '400px',width:'auto'}} 
                    className='react_for_echarts' 
                    onChartReady = {this.resizeChart}
                />
            </div>
        </div>
      </div>
    )
  }
}

export default StartCount