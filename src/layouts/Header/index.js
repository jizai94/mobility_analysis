import connect from 'STORE/connect'
import HeaderView from './HeaderView'
import { sendData } from 'REDUCER/common/subHeader'

export default connect(

  state => ({
  	platform:state.subHeader.platform,
    date:state.subHeader.date
  }),

  {
  	sendData
  },
  
  HeaderView
)


