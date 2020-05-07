import axios from 'axios'
import {product} from './product'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_ORDERS = 'GET_ORDERS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const REMOVE_ITEM = 'REMOVE_ITEM'

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
const _addProduct = product => ({type: ADD_PRODUCT, product})
const _increment = product => ({type: INCREMENT, product})
const _decrement = product => ({type: DECREMENT, product})
const _removeItem = product => ({type: REMOVE_ITEM, product})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getOrders = () => {
  return async dispatch => {
    const response = await axios.get(`/api/orders`)
    dispatch(_getOrders(response.data))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders

    default:
      return state
  }
}

export {getOrders}
