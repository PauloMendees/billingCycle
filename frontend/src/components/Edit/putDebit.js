import { ALTERAR_DEBITO } from '../../constants/debitos'
import axios from '../../api/apiHandler'

const putDebit = (id, object) => {
    return async function(dispatch, getState){
        const response = await axios.put(`/Debitos/api/alterar/${id}`, object)
        dispatch({type: ALTERAR_DEBITO, payload: response.data[0].message})
    }
}

export default putDebit