import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {products, product} from './product'
import categories from './categories'
import cart from './cart'
import orders from './orders'
import orderItems from './orderItems'

const reducer = combineReducers({
  user,
  products,
  product,
  categories,
  cart,
  orders,
  orderItems
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './cart'
