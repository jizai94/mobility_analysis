import NProgress from 'nprogress'
import { message, notification } from 'antd'

const demo = (mess) => ({
	type: 'DEMO',
	data: {
		mess: mess
	}
})

export const demoFun = (operator) => (dispatch, getState) => {
  dispatch(demo(operator))
}

const initialState = {
  "mess": "我什么都没干"
}
export default (state = initialState, action) => {
  switch (action.type) {

    case 'DEMO':
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}
