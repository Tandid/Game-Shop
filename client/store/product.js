import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getProducts = products => ({type: GET_PRODUCTS, products})
const _createProduct = product => ({type: CREATE_PRODUCT, product})
const _removeProduct = id => ({type: REMOVE_PRODUCT, product: id})
const _editProduct = product => ({type: EDIT_PRODUCT, product})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getProducts = () => {
  return async dispatch => {
    const response = await axios.get('/api/products')
    dispatch(_getProducts(response.data))
  }
}

const createProduct = product => {
  return async dispatch => {
    const response = await axios.post('/api/products', product)
    dispatch(_createProduct(response.data))
  }
}

const removeProduct = id => {
  return async dispatch => {
    await axios.delete(`/api/products/${id}`)
    dispatch(_removeProduct(id))
  }
}

//need to work on this
const editProduct = id => {
  return async dispatch => {
    const response = await axios.put(`/api/products/${id}`)
    dispatch(_editProduct(response.data))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.product]
    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.product) //need to work on this
    case EDIT_PRODUCT:
      return state //need to work on this
    default:
      return state
  }
}

export {getProducts, createProduct, removeProduct, editProduct}
