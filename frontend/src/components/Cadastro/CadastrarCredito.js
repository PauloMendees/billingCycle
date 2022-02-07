import api from '../../api/apiHandler'
import { CADASTRAR_CREDITO } from '../../constants/creditos';

const cadastrarCredito = (credit) => {
    return async function (dispatch, getState) {
        const response = await api.post('/creditos/api/post', credit);
        console.log(response)
        dispatch({ type: CADASTRAR_CREDITO, payload: response.data[0].message})
    }
}

export default cadastrarCredito;