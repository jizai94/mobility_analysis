/**
 * Created by Alex on 2017/5/11.
 */
import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_TDR = ['APP_TDR_REQ', 'APP_TDR_SUC', 'APP_TDR_FAL']

export const crashTrendAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.CRASH_TREND_URL,
    body: data
  }
})


export const crashTrendTableAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.CRASH_TRENDTABLE_URL,
    body: data
  }
})
