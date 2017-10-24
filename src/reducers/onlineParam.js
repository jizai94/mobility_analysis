import NProgress from 'nprogress'
import { message } from 'antd'
import md5 from 'md5'
import API from 'CONSTANT/api'
import { selectOnlineParamAction, createOnlineParamAction, updateOnlineParamAction, selectBuriedAction, createBuriedAction, updateBuriedAction, deleteBuriedAction } from './request/onlineParam'

let onlineParamTable = [],
    buriedTable = [],
    chooseOnlineParam = {},
    chooseBuried = {}

export const chooseOnlineParamAction = (id, cb) => (dispatch, getState) => {
    onlineParamTable.forEach((item) => {
        if(id == item.id){
            chooseOnlineParam = item
        }
    })
    cb(chooseOnlineParam)
    /*dispatch({
        type: 'CHOOSE_CHANNEL_ACTION',
        chooseOnlineParam: chooseOnlineParam
    })*/
}

export const chooseBuriedAction = (id, cb) => (dispatch, getState) => {
    buriedTable.forEach((item) => {
        if(id == item.id){
            chooseBuried = item
        }
    })
    cb(chooseBuried)
    /*dispatch({
        type: 'CHOOSE_CHANNEL_ACTION',
        chooseOnlineParam: chooseOnlineParam
    })*/
}

export const selectOnlineParam = (data, success, fail) => (dispatch, getState) => {
  const postData = {
    platform: data.platform
  }
  dispatch(selectOnlineParamAction(postData)).then(action => {
    NProgress.done()
    const dataBody = action.data.body
    console.log(dataBody)
    onlineParamTable = []
    if (dataBody.errorCode == '0') {
      const onlineParam = {
        id: dataBody.id,
        flush_interval: dataBody.flush_interval,
        flush_size: dataBody.flush_size,
        max_cachesize: dataBody.max_cachesize,
        flush_onlywifi: dataBody.flush_onlywifi,
        update_onlywifi: dataBody.update_onlywifi,
        check_eventbinding: dataBody.check_eventbinding,
        configureURL: dataBody.configureURL
      }
      onlineParamTable.push(onlineParam)
      dispatch({
        type: 'SELECT_ONLINE_PARAM_LIST',
        onlineParamTable: onlineParamTable
      })
    }
  })
}

export const createOnlineParam = (data, success, fail) => (dispatch, getState) => {
  const postData = {
    platform: data.platform,
    flush_interval: data.flush_interval,
    flush_size: data.flush_size,
    max_cachesize: data.max_cachesize,
    flush_onlywifi: data.flush_onlywifi,
    update_onlywifi: data.update_onlywifi,
    check_eventbinding: data.check_eventbinding,
    configureURL: data.configureURL
  }
  dispatch(createOnlineParamAction(postData)).then(action => {
    NProgress.done()
    const dataBody = action.data.body
    console.log(dataBody)
    if (dataBody.errorCode == '0') {
      console.log(dataBody)
      if(success) success()
      dispatch(selectOnlineParamAction({platform: data.platform})).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        onlineParamTable = []
        if (dataBody.errorCode == '0') {
          const onlineParam = {
            id: dataBody.id,
            flush_interval: dataBody.flush_interval,
            flush_size: dataBody.flush_size,
            max_cachesize: dataBody.max_cachesize,
            flush_onlywifi: dataBody.flush_onlywifi,
            update_onlywifi: dataBody.update_onlywifi,
            check_eventbinding: dataBody.check_eventbinding,
            configureURL: dataBody.configureURL
          }
          onlineParamTable.push(onlineParam)
          dispatch({
            type: 'SELECT_ONLINE_PARAM_LIST',
            onlineParamTable: onlineParamTable
          })
        }
      })
    } else {
      if(fail) fail()
    }
  })
}

export const updateOnlineParam = (data, success, fail) => (dispatch, getState) => {
  const postData = {
    platform: data.platform,
    id: data.id,
    flush_interval: data.flush_interval,
    flush_size: data.flush_size,
    max_cachesize: data.max_cachesize,
    flush_onlywifi: data.flush_onlywifi,
    update_onlywifi: data.update_onlywifi,
    check_eventbinding: data.check_eventbinding,
    configureURL: data.configureURL
  }
  dispatch(updateOnlineParamAction(postData)).then(action => {
    NProgress.done()
    const dataBody = action.data.body
    console.log(dataBody)
    if (dataBody.errorCode == '0') {
      console.log(dataBody)
      if(success) success()
      dispatch(selectOnlineParamAction({platform: data.platform})).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        onlineParamTable = []
        if (dataBody.errorCode == '0') {
          const onlineParam = {
            id: dataBody.id,
            flush_interval: dataBody.flush_interval,
            flush_size: dataBody.flush_size,
            max_cachesize: dataBody.max_cachesize,
            flush_onlywifi: dataBody.flush_onlywifi,
            update_onlywifi: dataBody.update_onlywifi,
            check_eventbinding: dataBody.check_eventbinding,
            configureURL: dataBody.configureURL
          }
          onlineParamTable.push(onlineParam)
          dispatch({
            type: 'SELECT_ONLINE_PARAM_LIST',
            onlineParamTable: onlineParamTable
          })
        }
      })
    } else {
      if(fail) fail()
    }
  })
}

export const selectBuried = (data, success, fail) => (dispatch, getState) => {
  const postData = {
    platform: data.platform
  }
  dispatch(selectBuriedAction(postData)).then(action => {
    NProgress.done()
    const dataBody = action.data.body
    console.log(dataBody)
    buriedTable = []
    if (dataBody.errorCode == '0') {
      console.log(dataBody.list.length)
      let buriedTableList = {}
      if(dataBody.list.length == '0'){
        buriedTableList = {
          event_type: '',
          event_name: '',
          control_event: '',
          table_delegate: '',
          web_delegate: '',
          path: '',
          id: ''
        }
        buriedTable.push(buriedTableList)
      } else {
        dataBody.list.forEach((item, index, array) => {
          buriedTableList = {
            event_type: item.event_type,
            event_name: item.event_name,
            control_event: item.control_event,
            table_delegate: item.table_delegate,
            web_delegate: item.web_delegate,
            path: item.path,
            id: item.id
          }
          buriedTable.push(buriedTableList)
        })
      }
      dispatch({
        type: 'SELECT_BURIED_LIST',
        buriedTable: buriedTable
      })
    }
  })
}

export const createBuried = (data, success, fail) => (dispatch, getState) => {
  const postData = {
    platform: data.platform,
    event_name: data.event_name,
    event_type: data.event_type,
    table_delegate: data.table_delegate,
    web_delegate: data.web_delegate,
    path: data.path,
    control_event: data.control_event
  }
  dispatch(createBuriedAction(postData)).then(action => {
    NProgress.done()
    const dataBody = action.data.body
    console.log(dataBody)
    if (dataBody.errorCode == '0') {
      console.log(dataBody)
      if (success) success()
      dispatch(selectBuriedAction({platform: data.platform})).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        console.log(dataBody)
        buriedTable = []
        if (dataBody.errorCode == '0') {
          console.log(dataBody.list.length)
          let buriedTableList = {}
          if (dataBody.list.length == '0') {
            buriedTableList = {
              event_type: '',
              event_name: '',
              control_event: '',
              table_delegate: '',
              web_delegate: '',
              path: '',
              id: ''
            }
            buriedTable.push(buriedTableList)
          } else {
            dataBody.list.forEach((item, index, array) => {
              buriedTableList = {
                event_type: item.event_type,
                event_name: item.event_name,
                control_event: item.control_event,
                table_delegate: item.table_delegate,
                web_delegate: item.web_delegate,
                path: item.path,
                id: item.id
              }
              buriedTable.push(buriedTableList)
            })
          }
          dispatch({
            type: 'SELECT_BURIED_LIST',
            buriedTable: buriedTable
          })
        }
      })
    } else {
      if (fail) fail()
    }
  })
}

export const updateBuried = (data, success, fail) => (dispatch, getState) => {
  const postData = {
    id: data.buriedId,
    platform: data.platform,
    event_name: data.event_name,
    event_type: data.event_type,
    table_delegate: data.table_delegate,
    web_delegate: data.web_delegate,
    path: data.path,
    control_event: data.control_event
  }
  dispatch(updateBuriedAction(postData)).then(action => {
    NProgress.done()
    const dataBody = action.data.body
    console.log(dataBody)
    if (dataBody.errorCode == '0') {
      console.log(dataBody)
      if (success) success()
      dispatch(selectBuriedAction({platform: data.platform})).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        console.log(dataBody)
        buriedTable = []
        if (dataBody.errorCode == '0') {
          console.log(dataBody.list.length)
          let buriedTableList = {}
          if (dataBody.list.length == '0') {
            buriedTableList = {
              event_type: '',
              event_name: '',
              control_event: '',
              table_delegate: '',
              web_delegate: '',
              path: '',
              id: ''
            }
            buriedTable.push(buriedTableList)
          } else {
            dataBody.list.forEach((item, index, array) => {
              buriedTableList = {
                event_type: item.event_type,
                event_name: item.event_name,
                control_event: item.control_event,
                table_delegate: item.table_delegate,
                web_delegate: item.web_delegate,
                path: item.path,
                id: item.id
              }
              buriedTable.push(buriedTableList)
            })
          }
          dispatch({
            type: 'SELECT_BURIED_LIST',
            buriedTable: buriedTable
          })
        }
      })
    } else {
      if (fail) fail()
    }
  })
}

export const deleteBuried = (data, success, fail) => (dispatch, getState) => {
  const postData = {
    platform: data.platform,
    id: data.buriedId
  }
  dispatch(deleteBuriedAction(postData)).then(action => {
    NProgress.done()
    const dataBody = action.data.body
    console.log(dataBody)
    if (dataBody.errorCode == '0') {
      console.log(dataBody)
      if (success) success()
      dispatch(selectBuriedAction({platform: data.platform})).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        console.log(dataBody)
        buriedTable = []
        if (dataBody.errorCode == '0') {
          console.log(dataBody.list.length)
          let buriedTableList = {}
          if (dataBody.list.length == '0') {
            buriedTableList = {
              event_type: '',
              event_name: '',
              control_event: '',
              table_delegate: '',
              web_delegate: '',
              path: '',
              id: ''
            }
            buriedTable.push(buriedTableList)
          } else {
            dataBody.list.forEach((item, index, array) => {
              buriedTableList = {
                event_type: item.event_type,
                event_name: item.event_name,
                control_event: item.control_event,
                table_delegate: item.table_delegate,
                web_delegate: item.web_delegate,
                path: item.path,
                id: item.id
              }
              buriedTable.push(buriedTableList)
            })
          }
          dispatch({
            type: 'SELECT_BURIED_LIST',
            buriedTable: buriedTable
          })
        }
      })
    } else {
      if (fail) fail()
    }
  })
}


const initialState = {
  onlineParamTable: [],
  buriedTable: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_ONLINE_PARAM_LIST':
      return {
        ...state,
        onlineParamTable: action.onlineParamTable
      }
    case 'SELECT_BURIED_LIST':
      return {
        ...state,
        buriedTable: action.buriedTable
      }
    default:
      return state
  }
}