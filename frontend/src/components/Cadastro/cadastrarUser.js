import { CADASTRAR } from "../../constants/usuarios";
import axios from '../../api/autenticacaoApi'

const cadastrarUser = (user) => {
    return async function(dispatch, getState){
        const response = await axios.post('/api/cadastrarUsuario', user)
        console.log(response)
        dispatch({type: CADASTRAR, payload: response.data[0].message})
    }
}

export default cadastrarUser