import React, { Component } from 'react'
import { Link } from 'react-router'
import './pagePath.scss'
import { Button, Icon, Select, Input, DatePicker, Table, message } from 'antd'
import moment from 'moment'
import ReactEcharts from 'echarts-for-react'
import { getOption3 } from '../../option/todayDetails'
const {	Option,	OptGroup } = Select;
import { getCookie, setCookie } from 'UTIL/cookie'
const Search = Input.Search;

const data = [{
	key: '1',
	name: 'Welcome',
	visitAccount: '1167',
	activeUser: '42',
	standTime: '1',
	standRate: '1.64%',
	outRate: '3.60%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}, {
	key: '2',
	name: 'Main',
	visitAccount: '2413',
	activeUser: '41',
	standTime: '7.7',
	standRate: '26.50%',
	outRate: '30.61%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}, {
	key: '3',
	name: 'PunchCard',
	visitAccount: '875',
	activeUser: '35',
	standTime: '3.75',
	standRate: '4.61%',
	outRate: '21.69%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}, {
	key: '4',
	name: 'Web',
	visitAccount: '951',
	activeUser: '10',
	standTime: '21',
	standRate: '27.46%',
	outRate: '12.18%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}, {
	key: '5',
	name: 'MyCenter',
	visitAccount: '418',
	activeUser: '9',
	standTime: '2.65',
	standRate: '1.65%',
	outRate: '2.42%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
},{
	key: '6',
	name: 'Welcome',
	visitAccount: '1167',
	activeUser: '42',
	standTime: '1',
	standRate: '1.64%',
	outRate: '3.60%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}, {
	key: '7',
	name: 'Main',
	visitAccount: '2413',
	activeUser: '41',
	standTime: '7.7',
	standRate: '26.50%',
	outRate: '30.61%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}, {
	key: '8',
	name: 'PunchCard',
	visitAccount: '875',
	activeUser: '35',
	standTime: '3.75',
	standRate: '4.61%',
	outRate: '21.69%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}, {
	key: '9',
	name: 'Web',
	visitAccount: '951',
	activeUser: '10',
	standTime: '21',
	standRate: '27.46%',
	outRate: '12.18%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}, {
	key: '10',
	name: 'MyCenter',
	visitAccount: '418',
	activeUser: '9',
	standTime: '2.65',
	standRate: '1.65%',
	outRate: '2.42%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
},{
	key: '11',
	name: 'Welcome',
	visitAccount: '1167',
	activeUser: '42',
	standTime: '1',
	standRate: '1.64%',
	outRate: '3.60%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}, {
	key: '12',
	name: 'Main',
	visitAccount: '2413',
	activeUser: '41',
	standTime: '7.7',
	standRate: '26.50%',
	outRate: '30.61%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}, {
	key: '13',
	name: 'PunchCard',
	visitAccount: '875',
	activeUser: '35',
	standTime: '3.75',
	standRate: '4.61%',
	outRate: '21.69%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}, {
	key: '14',
	name: 'Web',
	visitAccount: '951',
	activeUser: '10',
	standTime: '21',
	standRate: '27.46%',
	outRate: '12.18%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}, {
	key: '15',
	name: 'MyCenter',
	visitAccount: '418',
	activeUser: '9',
	standTime: '2.65',
	standRate: '1.65%',
	outRate: '2.42%',
	operator: <Link to="home/pageParam.html">查看详情</Link>,
}];

export default class PagePath extends Component {
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
	handleChange(pagination, filters, sorter) {
		console.log('Various parameters', pagination, sorter);
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
			title: '页面名称',
			dataIndex: 'name',
			sorter: (a, b) => a.name.length - b.name.length
		}, {
			title: '访问次数',
			dataIndex: 'visitAccount',
			sorter: (a, b) => a.visitAccount - b.visitAccount
		}, {
			title: '日均活跃用户数',
			dataIndex: 'activeUser',
			sorter: (a, b) => a.activeUser - b.activeUser
		}, {
			title: '平均每次停留时长(秒)',
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
		}, {
			title: '操作',
			dataIndex: 'operator'
		}];
		return (
			<div className="pagePath">
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
				<div className="row1">
					<div>
						<h5 className="title">
							页面访问路径
						</h5>
						<div>
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
  						<div>
  							<DatePicker size="default" defaultValue={moment(lMonth, 'YYYY-MM-DD')} />
  							{`  至  `}
  							<DatePicker size="default" defaultValue={moment(yesterday, 'YYYY-MM-DD')} />
  						</div>
					</div>
				</div>
				<div className="row2">
					<div className="tableTitle">
						<div className="tableTitleText">数据表</div>
						<div className="rightBtn">
							<Search
  							  placeholder="输入关键字进行搜索..."
  							  style={{ width: 200, marginRight: 15 }}
  							  onSearch={ value => message.info(`您输入的值为：${value}`) }
  							/>
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