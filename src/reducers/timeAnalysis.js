import NProgress from 'nprogress'
import { message } from 'antd'
import md5 from 'md5'
import API from 'CONSTANT/api'
import { today, yesterday, lastWeekY } from 'GLOBAL'
import { timeAnalysisAction } from './request/timeAnalysis'

let yesterdayData = [],
    otherData = []

const echeart1 = {
    time: '',
    data: []
}
const echeart2 = {
    time: '',
    data: []
}

export const changeMenu = (newState) => (dispatch, getState) => {
    echeart1.data = []
    echeart2.data = []
    yesterdayData.forEach((item, index, Array) => {
        echeart1.data.push(item[newState])
    })
    otherData.forEach((item, index, Array) => {
        echeart2.data.push(item[newState])
    })
    console.log(echeart1, echeart2)
    dispatch({
        type: 'CHANGE_MENU',
        state: newState,
        echeart1: echeart1,
        echeart2: echeart2
    })
}

export const timeAnalysis = (data, state, success, fail, datePicker) => (dispatch, getState) => {
	const newData = {
        platform: data.platform,
        appkey: data.appkey,
        date: data.dateTime.replace(/\-/g, ''),
        // dateTime: data.dateTime.replace(/\-/g, ''),
        appVersion: data.appVersion,
        // interfaceName: data.interfaceName,
        // eventIdentifier: data.eventIdentifier
    }
    const dateTime = data.dateTime
    dispatch(timeAnalysisAction(newData)).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        console.log(dataBody)
        if (dataBody.errorCode == '0') {
            // success()
			let	tableData = [],
              	i = 1
			if(dateTime == yesterday) {
                echeart1.data = []
				yesterdayData = dataBody.intervalAnalysisTable
				echeart1.time = dateTime
				yesterdayData.forEach((item) => {
					const dataList = {
						key: i,
						date: item.timeInterval,
						activeUser: item.activeUser,
						addUser: item.addUser,
						loginMember: item.loginMember,
						perStartTimes: item.perStartTimes,
						perUserTime: item.perUserTime
					}
					tableData.push(dataList)
					echeart1.data.push(Number(item[state]))
					i++
				})
				dispatch({
					type: 'YESTERDAY_TIME_ANALYSIS',
					echeart1: echeart1,
					tableData: tableData
				})
			} else if (dateTime == lastWeekY) {
                echeart2.data = []
				otherData = dataBody.intervalAnalysisTable
				echeart2.time = dateTime
				otherData.forEach((item) => {
					echeart2.data.push(Number(item[state]))
				})
				dispatch({
					type: 'OTHER_TIME_ANALYSIS',
					echeart2: echeart2
				})
			} else {
                otherData = dataBody.intervalAnalysisTable
                if(datePicker == 'datePicker1') {
                    echeart1.data = []
                	echeart1.time = dateTime
                    otherData.forEach((item, index, Array) => {
                        const dataList = {
							key: i,
							date: item.timeInterval,
							activeUser: item.activeUser,
							addUser: item.addUser,
							loginMember: item.loginMember,
							perStartTimes: item.perStartTimes,
							perUserTime: item.perUserTime
						}
						tableData.push(dataList)
						echeart1.data.push(Number(item[state]))
						i++
                    })
                    dispatch({
                        type: 'CHOOSE_DATE1',
                        echeart1: echeart1,
						tableData: tableData
                    })
                } else {
                    echeart2.data = []
                	echeart2.time = dateTime
                    otherData.forEach((item, index, Array) => {
                        echeart2.data.push(Number(item[state]))
                    })
                    dispatch({
                        type: 'CHOOSE_DATE2',
                        echeart2: echeart2
                    })
                }
            }
        } else {
            // fail()
        }
    })
}

const initialState = {
	platform: '1',
    appkey: 'sads213',
    dateTime: today,
    appVersion: '1.0.6',
    interfaceName: 'startTimes',
    eventIdentifier: 'AppStart',
    state: 'activeUser',
    echeart1: {},
    echeart2: {},
    tableData: []
}

export default (state = initialState, action) => {
    switch (action.type) {
    	case 'YESTERDAY_TIME_ANALYSIS':
    		return {
    			...state,
    			echeart1: action.echeart1,
    			tableData: action.tableData.reverse()
    		}
    	case 'OTHER_TIME_ANALYSIS':
    		return {
    			...state,
    			echeart2: action.echeart2
    		}
        case 'CHANGE_MENU':
            return {
                ...state,
                state: action.state,
                echeart1: action.echeart1,
                echeart2: action.echeart2
            }
        case 'CHOOSE_DATE1':
            return {
                ...state,
                echeart1: action.echeart1,
    			tableData: action.tableData.reverse()
            }
        case 'CHOOSE_DATE2':
            return {
                ...state,
                echeart2: action.echeart2
            }
        default:
            return state
    }
}