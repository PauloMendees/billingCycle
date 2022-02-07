import { LISTAR_CREDITOS, BUSCAR_CREDITOSBYID, CADASTRAR_CREDITO, CLEAR_CREDIT, ALTERAR_CREDIT } from "../constants/creditos";

const initialState = {
    creditoAtual: {},
    listaCreditos: [],
    success: true,
    message: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LISTAR_CREDITOS:
            return {
                ...state,
                listaCreditos: action.payload,
            };
            break;

        case BUSCAR_CREDITOSBYID:
            return {
                ...state,
                creditoAtual: action.payload
            }

        case CADASTRAR_CREDITO:
            return {
                ...state,
                message: action.payload
            }

        case ALTERAR_CREDIT:
            return {
                ...state,
                message: action.payload
            }

        case CLEAR_CREDIT:
            return {
                ...state,
                message: '',
                success: true
            }

        default:
            return {
                ...state,
            };
            break;
    }
};