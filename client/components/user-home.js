import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3 className="welcome">Welcome, {email}</h3>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapStateToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
