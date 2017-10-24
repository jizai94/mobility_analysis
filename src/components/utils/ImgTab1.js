/**
 * Created by Alex on 2017/5/12.
 */
import React, {Component} from 'react'
import './main.scss'

const TabItem = ({text, style, mark, click}) => {
  const handleClick = (e) => {
    e.preventDefault()
    const childs = e.currentTarget.parentNode.childNodes
    for (let i = 0; i < childs.length; i++) {
      childs[i].classList.remove('active')
    }
    e.currentTarget.classList.add('active')
    click(mark)
  }
  return (<a href='#' onClick={handleClick} className={style}>{text}</a>)
}

const TabBar = ({tabInfo, click}) => {
  let test = tabInfo
  // 用于存放菜单选项
  let tabs = []

  for (let i = 0; i < test.length; i++) {
    if (i === 0) {
      tabs.push(<TabItem key={i} click={click} mark={test[i].mark} text={test[i].text} style='active' />)
    } else if (i === test.length - 1) {
      tabs.push(<TabItem key={i} click={click} mark={test[i].mark} text={test[i].text} style='last' />)
    } else {
      tabs.push(<TabItem key={i} click={click} mark={test[i].mark} text={test[i].text} />)
    }
  }

  return (
    <div className='tab-bar'>
      <div className='tabs'>
        {tabs}
      </div>
      <div className='line' />
    </div>
  )
}

class ImgTab extends Component {

  render () {
    const { tabInfo, click } = this.props

    return (
      <TabBar tabInfo={tabInfo} click={click} />
    )
  }
}

export default ImgTab
