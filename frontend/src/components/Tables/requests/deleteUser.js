import api from '../../../api/autenticacaoApi'
import { DELETE } from '../../../constants/usuarios'

const deletarUser = (id) => {
    return async function (dispatch, getState) {
        const response = await api.delete(`/api/deletarUsuario/${id}`)
        dispatch({type: DELETE, payload: response.data[0].message})
    }
}

export default deletarUser