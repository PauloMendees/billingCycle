import axios from '../../api/apiHandler'
import { LISTAR_DEBITOS } from '../../constants/debitos'

const buscarDebitos = () => {
    return async function (dispatch, getState) {
        const response = await axios.get('/debitos/api/getall')
        dispatch({type: LISTAR_DEBITOS, payload: response.data})
    }
}

export default buscarDebitos