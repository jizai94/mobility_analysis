import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_CMR = ['APP_CMR_REQ', 'APP_CMR_SUC', 'APP_CMR_FAL']

export const selectChannelAction = data => ({
  [BZ_REQUESTER]: {
    types: APP_CMR,
    url: API.CHANNEL_SELECT_URL,
    body: data
  }
})

export const createChannelAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_CMR,
    url: API.CHANNEL_CREATE_URL,
    body: data
  }
})

export const deleteChannelAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_CMR,
    url: API.CHANNEL_DELETE_URL,
    body: data
  }
})

export const updateChannelAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_CMR,
    url: API.CHANNEL_UPDATE_URL,
    body: data
  }
})