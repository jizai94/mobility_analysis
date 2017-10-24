/**
 * Created by Alex on 2017/5/21.
 */
import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_TDR = ['APP_TDR_REQ', 'APP_TDR_SUC', 'APP_TDR_FAL']

export const realCrashDynamicAction = data => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.REAL_CRASH_DYNAMIC_URL,
    body: data
  }
})

export const realCrashChartAction = data => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.REAL_CRASH_CHART_URL,
    body: data
  }
})