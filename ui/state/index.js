import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Reducers from './reducers'

const middleware = []
const enhancers = []

middleware.push(ReduxThunk)

enhancers.push(applyMiddleware(...middleware))

let composedEnhancers = compose(...enhancers)

if (process.env.NODE_ENV === 'development') {
  composedEnhancers = composeWithDevTools(...enhancers)
}

const store = createStore(Reducers, composedEnhancers)

export default store
