import React, {Component} from 'react'
import './main.scss'

class MiddleTitle extends Component {

    render() {
        return (
            <div className="middle-title">
                <h5>{this.props.value}</h5>
                {this.props.children}
            </div>
        )
    }
}

export default MiddleTitle