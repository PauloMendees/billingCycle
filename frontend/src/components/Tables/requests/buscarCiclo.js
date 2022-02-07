import api from '../../../api/apiHandler'
import { BUSCAR_CICLOBYID } from '../../../constants/billingCycle'

const buscarCiclo = (id) => {
    return async function(dispatch, getState){
        const response = await api.get(`/billingcycle/api/getById/${id}`)
        dispatch({ type: BUSCAR_CICLOBYID, payload: response})
    }
}

export default buscarCiclo