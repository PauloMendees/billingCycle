import { createStore, applyMiddleware } from "redux";
import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from './middleware/logger'
import monitorReducersEnhancer from './middleware/monitorReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(reducer, preloadedState, composedEnhancers)

  return store
}