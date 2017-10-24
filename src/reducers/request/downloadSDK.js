import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_DSR = ['APP_DSR_REQ', 'APP_DSR_SUC', 'APP_DSR_FAL']

export const downloadSDKAction = data => ({
  [BZ_REQUESTER]: {
    types: APP_DSR,
    url: API.DOWNLOAD_SDK_URL,
    body: data
  }
})