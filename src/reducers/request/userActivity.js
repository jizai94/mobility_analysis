import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const GET_TABLE_DATA = ['GET_TABLE_REQ', 'GET_TABLE_SUC', 'GET_TABLE_FAL']

export const tableDataAction = (data) => ({
  [BZ_REQUESTER]: {
    types: GET_TABLE_DATA,
    url: API.USER_ACTIVE_URL,
    body: data
  }
})
