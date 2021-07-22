import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer'
import { print1, print2, print3 } from './exampleAddons/middleware'

const store = createStore(rootReducer, applyMiddleware(print1, print2, print3))
export default store