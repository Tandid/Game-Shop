import axios from 'axios'

/**
 * ACTION TYPES ------------------------------------------------
 */
const LOAD_PRODUCT = 'LOAD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const _loadProduct = product => ({type: LOAD_PRODUCT, product})
const _updateProduct = product => ({type: UPDATE_PRODUCT, product})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const loadProduct = id => {
  return async dispatch => {
    const response = (await axios.get(`/api/products/${id}`)).data
    dispatch(_loadProduct(response))
  }
}

const updateProduct = (product, push) => {
  return async dispatch => {
    const {data: updatedProduct} = await axios.put(
      `/api/products/${product.id}`,
      product
    )
    dispatch(_updateProduct(updatedProduct))
    push('/products')
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCT:
      state = action.product
      return state

    case UPDATE_PRODUCT:
      state = action.product
      return state

    default:
      return state
  }
}

export {loadProduct, updateProduct}
