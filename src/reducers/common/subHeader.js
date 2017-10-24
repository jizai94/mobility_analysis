import { today } from 'GLOBAL'

export const sendData = (data) => (dispatch, getState) =>{
    dispatch({...data})
    // console.log(location.href.substr(location.href.lastIndexOf('/') + 1))
}
const initialState = {
    platform:2,
    date:today,
    appVersion:'1.0.6',
    appKey:'sads2130'
}

export default (state = initialState, action) => {
	switch(action.type){
		case 'android':
		return {
		    ...state,
		    ...action
  		}
  		case 'ios':
  		return {
  			...state,
  			...action
  		}
  		case 'ipad':
  		return {
  			...state,
  			...action
  		}
  		default:
  		return state
	}
}
