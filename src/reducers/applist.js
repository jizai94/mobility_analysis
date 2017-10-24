import NProgress from 'nprogress'
import { message } from 'antd'
import md5 from 'md5'
import API from 'CONSTANT/api'
import { selectAppListAction, createAppListAction, deleteAppListAction, updateAppListAction ,getVersionListAction} from './request/applist'
import { logoutAction, changePwdAction } from './request/login'

let appManageTable = [],
    chooseApp = {}

export const loginOutAction = (suc, fail) => (dispatch, getState) => {
    dispatch(logoutAction()).then(action => {
        if(action.data.body.errorCode == '0'){
            suc()
        } else {
            fail()
        }
    })
}

export const changePassWordAction = (data, suc, fail) => (dispatch, getState) => {
    dispatch(changePwdAction({
        id: data.id,
        newPassword: data.newPwd,
        password: data.oldPwd
    })).then(action => {
        if(action.data.body.errorCode == '0'){
            suc()
        } else {
            fail()
        }
    })
}

export const getVersionList = (data,suc,fail) => (dispatch,getState) => {
  const newData = {
      platform: data.platform,
      appkey: data.appkey 
    }
    dispatch(getVersionListAction(newData)).then(action =>{
        if(action.data.body.errorCode == '0'){
            sessionStorage.setItem('versionList',JSON.stringify(action.data.body.versionList))
            console.log(JSON.parse(sessionStorage.getItem('versionList')))
            suc()
        }else{
            fail()
        }     
    })
}


export const chooseAppAction = (id, cb) => (dispatch, getState) => {
    appManageTable.forEach((item) => {
        if(id == item.id){
            chooseApp = item
        }
    })
    cb(chooseApp)
    dispatch({
        type: 'CHOOSE_APP_ACTION',
        chooseApp: chooseApp
    })
}

export const selectAppList = (data, success, fail) => (dispatch, getState) => {
	const postData = {
        appState: data.appState,
        useId: data.useId
    }
    dispatch(selectAppListAction(postData)).then(action => {
    	NProgress.done()
    	const dataBody = action.data.body
        console.log(dataBody)
        appManageTable = []
        if(dataBody.errorCode == '0') {
			const data = dataBody.appManageTable
			data.forEach((item) => {
				appManageTable.push(item)
			})
        }
        dispatch({
        	type: 'SELECT_APP_LIST',
        	appManageTable: appManageTable
        })
    })
}

export const createAppList = (data, success, fail) => (dispatch, getState) => {
    const postData = {
        appName: data.appName,
        appClassify: data.appClassify,
        appDescribe: data.appDescribe,
        isRead: data.isRead == true ? 1 : 0,
        useId: data.useId
    }
    dispatch(createAppListAction(postData)).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        console.log(dataBody)
        if(dataBody.errorCode == '0') {
            success()
            dispatch(selectAppListAction({appState: data.appState, useId: data.useId})).then(action => {
                NProgress.done()
                const dataBody = action.data.body
                appManageTable = []
                if(dataBody.errorCode == '0') {
                    const data = dataBody.appManageTable
                    data.forEach((item) => {
                        appManageTable.push(item)
                    })
                }
                dispatch({
                    type: 'SELECT_APP_LIST',
                    appManageTable: appManageTable
                })
             })
        } else {
            fail()
        }
    })
}

export const deleteAppList = (data, success, fail) => (dispatch, getState) => {
    const postData = {
        appState: '2',
        id: data.id
    }
    dispatch(deleteAppListAction(postData)).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        console.log(dataBody)
        if(dataBody.errorCode == '0'){
            success()
            dispatch(selectAppListAction({appState: data.appState, useId: data.useId})).then(action => {
                NProgress.done()
                const dataBody = action.data.body
                appManageTable = []
                if(dataBody.errorCode == '0') {
                    const data = dataBody.appManageTable
                    data.forEach((item) => {
                        appManageTable.push(item)
                    })
                }
                dispatch({
                    type: 'SELECT_APP_LIST',
                    appManageTable: appManageTable
                })
             })
        }else {
            fail()
        }
    })
}

export const updateAppList = (data, success, fail) => (dispatch, getState) => {
    const postData = {
        appName: data.appName,
        appClassify: data.appClassify,
        appDescribe: data.appDescribe,
        isRead: data.isRead == true ? 1 : 0,
        id: data.id
    }
    dispatch(updateAppListAction(postData)).then(action => {
        NProgress.done()
        const dataBody = action.data.body
        console.log(dataBody)
        if(dataBody.errorCode == '0') {
            success()
            dispatch(selectAppListAction({appState: data.appState, useId: data.useId})).then(action => {
                NProgress.done()
                const dataBody = action.data.body
                appManageTable = []
                if(dataBody.errorCode == '0') {
                    const data = dataBody.appManageTable
                    data.forEach((item) => {
                        appManageTable.push(item)
                    })
                }
                dispatch({
                    type: 'SELECT_APP_LIST',
                    appManageTable: appManageTable
                })
             })
        } else {
            fail()
        }
    })
}

const initialState = {
    appManageTable: [],
    chooseApp: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_APP_LIST':
            return {
                ...state,
                appManageTable: action.appManageTable.reverse()
            }
        case 'CHOOSE_APP_ACTION':
            return {
                ...state,
                chooseApp: action.chooseApp
            }
        default:
            return state
    }
}