import axios from 'axios'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_REVIEWS = 'GET_REVIEWS'
const CREATE_REVIEW = 'CREATE_REVIEW'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getReviews = reviews => ({type: GET_REVIEWS, reviews})
const _createReview = review => ({type: CREATE_REVIEW, review})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getReviews = () => {
  return async dispatch => {
    const response = await axios.get(`/api/reviews`)
    dispatch(_getReviews(response.data))
  }
}

const createReview = review => {
  return async dispatch => {
    j
    const response = await axios.post('/api/reviews', review)
    dispatch(_createReview(response.data))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
const reviews = function(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews

    case CREATE_REVIEW:
      state = [...state, action.review]
      return state

    default:
      return state
  }
}

export {reviews, getReviews, createReview}
