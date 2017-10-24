/**
 * Created by Alex on 2017/5/9.
 */
import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_TDR = ['APP_TDR_REQ', 'APP_TDR_SUC', 'APP_TDR_FAL']

export const netAndOperatorAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_TDR,
    url: API.NET_AND_OPERATOR_URL,
    body: data
  }
})
