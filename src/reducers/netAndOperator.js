import NProgress from 'nprogress'
import { netAndOperatorAction } from './request/netAndOperator'

const getData = (arr) => {
  let data = {
    all: [],
    title: []
  }
  for (let i = 0; i < arr.length; i++) {
    if(arr[i].count !== '0.0' || !arr[i].count){
      let {count: value, name} = arr[i]
      data.all.push({value: value, name: name})
      data.title.push(name)
    }
  }
  return data
}

export const netAndOperator = (data, success, fail) => (dispatch, getState) => {
  dispatch(netAndOperatorAction(data)).then(action => {
    //网络数据
    let data0 = action.data.body.netAndCarrier[0].netAndCarrierSub
    //运营商数据
    let data1 = action.data.body.netAndCarrier[1].netAndCarrierSub
    data0 = getData(data0)
    data1 = getData(data1)
    dispatch({
      type:'NET',
      data0,
      data1
    })
  })
}

const timer = () => {
  const oneDay = 1000 * 60 * 60 * 24
  let current = new Date()
  current.setHours(0)
  current.setMinutes(0)
  current.setSeconds(0)
  current.setMilliseconds(0)
  let end = current.getTime()
  return {
    start: end - oneDay,
    end
  }
}
let initObj = timer()

const initialState = {
  data0: {
    all:[],
    title:[]
  },
  data1: {
    all:[],
    title:[]
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NET':
      return {
        ...state,
        data0:action.data0,
        data1:action.data1
      }
    default:
      return state
  }
}
