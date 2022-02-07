import { BUSCAR_DEBITOID, LISTAR_DEBITOS, ADICIONAR_DEBITO, CLEAR, DELETE_DEBITO, ALTERAR_DEBITO } from "../constants/debitos";

const initialState = {
    debitoAtual: {},
    listaDebitos: [],
    success: false,
    message: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LISTAR_DEBITOS:
            return {
                ...state,
                listaDebitos: action.payload,
            };
            break;

        case BUSCAR_DEBITOID:
            return {
                ...state,
                debitoAtual: action.payload
            }

        case ADICIONAR_DEBITO:
            return {
                ...state,
                message: action.payload,
                success: true
            }

        case CLEAR:
            return {
                ...state,
                message: '',
                success: true
            }

        case DELETE_DEBITO:
            return {
                ...state,
                message: action.payload,
                success: true
            }

        case ALTERAR_DEBITO:
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
};