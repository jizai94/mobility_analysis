import React, { Component } from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'

export default class MainView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: true
    }
  } 

  componentWillMount() {
    /*this.props.initUserForm()
    this.props.initUserMenu(() => {
      this.setState({
        loaded: true
      })
    })*/
  }

  render() {
    const { router, children } = this.props

    const view = (
      <div className="app-main">
        <Sidebar router={router}/>
        <div className="app-content" style={{top: 0}}>
          <div className="app-page-wrapper">
            {children}
          </div>
        </div>
      </div>        
    )

    // 若菜单未准备好，则放弃渲染，以免报错
    return this.state.loaded ? view : null
  }
}