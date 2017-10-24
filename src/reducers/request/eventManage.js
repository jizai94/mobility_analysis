import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_TDR = ['APP_TDR_REQ', 'APP_TDR_SUC', 'APP_TDR_FAL']

//自定义事件查询
export const eventManageAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.EVENTMANAGE_URL,
    body: data
  }
})

//自定义事件查询，新增
export const eventManageUpdateAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.EVENTUPDATE_URL,
    body: data
  }
})

//自定义事件删除
export const eventManageDeleteAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.EVENTDELETE_URL,
    body: data
  }
})


//事件
export const eventAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.EVENT_URL,
    body: data
  }
})


//事件详情
export const eventDetailsAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.EVENTDETAILS_URL,
    body: data
  }
})