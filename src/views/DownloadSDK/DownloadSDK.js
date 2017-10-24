import React, { Component } from 'react'
import { Link } from 'react-router'
import { getCookie, setCookie } from 'UTIL/cookie'
import { Modal, Button, Input, Select, Checkbox, Tooltip, Icon, message } from 'antd'
import './downloadSDK.scss'

export default class DownloadSDK extends Component {
	constructor(props){
		super(props)
		this.state = {
			platform: '1'
		}
	}
	componentWillMount() {
		const { downloadSDK } = this.props
		downloadSDK(this.state, () => {
			message.success('请求成功')
		}, () => {
			message.error('请求失败')
		})
	}
	componentDidMount() {

	}
	handleClick(e) {
		let platform = e.currentTarget.getAttribute('data-value')
		const { downloadSDK } = this.props
		downloadSDK({
			...this.state,
			platform: platform
		}, () => {
			message.success('请求成功')
		}, () => {
			message.error('请求失败')
		})
	}
	render() {
		const { sdkDownload } = this.props.state
		const iCIFID = getCookie('iCIFID')
		return (
			<div className="downloadSDK">
				<Button type="primary" icon="download" data-value='1' onClick={(e) => {this.handleClick(e)}}>下载iOS版</Button>
				<Button type="primary" icon="download" data-value='2' onClick={(e) => {this.handleClick(e)}}>下载Android版</Button>
				<div className="title">
					<h5 className="fz14">OneSDK 打包记录 <span className="fz12">（最近五次）</span></h5>
				</div>
				<table>
					<tbody>
						{
							sdkDownload.map((item, index) => {
								let downloadUrl = `${item.downloadUrl.replace('&amp;', '&')}&iCIFID=${iCIFID}`
								return (
									<tr key={ index }>
										<td>{ item.createTime }</td>
										<td>{ item.platform == '1' ? 'iOS' : 'android' }</td>
										<td>{ item.function }</td>
										<td>{ item.packageState == '1' ? '打包完成' : '打包未完成' }</td>
										<td><a href={ downloadUrl }>下载</a></td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		)
	}
}