import axios from 'axios'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_ORDER_ITEMS = 'GET_ORDER_ITEMS'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getOrderItems = orderItems => ({type: GET_ORDER_ITEMS, orderItems})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getOrderItems = () => {
  return async dispatch => {
    const response = await axios.get('/api/orderItems')
    dispatch(_getOrderItems(response.data))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_ITEMS:
      return action.orderItems
    default:
      return state
  }
}

export {getOrderItems}
