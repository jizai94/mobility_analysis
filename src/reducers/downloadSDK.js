import NProgress from 'nprogress'
import { message } from 'antd'
import md5 from 'md5'
import API from 'CONSTANT/api'
import { downloadSDKAction } from './request/downloadSDK'

export const downloadSDK = (data, success, fail) => (dispatch, getState) => {
	const postData = {
        platform: data.platform
    }
    dispatch(downloadSDKAction(postData)).then(action => {
    	NProgress.done()
    	const dataBody = action.data.body
        console.log(dataBody)
        if(dataBody.errorCode == 0) {
            const sdkDownload = dataBody.sdkDownload
            dispatch({
                type: 'DOWNLOAD_SDK',
                sdkDownload: sdkDownload
            })
        }
    })
}

const initialState = {
    sdkDownload: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'DOWNLOAD_SDK':
            return {
                ...state,
                sdkDownload: action.sdkDownload
            }
        default:
            return state
    }
}