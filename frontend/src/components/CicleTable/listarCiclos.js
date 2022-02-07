import { LISTAR_CICLOS } from '../../constants/billingCycle';
import api from '../../api/apiHandler'

const listarCiclos = () => {
    return async function (dispatch, getState) {
        const response = await api.get('/billingcycle/api/getall');
        dispatch({ type: LISTAR_CICLOS, payload: response.data})
    }
}

export default listarCiclos;