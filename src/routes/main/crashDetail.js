/**
 * Created by Alex on 2017/5/3.
 */
import { injectReducer } from 'STORE/reducers'

export default store => ({
    path : 'crashDetail.html',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const CrashDetailView = require('VIEW/CrashDetail').default
            // const reducer = require('REDUCER/demo').default
            // injectReducer(store, { key: 'todayDetails', reducer })
            cb(null, CrashDetailView)
        }, 'CrashDetailView')
    }
})