import axios from 'axios'
import {product} from './product'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'

/**
 * INITIAL STATE --------------------------------------------------
 */
// const initialState = {
//   userOrder: {}
// }

/**
 * ACTION CREATORS
 */
const _getOrders = orders => ({type: GET_ORDERS, orders})
const _updateOrder = order => ({type: UPDATE_ORDER, order})
const _createOrder = order => ({type: CREATE_ORDER, order})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getOrders = () => {
  return async dispatch => {
    const response = await axios.get(`/api/orders`)
    dispatch(_getOrders(response.data))
  }
}

const updateOrder = (order, push) => {
  return async dispatch => {
    const {data: updatedOrder} = await axios.put(
      `/api/orders/${order.id}`,
      order
    )
    dispatch(_updateOrder(updatedOrder))
    push('/orders')
  }
}

const createOrder = order => {
  return async dispatch => {
    const response = await axios.post('/api/orders', order)
    dispatch(_createOrder(response.data))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders

    case UPDATE_ORDER:
      state = state.map(
        order => (order.id === action.order.id ? action.order : order)
      )

    case CREATE_ORDER:
      state = [...state, action.order]
      return state

    default:
      return state
  }
}

export {getOrders, updateOrder, createOrder}
