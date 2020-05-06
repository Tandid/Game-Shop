import axios from 'axios'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getOrders = orders => ({type: GET_ORDERS, orders})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getOrders = () => {
  return async dispatch => {
    const response = await axios.get('/api/orders')
    dispatch(_getOrders(response.data))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}

export {getOrders}
