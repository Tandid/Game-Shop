import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Popular from './mostPopular.js'

export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <div className="welcome">
        <h3>Welcome {email}</h3>
        <a href="/products">Enter Now</a>
      </div>
      <Popular />
    </div>
  )
}

const mapStateToProps = ({user}) => {
  return {
    email: user.email
  }
}

export default connect(mapStateToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
