import React, {Component} from 'react'
import { Link } from 'react-router'
import ReactEcharts from 'echarts-for-react'
import { DatePicker, Select, Button } from 'antd'
import ImgTab from '../../components/utils/ImgTab'
import TopTitle from '../../components/utils/TopTitle'
import MiddleTitle from '../../components/utils/MiddleTitle'
import './UseTime.scss'
import { getCookie, setCookie } from 'UTIL/cookie'
const { Option, OptGroup } = Select;

const {
  RangePicker
} = DatePicker

class UseTime extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      platform: '1',
      versionList: JSON.parse(sessionStorage.getItem('versionList')),
      tabInfo1: [{
        text: '次均使用时长'
      }, {
        text: '日使用时长'
      }],
      tabInfo2: [{
        text: '次均使用时长'
      }, {
        text: '日使用时长'
      }]
    }
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

    return (
      <div className="user-time">
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
        <TopTitle value="使用时长">
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
            <RangePicker style={{ float: 'right', marginRight: 50 }} />
        </TopTitle>
        <div className="trend-img">
            <ImgTab tabInfo={tabInfo1} click={this.tabClick} />
            <div className="img-content">
                <h4>24小时累积趋势</h4>
                <ReactEcharts
                    option={this.getOption1()}
                    style={{height: '400px'}}
                    onChartReady = {this.resizeChart}
                />
            </div>
            <MiddleTitle value="数据表" style={{borderTop: '1px solid #000'}}>
                <Button style={{ float: 'right', margin: '6px 10px 0 0'}}>详情</Button>
                <Button style={{ float: 'right', margin: '6px 10px 0 0'}}>导出</Button>
            </MiddleTitle>
        </div>
        <div className="time-img">
            <ImgTab tabInfo={tabInfo2}/>
            <div className="img-content">
                <div className="time-header">
                    <DatePicker style={{ float: 'right', marginRight: 10 }}/>
                    <p>对比：</p>
                </div>
                <ReactEcharts
                    option={this.getOption2()}
                    style={{height: '400px'}}
                    onChartReady = {this.resizeChart}
                />
            </div>
        </div>
      </div>
    )
  }

  getOption1() {
    const option = {
      color: [
        '#09c', '#ccc'
      ],
      legend: {
        bottom: '5%',
        data: ['次均使用时长']

      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params, ticket, callback) {
          var value = params[0].data;
          var minute = parseInt(value / 60);
          var second = parseFloat(value % 60);
          return (params[0].name + '<br />' + params[0].seriesName + '：' + minute + '分' + second.toFixed(2) + '秒');
        }
      },
      grid: {
        containLabel: true,
        left: '3%',
        right: '4%'
      },
      xAxis: {
        zlevel: 10,
        type: 'category',
        axisTick: {
          alignWithLabel: true,
          lineStyle: {
            color: '#333'
          }
        },
        axisLabel: {
          formatter: function(value) {
            return value.substring(5);
          },
          textStyle: {
            color: '#333'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#09c',
            width: 2
          }
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
        zlevel: 10,
        type: 'value',
        axisTick: {
          alignWithLabel: true,
          show: false,
          lineStyle: {
            color: '#333',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333'
          },
          formatter: function(value) {
            var minute = parseInt(value / 60);
            var second = value % 60;
            return minute + '分' + second + '秒';
          }
        },
        splitLine: {
          lineStyle: {
            type: 'solid'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#09c',
            width: 2
          }
        }
      },
      series: {
        name: '次均使用时长',
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
          37.37, 78.21, 60.83, 45.37, 34.54,
          37.37, 78.21, 60.83, 45.37, 34.54,
          37.37, 78.21, 60.83, 45.37, 34.54,
          37.37, 78.21, 60.83, 45.37, 34.54,
          37.37, 78.21, 60.83, 45.37, 34.54,
          37.37, 78.21, 60.83, 45.37, 34.54,
          37.37
        ]
      }
    };

    return option;
  }

  getOption2() {
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
        '#aedd8f', '#88c3e8', '#ccc'
      ],
      xAxis: {
        offset: 2,
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: {
          formatter: '{value}%',
          textStyle: {
            color: '#333'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#09c',
            width: 2
          }
        },
        axisTick: {
          lineStyle: {
            color: '#333',
          }
        }
      },
      yAxis: {
        z: 10,
        type: 'category',
        data: ['1-3秒', '4-10秒', '11-30秒', '31-60秒', '1-3分钟', '3-10分钟', '10-30分钟', '30分钟以上'],
        splitLine: {
          show: true,
          lineStyle: {
            type: 'solid'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#09c',
            width: 2
          }
        },
        axisTick: {
          lineStyle: {
            color: '#333',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333'
          }
        }
      },
      series: [{
        name: '2017-04-26',
        type: 'bar',
        data: [0, 15.62, 50, 13.51, 16.22, 9.38, 0, 0]
      }, {
        name: '2017-05-03',
        type: 'bar',
        data: [0, 24.32, 43.24, 13.51, 16.22, 2.7, 3.12, 0]
      }]
    };

    return option;
  }
}

export default UseTime