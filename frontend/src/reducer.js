import { combineReducers } from "redux";
import billingCycle from './reducers/billingCycleReducer'
import credito from './reducers/creditoReducer'
import debito from './reducers/debitoReducer'
import autenticacao from './reducers/autenticacaoReducer'
import users from './reducers/userReducer'
import { routerReducer } from 'react-router-redux';

export default combineReducers(
  {
    ciclos: billingCycle,
    credit: credito,
    debit: debito,
    router: routerReducer,
    autenticacao: autenticacao,
    usuarios: users
  }
);