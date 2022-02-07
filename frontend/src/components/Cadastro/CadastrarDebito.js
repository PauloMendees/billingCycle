import { ADICIONAR_DEBITO } from '../../constants/debitos';
import api from '../../api/apiHandler'

const cadastrarDebito = (debit) => {
    return async function (dispatch, getState) {
        const response = await api.post('/debitos/api/post', debit);
        dispatch({ type: ADICIONAR_DEBITO, payload: response.data[0].message})
    }
}

export default cadastrarDebito;