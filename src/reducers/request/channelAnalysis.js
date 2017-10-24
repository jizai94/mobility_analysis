import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const GET_TABLE_DATA = ['GET_TABLE_REQ', 'GET_TABLE_SUC', 'GET_TABLE_FAL']
const GET_CHART_DATA = ['GET_CHART_REQ', 'GET_CHART_SUC', 'GET_CHART_FAL']
const GET_CHANNEL_DATA = ['GET_CHANNEL_REQ', 'GET_CHANNEL_SUC', 'GET_CHANNEL_FAL']

export const tableDataAction = (data) => ({
  [BZ_REQUESTER]: {
    types: GET_TABLE_DATA,
    url: API.CHANNEL_TABLE_URL,
    body: data
  }
})

export const chartDataAction = (data) => ({
  [BZ_REQUESTER]: {
    types: GET_CHART_DATA,
    url: API.CHANNEL_CHART_URL,
    body: data
  }
})

export const channelStyleAction = (data) => ({
  [BZ_REQUESTER]: {
    types: GET_CHANNEL_DATA,
    url: API.CHANNEL_STYLE_URL,
    body: data
  }
})
