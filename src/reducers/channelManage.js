import NProgress from 'nprogress'
import { message } from 'antd'
import md5 from 'md5'
import API from 'CONSTANT/api'
import { selectChannelAction, createChannelAction, deleteChannelAction, updateChannelAction } from './request/channelManage'

let channelManageTable = [],
    chooseChannel = {}

export const chooseChannelAction = (id, cb) => (dispatch, getState) => {
    console.log(id)
    channelManageTable.forEach((item) => {
        if(id == item.channel_id){
            chooseChannel = item
        }
    })
    cb(chooseChannel)
    dispatch({
        type: 'CHOOSE_CHANNEL_ACTION',
        chooseChannel: chooseChannel
    })
}

export const selectChannel = (data, success, fail) => (dispatch, getState) => {
	const postData = {
        appkey: data.appkey,
        platform: data.platform
    }
    dispatch(selectChannelAction(postData)).then(action => {
    	NProgress.done()
    	const dataBody = action.data.body
        console.log(dataBody)
        channelManageTable = []
        if(dataBody.errorCode == '0') {
			const data = dataBody.channelOutput
			data.forEach((item) => {
				channelManageTable.push(item)
			})
        }
        dispatch({
        	type: 'SELECT_CHANNEL_LIST',
        	channelManageTable: channelManageTable
        })
    })
}

export const createChannel = (data, success, fail) => (dispatch, getState) => {
    const postData = {
        channel_name: data.channelName,
        channel_type: data.channelType,
        platform: data.platform,
        appkey: data.appkey
    }
    dispatch(createChannelAction(postData)).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        console.log(dataBody)
        if(dataBody.errorCode == '0') {
            success()
            dispatch(selectChannel({appkey: data.appkey, platform: data.platform})).then(action => {
                NProgress.done()
                const dataBody = action.data.body
                channelManageTable = []
                if(dataBody.errorCode == '0') {
                    const data = dataBody.channelOutput
                    data.forEach((item) => {
                        channelManageTable.push(item)
                    })
                }
                dispatch({
                    type: 'SELECT_CHANNEL_LIST',
                    channelManageTable: channelManageTable
                })
             })
        } else {
            fail()
        }
    })
}

export const deleteChannel = (data, success, fail) => (dispatch, getState) => {
    const postData = {
        channel_id: data.channelId
    }
    dispatch(deleteChannelAction(postData)).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        console.log(dataBody)
        if(dataBody.errorCode == '0'){
            success()
            dispatch(selectChannel({appkey: data.appkey, platform: data.platform})).then(action => {
                NProgress.done()
                const dataBody = action.data.body
                channelManageTable = []
                if(dataBody.errorCode == '0') {
                    const data = dataBody.channelOutput
                    data.forEach((item) => {
                        channelManageTable.push(item)
                    })
                }
                dispatch({
                    type: 'SELECT_CHANNEL_LIST',
                    channelManageTable: channelManageTable
                })
             })
        }else {
            fail()
        }
    })
}

export const updateChannel = (data, success, fail) => (dispatch, getState) => {
    const postData = {
        channel_name: data.channelName,
        channel_type: data.channelType,
        channel_id: data.channelId
    }
    dispatch(updateChannelAction(postData)).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        console.log(dataBody)
        if(dataBody.errorCode == '0') {
            success()
            dispatch(selectChannel({appkey: data.appkey, platform: data.platform})).then(action => {
                NProgress.done()
                const dataBody = action.data.body
                channelManageTable = []
                if(dataBody.errorCode == '0') {
                    const data = dataBody.channelOutput
                    data.forEach((item) => {
                        channelManageTable.push(item)
                    })
                }
                dispatch({
                    type: 'SELECT_CHANNEL_LIST',
                    channelManageTable: channelManageTable
                })
             })
        } else {
            fail()
        }
    })
}

const initialState = {
    channelManageTable: [],
    chooseChannel: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_CHANNEL_LIST':
            return {
                ...state,
                channelManageTable: action.channelManageTable
            }
        case 'CHOOSE_CHANNEL_ACTION':
            return {
                ...state,
                chooseChannel: action.chooseChannel
            }
        default:
            return state
    }
}