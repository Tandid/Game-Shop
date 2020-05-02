import axios from 'axios'

/**
 * ACTION TYPES ------------------------------------------------
 */

const GET_CART = 'GET_CART'

/**
 * INITIAL STATE --------------------------------------------------
 */

const initialState = {}

/**
 * ACTION CREATORS
 */
const _getCart = cart => ({type: GET_CART, cart})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getCart = () => {
  return async dispatch => {
    const response = (await axios.get(`/api/cart`)).data
    dispatch(_getCart(response))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart

    default:
      return state
  }
}

export {getCart}
