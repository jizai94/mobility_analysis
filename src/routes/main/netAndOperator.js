/**
 * Created by Alex on 2017/5/3.
 */
import { injectReducer } from 'STORE/reducers'

export default store => ({
    path : 'netAndOperator.html',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const NetAndOperatorView = require('VIEW/NetAndOperator').default
            const reducer = require('REDUCER/netAndOperator').default
            injectReducer(store, { key: 'netAndOperator', reducer })
            cb(null, NetAndOperatorView)
        }, 'NetAndOperatorView')
    }
})