import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_TDR = ['APP_TDR_REQ', 'APP_TDR_SUC', 'APP_TDR_FAL']

const getVersionListAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.GETVERSION_URL,
    body: data
  }
})

