import axios from 'axios'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_ORDER_ITEMS = 'GET_ORDER_ITEMS'
const CREATE_ORDER_ITEM = 'CREATE_ORDER_ITEM'
const UPDATE_ORDER_ITEM = 'UPDATE_ORDER_ITEM'
const DELETE_ORDER_ITEM = 'DELETE_ORDER_ITEM'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getOrderItems = orderItems => ({type: GET_ORDER_ITEMS, orderItems})
const _createOrderItem = orderItem => ({type: CREATE_ORDER_ITEM, orderItem})
const _updateOrderItem = orderItem => ({type: UPDATE_ORDER_ITEM, orderItem})
const _deleteOrderItem = orderItem => ({type: DELETE_ORDER_ITEM, orderItem})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getOrderItems = () => {
  return async dispatch => {
    const response = await axios.get('/api/orderItems')
    dispatch(_getOrderItems(response.data))
  }
}

const createOrderItem = orderItem => {
  return async dispatch => {
    const response = await axios.post('/api/orderItems', orderItem)
    dispatch(_createOrderItem(response.data))
  }
}

const updateOrderItem = orderItem => {
  return async dispatch => {
    const {data: updatedOrderItem} = await axios.put(
      `/api/orders/${orderItem.orderId}/orderItems/${orderItem.productId}`,
      orderItem
    )
    dispatch(_updateOrderItem(updatedOrderItem))
  }
}

const deleteOrderItem = orderItem => {
  return async dispatch => {
    await axios.delete(
      `/api/orders/${orderItem.orderId}/orderItems/${orderItem.productId}`
    )
    dispatch(_deleteOrderItem(orderItem))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_ITEMS:
      return action.orderItems

    case CREATE_ORDER_ITEM:
      state = [...state, action.orderItem]
      return state

    case UPDATE_ORDER_ITEM:
      state = state.map(
        orderItem =>
          orderItem === action.orderItem ? action.orderItem : orderItem
      )
      return state

    case DELETE_ORDER_ITEM:
      state = state.filter(orderItem => orderItem !== action.orderItem)

    default:
      return state
  }
}

export {getOrderItems, createOrderItem, updateOrderItem, deleteOrderItem}
