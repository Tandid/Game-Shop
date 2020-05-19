import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
const CREATE_USER = 'CREATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const _getUsers = users => ({type: GET_USERS, users})
const getUser = user => ({type: GET_USER, user})
const _removeUser = id => ({type: REMOVE_USER, id})
const _updateUser = user => ({type: UPDATE_USER, user})
const _updateProfile = user => ({type: UPDATE_PROFILE, user})
const _createUser = user => ({type: CREATE_USER, user})

/**
 * THUNK CREATORS
 */

const getUsers = () => {
  return async dispatch => {
    const response = await axios.get('/api/users')
    dispatch(_getUsers(response.data))
  }
}

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

// const updateUser = (user) => {
//   return async (dispatch) => {
//     const response = await axios.put(`/api/users/${user.id}`, user)
//     dispatch(_updateUser(response.data))
//   }
// }

const updateUser = user => {
  return async dispatch => {
    const {data: updatedUser} = await axios.put(`/api/users/${user.id}`, user)
    dispatch(_updateUser(updatedUser))
  }
}

const updateProfile = (user, push) => {
  return async dispatch => {
    const {data: updatedUser} = await axios.put(`/api/users/${user.id}`, user)
    dispatch(_updateProfile(updatedUser))
    push('/account')
  }
}

const createUser = user => {
  return async dispatch => {
    const response = await axios.post('/api/users', user)
    dispatch(_createUser(response.data))
  }
}

/**
 * REDUCER
 */
const user = function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return state
    // return state.filter(user => user.id !== action.user)
    case UPDATE_PROFILE:
      return action.user
    default:
      return state
  }
}

const users = function(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users

    case CREATE_USER:
      return [...state, action.user]

    case UPDATE_USER:
      state = state.map(
        user => (user.id === action.user.id ? action.user : user)
      )

    case REMOVE_USER:
      return state.filter(user => user.id !== action.id)

    default:
      return state
  }
}

export {
  me,
  auth,
  logout,
  updateUser,
  updateProfile,
  removeUser,
  getUsers,
  user,
  users,
  createUser
}
