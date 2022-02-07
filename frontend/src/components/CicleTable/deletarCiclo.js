import api from '../../api/apiHandler'
import { DELETAR_CICLO } from '../../constants/billingCycle'

const deletarCiclo = (id) => {
    return async function(dispatch, getState){
        const response = await api.delete(`/billingcycle/api/deletar/${id}`)
        dispatch({ type: DELETAR_CICLO, payload: response.data[0].message})
    }
}

export default deletarCiclo;