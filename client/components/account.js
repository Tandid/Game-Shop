import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me, updateUser} from '../store'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    await this.props.getUser()
  }

  render() {
    const {user} = this.props
    console.log(user)
    return (
      <div className="profile-wrapper">
        <div>
          <h3>User Profile</h3>
          <img className="img-details" src={user.imageURL} />
        </div>
        <div>
          {user.admin === true && (
            <div>
              <Link className="link-button" to="/listings">
                Manage Products
              </Link>
              <Link className="link-button" to="/orders">
                Manage Orders
              </Link>
            </div>
          )}
          <p> Status: {user.admin === true ? 'Admin' : 'User'}</p>
          <p> First Name: {user.firstName}</p>
          <p> Last Name: {user.lastName}</p>
          <p> Address: {user.address}</p>
          <p> Email: {user.email}</p>
          <button className="button-edit">Edit Profile</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(me()),
    updateUser: id => dispatch(updateUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
