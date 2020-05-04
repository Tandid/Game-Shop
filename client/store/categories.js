import axios from 'axios'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_CATEGORIES = 'GET_CATEGORIES'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getCategories = categories => ({type: GET_CATEGORIES, categories})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getCategories = () => {
  return async dispatch => {
    const response = await axios.get('/api/categories')
    dispatch(_getCategories(response.data))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export {getCategories}
