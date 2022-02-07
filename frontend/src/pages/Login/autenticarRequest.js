import axios from '../../api/autenticacaoApi'
import { LOGAR, ERROR } from '../../constants/autenticacao'

const autenticarRequest = (user) => {
    return async function(dispatch, getState){
        const response = await axios.post('/api/login', user).catch(function error(){
            dispatch({type: ERROR, payload: `Usuário ou senha incorretos ${Math.random()}`})
        })
        dispatch({ type: LOGAR, payload: response.data[0].message })
    }
}

export default autenticarRequest