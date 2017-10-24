import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_OPR = ['APP_OPR_REQ', 'APP_OPR_SUC', 'APP_OPR_FAL']


/*在线参数*/
export const selectOnlineParamAction = data => ({
  [BZ_REQUESTER]: {
    types: APP_OPR,
    url: API.ONLINE_PARAM_SELECT_URL,
    body: data
  }
})

export const createOnlineParamAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_OPR,
    url: API.ONLINE_PARAM_CREATE_URL,
    body: data
  }
})

export const updateOnlineParamAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_OPR,
    url: API.ONLINE_PARAM_UPDATE_URL,
    body: data
  }
})


/*无码采集*/
export const selectBuriedAction = data => ({
  [BZ_REQUESTER]: {
    types: APP_OPR,
    url: API.BURIED_SELECT_URL,
    body: data
  }
})

export const createBuriedAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_OPR,
    url: API.BURIED_CREATE_URL,
    body: data
  }
})

export const updateBuriedAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_OPR,
    url: API.BURIED_UPDATE_URL,
    body: data
  }
})

export const deleteBuriedAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_OPR,
    url: API.BURIED_DELETE_URL,
    body: data
  }
})