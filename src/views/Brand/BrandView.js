import React, { Component} from 'react'
import './BrandView.scss'
import NProgress from 'nprogress'
import { DatePicker, Select, Input, Button, Table,message  } from 'antd'
import { today, yesterday ,lMonthY,timeToMs} from 'GLOBAL'
import ReactEcharts from 'echarts-for-react'
import { Link } from 'react-router'
import { getCookie, setCookie } from 'UTIL/cookie'
import moment from 'moment'
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD'
const monthFormat = 'YYYY/MM'
const Option = Select.Option
const columns = [{
    title: '品牌',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand - b.brand,
}, {
    title: '活跃用户',
    dataIndex: 'active_user',
    sorter: (a, b) => a.active_user - b.active_user,
}, {
    title: '新增用户',
    dataIndex: 'new_user',
    sorter: (a, b) => a.new_user - b.new_user,
}, {
    title: '登录会员',
    dataIndex: 'login_user',
    sorter: (a, b) => a.login_user - b.login_user,
}, {
    title: '人均启动次数',
    dataIndex: 'avg_start_count',
    sorter: (a, b) => a.avg_start_count - b.avg_start_count,
}, {
    title: '次均使用时长(秒)',
    dataIndex: 'avg_time',
    sorter: (a, b) => a.avg_time - b.avg_time
}];

const getTranstime = (start,end) => {
  let i = 0 ,oneDay = 1000 * 24 * 60 *60
  while(start<end){
    i++   
    start+= oneDay   
  }
  return i 
}

export default class BrandView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            brand1:{
                "ec_platform":"1",
                "ec_appKey":sessionStorage.getItem('appkey'),
                "ec_ranges_start":timeToMs(lMonthY+' 00:00:00'),
                "ec_ranges_end":timeToMs(yesterday+' 23:59:59'),
                "ec_app_version":"all",
                "ec_tab":"active_user",
                "tranTime":"30",
                "ec_brands":"top5"
            },
            brand2:{
                "ec_platform":"1",
                "ec_appKey":sessionStorage.getItem('appkey'),
                "ec_ranges_start":timeToMs(yesterday+' 00:00:00'),
                "ec_ranges_end":timeToMs(yesterday+' 23:59:59') + 1000,
                "ec_app_version":"all"
            },
            current:"1"
        }
    }
    componentWillMount(){
        const { brand ,brandTable ,getVersionList} = this.props
        NProgress.start()
        brand(this.state.brand1,this.state.brand1.ec_tab,() => {
            NProgress.done()
        }, () => {
            NProgress.done()
        })
        brandTable(this.state.brand2,this.state.brand1.ec_tab,() => {
            NProgress.done()
        }, () => {
            NProgress.done()
        })
    }
    handleClick(e){
        const { brand } = this.props
        const childs = e.currentTarget.parentNode.childNodes
        for(let i = 0; i < childs.length; i++){
          childs[i].classList.remove('active')
        }
        e.currentTarget.classList.add('active')
        let sta = e.currentTarget.getAttribute('data-value')
        console.log(sta)
        sta ? sta = sta : sta = 'active_user'
        this.setState({brand1:{ "ec_platform":this.state.brand1.ec_platform,
                "ec_appKey":this.state.brand1.ec_appKey,
                "ec_ranges_start":this.state.brand1.ec_ranges_start,
                "ec_ranges_end":this.state.brand1.ec_ranges_end,
                "ec_app_version":this.state.brand1.ec_app_version,
                "ec_tab":sta,
                "tranTime":this.state.brand1.tranTime,
                "ec_brands":this.state.brand1.ec_brands}},
                    () => { 
                        brand(this.state.brand1,this.state.brand1.ec_tab,() => {
                            NProgress.done()
                        }, () => {
                            NProgress.done()
                        })
                    }
        )             
    }
    getOtion(brandArr,dateArr,series) {
        console.log(series)
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                bottom: true,
                data: brandArr
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'solid'
                    }
                },
                data: dateArr
            }],
            yAxis: [{
                type: 'value'
            }],
            series: series
        }
        return option;
    }
    handleProvinceChange(e) {
        const { brand } = this.props
        let brandChoise;
        switch(e){
            case 'top5品牌' : 
                brandChoise = 'top5' 
                break
            case 'top10品牌' : 
                brandChoise = 'top10' 
                break
            default:
                brandChoise = 'top5' 
        }
        console.log(brandChoise)
        this.setState({brand1:{ "ec_platform":this.state.brand1.ec_platform,
                "ec_appKey":this.state.brand1.ec_appKey,
                "ec_ranges_start":this.state.brand1.ec_ranges_start,
                "ec_ranges_end":this.state.brand1.ec_ranges_end,
                "ec_app_version":this.state.brand1.ec_app_version,
                "ec_tab":this.state.brand1.ec_tab,
                "tranTime":this.state.brand1.tranTime,
                "ec_brands":brandChoise}},() => {
                    brand(this.state.brand1,this.state.brand1.ec_tab,() => {
                        NProgress.done()
                    }, () => {
                        NProgress.done()
                    })
                }) 
    }       
    handleChange1(date,dateString){
        let tranTime  = getTranstime(timeToMs(dateString+' 00:00:00'),this.state.brand1.ec_ranges_end)
        const { brand } = this.props
        this.setState({brand1:{ "ec_platform":this.state.brand1.ec_platform,
                "ec_appKey":this.state.brand1.ec_appKey,
                "ec_ranges_start":timeToMs(dateString+' 00:00:00'),
                "ec_ranges_end":this.state.brand1.ec_ranges_end,
                "ec_app_version":this.state.brand1.ec_app_version,
                "ec_tab":this.state.brand1.ec_tab,
                "tranTime":tranTime,
                "ec_brands":this.state.brand1.ec_brands}},() => {
                    brand(this.state.brand1,this.state.brand1.ec_tab,() => {
                        NProgress.done()
                    }, () => {
                        NProgress.done()
                    })
                })             
    }
    handleChange2(date,dateString){
        let tranTime  = getTranstime(this.state.brand1.ec_ranges_start,timeToMs(dateString+' 23:59:59'))
        const { brand } = this.props
        this.setState({brand1:{ "ec_platform":this.state.brand1.ec_platform,
                "ec_appKey":this.state.brand1.ec_appKey,
                "ec_ranges_start":this.state.brand1.ec_ranges_start,
                "ec_ranges_end":timeToMs(dateString+' 23:59:59'),
                "ec_app_version":this.state.brand1.ec_app_version,
                "ec_tab":this.state.brand1.ec_tab,
                "tranTime":tranTime,
                "ec_brands":this.state.brand1.ec_brands}},() => {
                    brand(this.state.brand1,this.state.brand1.ec_tab,() => {
                        NProgress.done()
                    }, () => {
                        NProgress.done()
                    })
                })
    }
    handleChange3(date,dateString){
        const { brandTable } = this.props
        this.setState({brand2:{
                "ec_platform":this.state.brand2.ec_platform,
                "ec_appKey":this.state.brand2.ec_appKey,
                "ec_ranges_start":timeToMs(dateString+' 00:00:00'),
                "ec_ranges_end":timeToMs(dateString+' 23:59:59') + 1000,
                "ec_app_version":this.state.brand2.ec_app_version
            }},() => {
                    brandTable(this.state.brand2,this.state.brand1.ec_tab,() => {
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
        const { brand,brandTable } =this.props
        this.setState({brand1:{ "ec_platform":num,
            "ec_appKey":this.state.brand1.ec_appKey,
            "ec_ranges_start":this.state.brand1.ec_ranges_start,
            "ec_ranges_end":this.state.brand1.ec_ranges_end,
            "ec_app_version":this.state.brand1.ec_app_version,
            "ec_tab":this.state.brand1.ec_tab,
            "tranTime":this.state.brand1.tranTime,
            "ec_brands":this.state.brand1.ec_brands}},() => {
                brand(this.state.brand1,this.state.brand1.ec_tab,() => {
                    NProgress.done()
                }, () => {
                    NProgress.done()
                })
        })
        this.setState({brand2:{
                "ec_platform":num,
                "ec_appKey":this.state.brand2.ec_appKey,
                "ec_ranges_start":this.state.brand2.ec_ranges_start,
                "ec_ranges_end":this.state.brand2.ec_ranges_end,
                "ec_app_version":this.state.brand2.ec_app_version
            }},() => {
                    brandTable(this.state.brand2,this.state.brand1.ec_tab,() => {
                        NProgress.done()
                    }, () => {
                        NProgress.done()
                    })
                }) 
    }
    render() {
        const { dataTable,brandArr,dateArr,series } = this.props
        return (
            <div className="brand">
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
							<h4>品牌分布</h4>
						</div>
						<div className="verb verw">
						    <DatePicker size="default" defaultValue={moment(lMonthY, 'YYYY-MM-DD')} onChange={(date,dateString)=>this.handleChange1(date,dateString)}/>
                            {`  至  `}
                            <DatePicker size="default" defaultValue={moment(yesterday, 'YYYY-MM-DD')} onChange={(date,dateString)=>this.handleChange2(date,dateString)}  disabledDate={ (current) => {return current && current.valueOf() > Date.now()} }/>
						</div>
					</div>
					<div className="mid">
						<div className="row1">
							<ul>
								<li style={{width:"20%"}} className="active" onClick={ e => this.handleClick(e)} data-value="active_user">活跃用户</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick(e)} data-value="new_user">新增用户</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick(e)} data-value="login_user">登录会员</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick(e)} data-value="avg_start_count">人均启动次数</li>
								<li style={{width:"20%"}} onClick={ e => this.handleClick(e)} data-value="avg_time">次均使用时长(秒)</li>
							</ul>
						</div>
						<div className="row2">
							<div className="r1">趋势图</div>
							<div className="r2">
								<Select defaultValue="top5品牌" style={{ width: 200 }} onChange={ e => this.handleProvinceChange(e)}>
							      <Option value="top5品牌">top5品牌</Option>
							      <Option value="top10品牌">top10品牌</Option>
							    </Select>
							</div>
						</div>
						<div className="row3">
							<ReactEcharts
	                        option={this.getOtion(brandArr,dateArr,series)} 
	                        style={{height: '350px', width: '100%'}}
                            notMerge={true} 
	                        className='react_for_echarts' 
                            ref='react_for_echarts'
                            onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
                            />
						</div>
					</div>
					<div className="bottom">
						<div className="row1">
							<div className="l1">数据表</div>
							<div className="l2">
								<DatePicker defaultValue={moment(yesterday, 'YYYY-MM-DD')}   disabledDate={ (current) => {return current && current.valueOf() > Date.now()} } onChange={(date,dateString)=>this.handleChange3(date,dateString)}/>
							</div>
							<div className="l3">
								<Button>导出</Button>
							</div>
						</div>
						<div className="row2">
							<Table columns={columns} pagination={false} className='tableContent' dataSource={dataTable} onChange={this.onChange} key="tableContent"/>
						</div>
                        <div className="tableFooter"></div>
					</div>
				</div>
        )
    }
}