import NProgress from 'nprogress'
import { realCrashDynamicAction, realCrashChartAction } from './request/realCrash'
import { today, yesterday, timeToMs } from 'GLOBAL'
import { getOption } from '../option/realCrash'

const GET_TAB_DATA = 'GET_TAB_DATA'

export const realCrashDynamic = (data, succcess, fail) => (dispatch, getState) => {
  const reqData = {
    ec_ranges_start: data.ec_ranges_start,
    ec_ranges_end: data.ec_ranges_end,
    ec_app_version: data.ec_app_version,
    ec_appKey: data.ec_appKey,
    ec_platform: data.ec_platform
  }
  dispatch(realCrashDynamicAction(reqData)).then(action => {
    NProgress.done()
    const dataBody = action.data.body
    let crashUserPercent = {},
        crashPercent = {},
        crashTimes = {},
        crashUsers = {}
    if (dataBody.errorCode === '0') {
      let crashPercentList = dataBody.crashPercentList
      crashUserPercent = crashPercentList[0]
      crashPercent = crashPercentList[1]
      crashTimes = crashPercentList[2]
      crashUsers = crashPercentList[3]
      dispatch({
        type: 'GET_TAB_DATA',
        crashUserPercent: crashUserPercent,
        crashPercent: crashPercent,
        crashTimes: crashTimes,
        crashUsers: crashUsers
      })
    }
  })
}

export const realCrashChart = (data, succcess, fail) => (dispatch, getState) => {
  const reqData = {
    ec_ranges_start: data.ec_ranges_start,
    ec_app_version: data.ec_app_version,
    ec_appKey: data.ec_appKey,
    ec_platform: data.ec_platform,
    ec_tab: data.ec_tab,
    tranTime: data.tranTime,
    endTime: data.endTime,
    beginTime: data.beginTime
  }
  dispatch(realCrashChartAction(reqData)).then(action => {
    NProgress.done()
    let todayData = [],
        chooseDate = [],
        tabState = ''
    switch (data.ec_tab) {
      case 'crash_user_percent':
        tabState = 'userPercent'
        break
      case 'crash_percent':
        tabState = 'clientPercent'
        break
      case 'crash_times':
        tabState = 'crashClient'
        break
      case 'crash_users':
        tabState = 'crashUser'
        break
      default:
        tabState = 'userPercent'
        break
    }
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      console.log(dataBody.resList[0].subResList)
      console.log(tabState)
      dataBody.resList[0].subResList.forEach((item) => {
          todayData.push(item[tabState])
      })
      dataBody.resList[1].subResList.forEach((item) => {
          chooseDate.push(item[tabState])
      })
    }
    dispatch({
      type: 'ECHEART_OPTION',
      echeartOption: getOption(data.chooseDate, todayData, chooseDate)
    })
  })
}

const initialState = {
  crashUserPercent: {},
  crashPercent: {},
  crashTimes: {},
  crashUsers: {},
  echeartOption: getOption(yesterday, [0], [0])
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_TAB_DATA:
      return {
        ...state,
        crashUserPercent: action.crashUserPercent,
        crashPercent: action.crashPercent,
        crashTimes: action.crashTimes,
        crashUsers: action.crashUsers
      }
    case 'ECHEART_OPTION':
      return {
        ...state,
        echeartOption: action.echeartOption
      }
    default:
      return state
  }
}
