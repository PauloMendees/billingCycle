import { LOGAR, LOGOUT, ERROR, CLEAR } from "../constants/autenticacao"

const initialState = {
    token: '',
    message: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGAR:
            return {
                ...state,
                token: action.payload
            }

        case LOGOUT:
            return {
                ...state,
                token: ''
            }

        case ERROR:
            return {
                ...state,
                message: action.payload
            }

        case CLEAR:
            return {
                ...state,
                message: '',
                token: ''
            }


        default:
            return {
                ...state,
            };
            break;
    }
}