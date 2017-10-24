import connect from 'STORE/connect'
import { downloadSDK } from 'REDUCER/downloadSDK'
import DownloadSDK from './DownloadSDK'


export default connect(

  state => ({
  	state: state.downloadSDK
  }),
  {
  	downloadSDK
  }, 
  DownloadSDK
)
