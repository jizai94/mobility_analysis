import connect from 'STORE/connect'
import { selectAppList, createAppList, deleteAppList, updateAppList, chooseAppAction ,getVersionList, loginOutAction, changePassWordAction } from 'REDUCER/applist'
import ApplistView from './ApplistView'


export default connect(

  state => ({
  	state: state.applist
  }),
  {
  	selectAppList,
  	createAppList,
  	deleteAppList,
  	updateAppList,
    loginOutAction,
  	chooseAppAction,
    getVersionList,
    changePassWordAction
  },
  ApplistView
)
