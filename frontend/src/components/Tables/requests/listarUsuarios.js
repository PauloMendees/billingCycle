import { LISTAR_USUARIOS } from '../../../constants/usuarios'
import axios from '../../../api/autenticacaoApi'

const listarUsuarios = () => {
    return async function(dispatch, getState){
        const response = await axios.get('/api/usuarios')
        console.log(response)
        dispatch({type: LISTAR_USUARIOS, payload: response.data})
    }
}

export default listarUsuarios