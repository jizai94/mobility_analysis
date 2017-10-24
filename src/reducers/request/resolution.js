import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const GET_RESOLUTION = ['GET_RESOLUTION_REQ', 'GET_RESOLUTION_SUC', 'GET_RESOLUTION_FAL']

export const getResolutionAction = (data) => ({
  [BZ_REQUESTER]: {
    types: GET_RESOLUTION,
    url: API.RESOLUTION_URL,
    body: data
  }
})
