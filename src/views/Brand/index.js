import connect from 'STORE/connect'
import BrandView from './BrandView'
import { brand ,brandTable} from 'REDUCER/brand'


export default connect(
	state => ({
		dataTable:state.brand.dataTable,
        brandArr:state.brand.brandArr,
        dateArr:state.brand.dateArr,
        series:state.brand.series,
        state:state.brand.state
	}),

	{
		brand,
		brandTable
	},
	
	BrandView
)