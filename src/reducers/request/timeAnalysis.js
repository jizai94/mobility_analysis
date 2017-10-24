import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_TAR = ['APP_TAR_REQ', 'APP_TAR_SUC', 'APP_TAR_FAL']

export const timeAnalysisAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TAR,
    url: API.TIME_ANALYSIS_URL,
    body: data
  }
})
