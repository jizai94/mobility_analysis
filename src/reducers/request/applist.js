import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_ALR = ['APP_ALR_REQ', 'APP_ALR_SUC', 'APP_ALR_FAL']

export const selectAppListAction = data => ({
  [BZ_REQUESTER]: {
    types: APP_ALR,
    url: API.APP_SELECT_URL,
    body: data
  }
})

export const createAppListAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_ALR,
    url: API.APP_CREATE_URL,
    body: data
  }
})

export const deleteAppListAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_ALR,
    url: API.APP_DELETE_URL,
    body: data
  }
})

export const updateAppListAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_ALR,
    url: API.APP_UPDATE_URL,
    body: data
  }
})

export const getVersionListAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_ALR,
    url: API.GETVERSION_URL,
    body: data
  }
})