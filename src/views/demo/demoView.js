import React, { Component } from 'react'
import { Form, Button, Table, Modal, Input, message, Tabs, Row, Col } from 'antd'
// const TabPane = Tabs.TabPane;

export default class Demo extends Component {
	constructor(props){
		super(props);
	}
	handleClick(e){
		this.props.demoFun('你点击了按钮')
	}
	render() {
		return (
			<Button onClick={(e) => this.handleClick(e)}>{this.props.mess}</Button>
		)
	}
}