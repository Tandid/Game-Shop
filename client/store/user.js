import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const _removeUser = id => ({type: REMOVE_USER, user: id})
const _updateUser = () => ({type: UPDATE_USER})

/**
 * THUNK CREATORS
 */
const me = () => async dispatch => {
  try {
    const response = await axios.get('/auth/me')
    dispatch(getUser(response.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

const auth = (email, password, method) => async dispatch => {
  let response
  try {
    response = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(response.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(_removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

const removeUser = id => {
  return async dispatch => {
    await axios.delete(`/api/users/${id}`)
    dispatch(_removeUser(id))
  }
}

const updateUser = user => {
  return async dispatch => {
    const response = await axios.put(`/api/users/${user.id}`, user)
    dispatch(_updateUser(response.data))
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return state.filter(user => user.id !== action.user)
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}

export {me, auth, logout, updateUser, removeUser}
