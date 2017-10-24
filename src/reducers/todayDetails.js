import NProgress from 'nprogress'
import { message } from 'antd'
import md5 from 'md5'
import API from 'CONSTANT/api'
import { today, yesterday } from 'GLOBAL'
import { todayDetailsAction } from './request/todayDetails'

let todayData = '',
    otherData = ''

const echeart1 = {
    time: '',
    data: []
},
echeart2 = {
    time: '',
    data: []
},
echeart3 = {
    time: '',
    data: []
},
echeart4 = {
    time: '',
    data: []
}

export const details = (activeUser, addUser, loginMember, startTimes, echeart1, echeart2) => ({
    type: 'TODAY_DETAILS',
    activeUser,
    addUser,
    loginMember,
    startTimes,
    echeart1,
    echeart2
})

export const preDetails = (echeart3, echeart4) => ({
    type: 'PRE_DETAILS',
    echeart3,
    echeart4
})

export const changeMenu1 = (newState) => (dispatch, getState) => {
    echeart1.data = []
    echeart3.data = []
    todayData.forEach((item, index, Array) => {
        echeart1.data.push(item[newState])
    })
    otherData.forEach((item, index, Array) => {
        echeart3.data.push(item[newState])
    })
    dispatch({
        type: 'CHANGE_MENU_ONE',
        state: newState,
        echeart1: echeart1,
        echeart3: echeart3
    })
}

export const changeMenu2 = (newState) => (dispatch, getState) => {
    console.log(newState)
    let sum = 0
    echeart2.data = []
    echeart4.data = []
    todayData.forEach((item, index, Array) => {
        sum = sum + Number(item[newState])
        echeart2.data.push(sum)
    })
    sum = 0
    otherData.forEach((item, index, Array) => {
        sum = sum + Number(item[newState])
        echeart4.data.push(sum)
    })
    dispatch({
        type: 'CHANGE_MENU_TWO',
        state: newState,
        echeart2: echeart2,
        echeart4: echeart4
    })
}

export const todayDetails = (data, state1, state2, success, fail, datePicker) => (dispatch, getState) => {
    const newData = {
        platform: data.platform,
        appkey: data.appkey,
        // date: '20170510',
        dateTime: data.dateTime.replace(/\-/g, ''),
        appVersion: data.appVersion,
        interfaceName: data.interfaceName,
        eventIdentifier: data.eventIdentifier
    }
    const dateTime = data.dateTime
    dispatch(todayDetailsAction(newData)).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        console.log(dataBody)
        if (dataBody.errorCode == '0') {
            // success()
            let activeUser = 0,
                addUser = 0,
                loginMember = 0,
                startTimes = 0,
                sum = 0
            if (dateTime == today) {
                echeart1.data = []
                echeart2.data = []
                todayData = dataBody.intervalAnalysisTable
                echeart1.time = dateTime
                echeart2.time = dateTime
                activeUser = dataBody.activeUser
                addUser = dataBody.addUser
                loginMember = dataBody.loginMember
                startTimes = dataBody.startTimes
                todayData.forEach((item, index, Array) => {
                    echeart1.data.push(Number(item[state1]))
                    sum = sum + Number(item[state2])
                    echeart2.data.push(sum)
                })
                dispatch(details(activeUser, addUser, loginMember, startTimes, echeart1, echeart2))
            } else if (dateTime == yesterday) {
                echeart3.data = []
                echeart4.data = []
                otherData = dataBody.intervalAnalysisTable
                echeart3.time = dateTime
                echeart4.time = dateTime
                otherData.forEach((item, index, Array) => {
                    echeart3.data.push(Number(item[state1]))
                    sum = sum + Number(item[state2])
                    echeart4.data.push(sum)
                })
                dispatch(preDetails(echeart3, echeart4))
            } else {
                otherData = dataBody.intervalAnalysisTable
                if(datePicker == 'datePicker1') {
                    echeart3.data = []
                    echeart3.time = dateTime
                    otherData.forEach((item, index, Array) => {
                        echeart3.data.push(item[state1])
                    })
                    dispatch({
                        type: 'CHOOSE_DATE1',
                        echeart3: echeart3
                    })
                } else {
                    echeart4.data = []
                    echeart4.time = dateTime
                    otherData.forEach((item, index, Array) => {
                        sum = sum + Number(item[state2])
                        echeart4.data.push(sum)
                    })
                    dispatch({
                        type: 'CHOOSE_DATE2',
                        echeart4: echeart4
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
    dateTime: '20170425',
    appVersion: '1.1',
    interfaceName: 'startTimes',
    eventIdentifier: 'AppStart',
    state1: 'activeUser',
    state2: 'activeUser',
    activeUser: 0,
    addUser: 0,
    loginMember: 0,
    startTimes: 0,
    echeart1: {},
    echeart2: {},
    echeart3: {},
    echeart4: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TODAY_DETAILS':
            return {
                ...state,
                activeUser: action.activeUser,
                addUser: action.addUser,
                loginMember: action.loginMember,
                startTimes: action.startTimes,
                echeart1: action.echeart1,
                echeart2: action.echeart2
            }
        case 'PRE_DETAILS':
            return {
                ...state,
                echeart3: action.echeart3,
                echeart4: action.echeart4
            }
        case 'CHANGE_MENU_ONE':
            return {
                ...state,
                state1: action.state,
                echeart1: action.echeart1,
                echeart3: action.echeart3
            }
        case 'CHANGE_MENU_TWO':
            return {
                ...state,
                state2: action.state,
                echeart2: action.echeart2,
                echeart4: action.echeart4
            }
        case 'CHOOSE_DATE1':
            return {
                ...state,
                echeart3: action.echeart3
            }
        case 'CHOOSE_DATE2':
            return {
                ...state,
                echeart4: action.echeart4
            }
        default:
            return state
    }
}