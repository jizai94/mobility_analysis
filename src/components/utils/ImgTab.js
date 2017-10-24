import React, {Component} from 'react'
import './main.scss'
import getTime from 'UTILS/getTime'

const TabItem = ({text, mark, reqDate, style, click}) => {
  const handleClick = (e) => {
    e.preventDefault()
    const childs = e.currentTarget.parentNode.childNodes
    for (let i = 0; i < childs.length; i++) {
      childs[i].classList.remove('active')
    }
    e.currentTarget.classList.add('active')

    let time = {}
    switch (mark) {
      case 'net-day':
        time = getTime('day')
        break
      case 'net-week':
        time = getTime('week')
        break
      case 'net-month':
        time = getTime('month')
        break
    }
    click(time)
  }
  return (<a href="#" onClick={handleClick} className={style}>{text}</a>)
}

const TabBar = ({tabInfo, click, reqDate}) => {
    let test = tabInfo
    // 用于存放菜单选项
    let tabs = []

    for (let i=0; i<test.length; i++) {
        if (i === 0) {
            tabs.push(<TabItem key={i} click={click} mark={test[i].mark} reqDate={reqDate} text={test[i].text} style="active" />)
        } else if (i === test.length - 1) {
            tabs.push(<TabItem key={i} click={click} mark={test[i].mark} reqDate={reqDate} text={test[i].text} style="last" />)
        } else {
            tabs.push(<TabItem key={i} click={click} mark={test[i].mark} reqDate={reqDate} text={test[i].text} />)
        }
    }

    return (
        <div className="tab-bar">
            <div className="tabs">
                {tabs}
            </div>
            <div className="line"></div>
        </div>
    )
}

class ImgTab extends Component {

    render() {
        const { tabInfo, click, reqDate } = this.props

        return (
            <TabBar tabInfo={tabInfo} click={click} reqDate={reqDate} />
        )
    }
}

export default ImgTab