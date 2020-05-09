import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeUser} from '../store'

class UserList extends React.Component {
  constructor() {
    super()
    this.delete = this.deleteUser.bind(this)
  }

  deleteUser = id => {
    this.props.delete(id)
  }

  render() {
    const {user} = this.props
    return (
      <div className="wrapper">
        <h2>Users</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Admin Status</th>
                <th>Change Status</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {/* {users &&
                users.map((user) => ( */}
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.admin === true ? 'Active' : 'Inactive'}</td>
                <td>
                  <button>
                    {user.admin === true ? 'Remove Admin' : 'Make Admin'}
                  </button>
                </td>
                <td>
                  <button onClick={() => this.deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
              // ))}
            </tbody>
          </table>
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
    delete: id => dispatch(removeUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
