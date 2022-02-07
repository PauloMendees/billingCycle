import { BUSCAR_CICLOBYID, LISTAR_CICLOS, ADICIONAR_CICLO, CLEAR, DELETAR_CICLO, EDITAR_CICLO } from '../constants/billingCycle'

const initialState = {
    billingCycleAtual: {
        
    },
    listaBillingCycle: [],
    statusResponse: 1,
    message: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LISTAR_CICLOS:
            return {
                ...state,
                listaBillingCycle: action.payload,
            };
            break;

        case BUSCAR_CICLOBYID:
            return {
                ...state,
                billingCycleAtual: action.payload.data
            }
        
        case ADICIONAR_CICLO:
            return{
                ...state,
                statusResponse: action.payload
            }

        case DELETAR_CICLO:
            return{
                ...state,
                message: action.payload
            }

        case EDITAR_CICLO:
            return{
                ...state,
                message: action.payload
            }

        case CLEAR:
            return{
                ...state,
                billingCycleAtual: {},
                statusResponse: 1,
                message: '',
            }

        default:
            return {
                ...state,
            };
            break;
    }
};