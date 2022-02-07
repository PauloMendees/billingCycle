import axios from '../../api/apiHandler'
import { ALTERAR_CREDIT } from '../../constants/creditos'

const putCredit = (id, object) => {
    return async function(dispatch, getState){
        const response = await axios.put(`/Creditos/api/alterar/${id}`, object)
        dispatch({type: ALTERAR_CREDIT, payload: response.data[0].message})
    }
}

export default putCredit