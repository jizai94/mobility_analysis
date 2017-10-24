import React, {Component} from 'react'
import './main.scss'

class TopTitle extends Component {

    render() {
        return (
            <div className="top-title">
                <h3>{this.props.value}</h3>
                {this.props.children}
            </div>
        )
    }
}

export default TopTitle