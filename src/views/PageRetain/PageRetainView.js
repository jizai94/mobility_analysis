import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import { Table, Row, Col, Button, Modal, DatePicker, Dropdown, Icon, message, Select, Pagination } from 'antd'
import ReactEcharts from 'echarts-for-react'
import './PageRetainView.scss'
import { getOption } from '../../option/pageRetain.js'
import { getCookie, setCookie } from 'UTIL/cookie'
const {	Option,	OptGroup } = Select;

export default class PageRetain extends Component {
	constructor(props){
		super(props)
		this.state = {
			current: 1,
      platform: '1',
      versionList: JSON.parse(sessionStorage.getItem('versionList'))
		}
	}
	handleClick(e){
		const childs = e.currentTarget.parentNode.childNodes;
		for(let i=0; i < childs.length; i++){
			childs[i].classList.remove('active');
		}
		e.currentTarget.classList.add('active');
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

	render(){
		const date = new Date(),
			  year = date.getFullYear(),
			  month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
			  lastMonth = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
			  day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
			  preday = (date.getDate() - 1) < 10 ? '0' + (date.getDate() - 1) : (date.getDate() - 1),
			  lMonth = `${year}-${lastMonth}-${day}`,
			  yesterday = `${year}-${month}-${preday}`;
		const columns = [{
	      title: '首次使用日期',
	      dataIndex: 'firstUserTime',
	      key: 'firstUserTime',
	      sorter: (a, b) => a.firstUserTime - b.firstUserTime
	    }, {
	      title: '活跃用户数',
	      dataIndex: 'activeUserNum',
	      key: 'flowId',
	      sorter: (a, b) => a.activeUserNum - b.activeUserNum
	    }, {
	      title: '+1',
	      dataIndex: 'plus1',
	      key: 'plus1',
	      sorter: (a, b) => a.plus1 - b.plus1
	    }, {
	      title: '+2',
	      dataIndex: 'plus2',
	      key: 'plus2',
	      sorter: (a, b) => a.plus2 - b.plus2
	    }, {
	      title: '+3',
	      dataIndex: 'plus3',
	      key: 'plus3',
	      sorter: (a, b) => a.plus3 - b.plus3
	    }, {
	      title: '+4',
	      dataIndex: 'plus4',
	      key: 'plus4',
	      sorter: (a, b) => a.plus4 - b.plus4
	    }, {
	      title: '+5',
	      dataIndex: 'plus5',
	      key: 'plus5',
	      sorter: (a, b) => a.plus5 - b.plus5
	    }, {
	      title: '+6',
	      dataIndex: 'plus6',
	      key: 'plus6',
	      sorter: (a, b) => a.plus6 - b.plus6
	    }, {
	      title: '+7',
	      dataIndex: 'plus7',
	      key: 'plus7',
	      sorter: (a, b) => a.plus7 - b.plus7
	    }, {
	      title: '+15',
	      dataIndex: 'plus8',
	      key: 'plus15',
	      sorter: (a, b) => a.plus8 - b.plus8
	    }];
	    const data = [{
	    	firstUserTime: '05/02',
			activeUserNum: '3',
			plus1: '0%',
			plus2: '0%',
			plus3: '0%',
			plus4: '0%',
			plus5: '0%',
			plus6: '0%',
			plus7: '0%',
			plus15: '0%'
	    }];
		return (
			<div className='layout-container'>
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
				<Row className='header-container'>
      				<Col span={6} className='fix-left'><h5>页面留存</h5><Icon type="question-circle" /></Col>
			      	<Col span={6}></Col>
			      	<Col span={8}>
						<div>
  							<DatePicker size="default" defaultValue={moment(lMonth, 'YYYY-MM-DD')} />
  							{`  至  `}
  							<DatePicker size="default" defaultValue={moment(yesterday, 'YYYY-MM-DD')} />
  						</div>
			      	</Col>
			      	<Col span={4}>
			      		<Select
    						showSearch
    						style={{ width: 150, float: 'right' }}
    						defaultValue="all"
  						>
    						<Option value="all">全部版本</Option>
    						<Option value="6.8">6.8</Option>
    						<Option value="6.7">6.7</Option>
  						</Select>
			    	</Col>
    			</Row>
    			<Row className='header-container'>
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
  					<Button style={{marginLeft:'30px'}}>页面设置</Button>
    			</Row>
    			<Row className='header-container'>
					<Col span={18}>留存图表</Col>
					<Col span={6}>
						<Select
    						showSearch
    						style={{ width: 150, float: 'right' }}
    						defaultValue="all"
  						>
    						<Option value="all">按天展示</Option>
    						<Option value="6.8">按周展示</Option>
    						<Option value="6.7">按月展示</Option>
  						</Select>
					</Col>
    			</Row>
    			<Row>
	    			<div className='table-title-bar'>
	    				<div className='table-title-text'>数据表</div>
	    				<div className='outputBtn'><Button onClick={this.outputClick}>导出</Button></div>
	    			</div>
					<Table
    					columns={columns}
    					dataSource={data}
    					className="tableContent"
    					onChange={this.handleChange}
    					style={{ border:'1px solid #e9e9e9' }}
 					/>
    			</Row>
    			<Row style={{marginBottom:'-1px',position: 'static'}}>
    				<ul className='nav-bar'>
	    				<li onClick={e => this.handleClick(e)} className='active'><a>次日留存率</a></li>
	    				<li onClick={e => this.handleClick(e)} className=''><a>7日留存率</a></li>
	    				<li onClick={e => this.handleClick(e)} className='last-li'><a>15日留存率</a></li>
    				</ul>
    			</Row>
    			<Row>
	    			<div style={{borderTop:'1px solid #e9e9e9'}}>
	    				<ReactEcharts
                        	option={getOption()} 
                        	style={{height: '450px', width: '100%'}} 
                        	className='react_for_echarts' 
                        	onChartReady = {chart => {setTimeout(function(){chart.resize()},0)}}
                    />
	    			</div>
    			</Row>
			</div>
		)
	}
}