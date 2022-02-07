import { ADICIONAR_CICLO } from '../../constants/billingCycle';
import api from '../../api/apiHandler'

const cadastrarCiclo = (cycle) => {
    return async function (dispatch, getState) {
        const response = await api.post('/billingcycle/api/post', cycle);
        dispatch({ type: ADICIONAR_CICLO, payload: response.status})
    }
}

export default cadastrarCiclo;