import api from '../../../api/apiHandler'
import { DELETE_DEBITO } from '../../../constants/debitos'

const deletarDebito = (id) => {
    return async function (dispatch, getState) {
        const response = await api.delete(`/debitos/api/delete/${id}`)
        dispatch({type: DELETE_DEBITO, payload: response.data[0].message})
    }
}

export default deletarDebito