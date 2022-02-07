import axios from '../../api/apiHandler'
import { LISTAR_CREDITOS } from '../../constants/creditos'

const buscarCreditos = () => {
    return async function (dispatch, getState) {
        const response = await axios.get('/creditos/api/getall')
        dispatch({type: LISTAR_CREDITOS, payload: response.data})
    }
}

export default buscarCreditos