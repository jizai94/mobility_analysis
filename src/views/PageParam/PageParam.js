import React, { Component } from 'react'
import { Link } from 'react-router'
import './pageParam.scss'
import { Button, Icon, Select, Input, DatePicker, Table, message, Tooltip } from 'antd'
import moment from 'moment'
import ReactEcharts from 'echarts-for-react'
import { getOption5 } from '../../option/todayDetails'
const { Option, OptGroup } = Select;
const Search = Input.Search;

const data = [{
	key: '1',
	date: '2017-04-15',
	visitAccount: '1167',
	activeUser: '42',
	standTime: '1',
	standRate: '1.64%',
	outRate: '3.60%'
}, {
	key: '2',
	date: '2017-04-16',
	visitAccount: '2413',
	activeUser: '41',
	standTime: '7.7',
	standRate: '26.50%',
	outRate: '30.61%'
}, {
	key: '3',
	date: '2017-04-17',
	visitAccount: '875',
	activeUser: '35',
	standTime: '3.75',
	standRate: '4.61%',
	outRate: '21.69%'
}, {
	key: '4',
	date: '2017-04-18',
	visitAccount: '951',
	activeUser: '10',
	standTime: '21',
	standRate: '27.46%',
	outRate: '12.18%'
}, {
	key: '5',
	date: '2017-04-19',
	visitAccount: '418',
	activeUser: '9',
	standTime: '2.65',
	standRate: '1.65%',
	outRate: '2.42%'
}, {
	key: '6',
	date: '2017-04-20',
	visitAccount: '1167',
	activeUser: '42',
	standTime: '1',
	standRate: '1.64%',
	outRate: '3.60%'
}, {
	key: '7',
	date: '2017-04-21',
	visitAccount: '2413',
	activeUser: '41',
	standTime: '7.7',
	standRate: '26.50%',
	outRate: '30.61%'
}, {
	key: '8',
	date: '2017-04-22',
	visitAccount: '875',
	activeUser: '35',
	standTime: '3.75',
	standRate: '4.61%',
	outRate: '21.69%'
}, {
	key: '9',
	date: '2017-04-23',
	visitAccount: '951',
	activeUser: '10',
	standTime: '21',
	standRate: '27.46%',
	outRate: '12.18%'
}, {
	key: '10',
	date: '2017-04-24',
	visitAccount: '418',
	activeUser: '9',
	standTime: '2.65',
	standRate: '1.65%',
	outRate: '2.42%',
}, {
	key: '11',
	date: '2017-04-25',
	visitAccount: '1167',
	activeUser: '42',
	standTime: '1',
	standRate: '1.64%',
	outRate: '3.60%',
}, {
	key: '12',
	date: '2017-04-26',
	visitAccount: '2413',
	activeUser: '41',
	standTime: '7.7',
	standRate: '26.50%',
	outRate: '30.61%',
}, {
	key: '13',
	date: '2017-04-27',
	visitAccount: '875',
	activeUser: '35',
	standTime: '3.75',
	standRate: '4.61%',
	outRate: '21.69%'
}, {
	key: '14',
	date: '2017-04-28',
	visitAccount: '951',
	activeUser: '10',
	standTime: '21',
	standRate: '27.46%',
	outRate: '12.18%'
}, {
	key: '15',
	date: '2017-04-29',
	visitAccount: '418',
	activeUser: '9',
	standTime: '2.65',
	standRate: '1.65%',
	outRate: '2.42%'
},{
	key: '16',
	date: '2017-04-30',
	visitAccount: '418',
	activeUser: '9',
	standTime: '2.65',
	standRate: '1.65%',
	outRate: '2.42%'
},{
	key: '17',
	date: '2017-05-01',
	visitAccount: '418',
	activeUser: '9',
	standTime: '2.65',
	standRate: '1.65%',
	outRate: '2.42%'
},{
	key: '18',
	date: '2017-05-02',
	visitAccount: '418',
	activeUser: '9',
	standTime: '2.65',
	standRate: '1.65%',
	outRate: '2.42%'
}];

export default class PageParam extends Component {
	constructor(props) {
		super(props)
		this.state = {
			current: 1,
			platform: '1',
			versionList: JSON.parse(sessionStorage.getItem('versionList'))
		}
	}
	handleClick(e) {
		const childs = e.currentTarget.parentNode.parentNode.childNodes
		for (let i = 0; i < childs.length; i++) {
			childs[i].classList.remove('active')
		}
		e.currentTarget.parentNode.classList.add('active')
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
		const date = new Date(),
			year = date.getFullYear(),
			month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
			lastMonth = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
			day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
			preday = (date.getDate() - 1) < 10 ? '0' + (date.getDate() - 1) : (date.getDate() - 1),
			lMonth = `${year}-${lastMonth}-${day}`,
			yesterday = `${year}-${month}-${preday}`;
		const columns = [{
			title: '统计日期',
			dataIndex: 'date',
			sorter: (a, b) => a.date.length - b.date.length
		}, {
			title: '访问次数',
			dataIndex: 'visitAccount',
			sorter: (a, b) => a.visitAccount - b.visitAccount
		}, {
			title: '活跃用户数',
			dataIndex: 'activeUser',
			sorter: (a, b) => a.activeUser - b.activeUser
		}, {
			title: '次均停留时长(秒)',
			dataIndex: 'standTime',
			sorter: (a, b) => a.standTime - b.standTime
		}, {
			title: '停留时间占比',
			dataIndex: 'standRate',
			sorter: (a, b) => a.standRate - b.standRate
		}, {
			title: '退出率',
			dataIndex: 'outRate',
			sorter: (a, b) => a.outRate - b.outRate
		}];
		return (
			<div className="pageParam">
				<div className="app-header">
          <header>
            <nav className="device-type clearfix">
              <h3>设备类型</h3>
              <ul className="clearfix">
                <li className={this.getClass(1)} onClick={e=>this.handleClickNum(1)}><a>iPhone</a></li>
                <li className={this.getClass(2)} onClick={e=>this.handleClickNum(2)}><a>Android</a></li>
              </ul>
            </nav>
            <Link to="applist/applist.html" className="back"><Button type="primary" ghost>返回APP列表</Button></Link>
          </header>
        </div>
				<div className="row1">
					<div>
						<h5 className="title">
							页面详情
							<Tooltip placement="right" title="页面详情">
        						<Icon type="question-circle" />
      						</Tooltip>
      						<Link to="home/pagePath.html" style={{marginLeft: 10}}>返回页面路径分析</Link>
						</h5>
						<div>
  							<DatePicker size="default" defaultValue={moment(lMonth, 'YYYY-MM-DD')} />
  							{`  至  `}
  							<DatePicker size="default" defaultValue={moment(yesterday, 'YYYY-MM-DD')} />
  						</div>
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
  						<Select
    						showSearch
    						style={{ float: 'right', marginRight: 20 }}
    						defaultValue="Welcome"
  						>
    						<Option value="Welcome">Welcome</Option>
    						<Option value="Main">Main</Option>
    						<Option value="PunchCard">PunchCard</Option>
    						<Option value="Web">Web</Option>
    						<Option value="MyCenter">MyCenter</Option>
  						</Select>
					</div>
				</div>
				<div className="row2">
					<ul className="nav">
						<li>
							<a>
								<span className="fz16">日均访问次数</span><br/>
								<span className="fz24">59</span><br/>
								<span className="fz12">环比：</span><span className="fz12">-4.84%</span>
								<Icon type="arrow-down" className="arrow-down"/><br/>
							</a>
						</li>
						<li>
							<a>
								<span className="fz16">日均活跃用户数</span><br/>
								<span className="fz24">42</span><br/>
								<span className="fz12">环比：</span><span className="fz12">0</span>
							</a>
						</li>
						<li>
							<a>
								<span className="fz16">次均停留时长(秒)</span><br/>
								<span className="fz24">1</span><br/>
								<span className="fz12">环比：</span><span className="fz12">0</span>
							</a>
						</li>
						<li>
							<a>
								<span className="fz16">退出率</span><br/>
								<span className="fz24">3.79%</span><br/>
								<span className="fz12">环比：</span><span className="fz12">23.86%</span>
								<Icon type="arrow-up" className="arrow-up"/><br/>
							</a>
						</li>
					</ul>
				</div>
				<div className="row3">
					<ul className="nav">
						<li className="active">
							<a className="fz12" onClick={e => this.handleClick(e)}>趋势分析</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick(e)}>来源分析</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick(e)}>去向分析</a>
						</li>
						<li>
							<a className="fz12" onClick={e => this.handleClick(e)}>参数分析</a>
						</li>
					</ul>
				</div>
				<div className="row4">
					<div className="menuChart">
						<ul>
							<li className="active">
								<a>访问次数</a>
							</li>|
							<li>
								<a>活跃用户数</a>
							</li>|
							<li>
								<a>次均停留时间(秒)</a>
							</li>|
							<li>
								<a>退出率</a>
							</li>
						</ul>
						<ReactEcharts
            	option={getOption5()} 
            	style={{height: '450px', width: '100%', margin: 0 }} 
            	className='react_for_echarts' 
            	onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
            />
					</div>
					<div className="tableTitle">
						<div className="tableTitleText">数据表</div>
						<div className="rightBtn">
							<Button>导出</Button>
						</div>
					</div>
					<Table
    					columns={columns}
    					dataSource={data}
    					className="tableContent"
    					onChange={this.handleChange}
 					/>
				</div>
			</div>
		)
	}
}