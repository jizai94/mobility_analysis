import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_TDR = ['APP_TDR_REQ', 'APP_TDR_SUC', 'APP_TDR_FAL']

export const applicationTrendAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.APPLICATION_TREND_URL,
    body: data
  }
})