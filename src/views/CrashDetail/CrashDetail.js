/**
 * Created by Alex on 2017/4/30.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import { DatePicker, Select, Button, Input } from 'antd'
import { getCookie, setCookie } from 'UTIL/cookie'
import './CrashDetail.scss'

const Search = Input.Search

class CrashDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      current: 1,
      platform: '1',
      versionList: JSON.parse(sessionStorage.getItem('versionList'))
    }
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

  render () {
    return (
      <div className='crashDetail'>
        <div className="app-header" style={{padding: '0 25px'}}>
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
        <div className='header'>
          <h3>Crash详情</h3>
          <Select defaultValue='全部版本' style={{ width: 120, float: 'right' }}>
            <Option value='全部版本'>全部版本</Option>
            <Option value='6.8'>6.8</Option>
            <Option value='6.7'>6.7</Option>
          </Select>
          <DatePicker style={{ float: 'right', marginRight: 30 }} />
        </div>
        <div className='crash-table'>
          <div className='crash-table-header'>
            <h4>Crash列表</h4>
            <Button style={{width: 80, float: 'right', margin: '6px 10px 0 0'}}>导出</Button>
            <Button style={{float: 'right', margin: '6px 10px 0 0'}}>查询</Button>
            <Search placeholder='输入关键字进行检索...' style={{ width: 200, float: 'right', margin: '6px 10px 0 0' }} />
          </div>
          <div id='crash-table'>
            <section className='table-header'>
              <div className='long'>
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
                <p>操作</p>
              </div>
            </section>
            <section className='no-find'>
              <p>没有找到匹配的记录</p>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default CrashDetail
