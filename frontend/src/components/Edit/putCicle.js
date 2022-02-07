import axios from '../../api/apiHandler'
import { EDITAR_CICLO } from '../../constants/billingCycle'

const putCicle = (id, object) => {
    return async function(dispatch, getState){
        const response = await axios.put(`/BillingCycle/api/alterar/${id}`, object)
        console.log(response)
        dispatch({type: EDITAR_CICLO, payload: response.data[0].message})
    }
}

export default putCicle