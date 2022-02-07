import api from '../../../api/apiHandler'
import { DELETE_CREDIT } from '../../../constants/creditos'

const deletarCredito = (id) => {
    return async function (dispatch, getState) {
        const response = await api.delete(`/creditos/api/deleteById/${id}`)
        dispatch({type: DELETE_CREDIT, payload: response.data[0].message})
    }
}

export default deletarCredito