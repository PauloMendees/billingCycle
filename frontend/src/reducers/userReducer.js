import { LISTAR_USUARIOS, CLEAR_USER, CADASTRAR, DELETE } from '../constants/usuarios'

const initialState = {
    listaUsuarios: [],
    message: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LISTAR_USUARIOS:
            return {
                ...state,
                listaUsuarios: action.payload
            }

        case CLEAR_USER:
            return {
                ...state,
                message: ''
            }

        case DELETE:
            return {
                ...state,
                message: action.payload
            }

        case CADASTRAR:
            return {
                ...state,
                message: action.payload
            }

        default:
            return {
                ...state,
            };
            break;
    }
}