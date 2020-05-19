import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {user, users} from './user'
import {products, product} from './product'
import {orders, order} from './orders'
import {orderItems, orderItem} from './orderItems'
import {reviews} from './reviews'

const reducer = combineReducers({
  user,
  users,
  products,
  product,
  orders,
  order,
  orderItems,
  orderItem,
  reviews
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './orders'
export * from './orderItems'
