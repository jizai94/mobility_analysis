import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_TDR = ['APP_TDR_REQ', 'APP_TDR_SUC', 'APP_TDR_FAL']

export const brandAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.BRAND,
    body: data
  }
})

export const brandTableAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.BRNAD_TABLE,
    body: data
  }
})