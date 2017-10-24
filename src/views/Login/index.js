import connect from 'STORE/connect'
import { validateLogin, validateRegister } from 'REDUCER/common/login'
import LoginView from './LoginView'

export default connect(

  state => ({
    // vcodeSrc : state.login.checkCodeSrc
  }),

  {
    // setSessionID,
    validateLogin,
    validateRegister
  }, 

  LoginView
)
