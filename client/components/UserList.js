import React, {useImperativeHandle} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeUser, updateUser, getUsers} from '../store'

class UserList extends React.Component {
  constructor() {
    super()
    // this.delete = this.deleteUser.bind(this)
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const {users} = this.props
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
              {users &&
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.admin === true ? 'Admin' : 'User'}</td>
                    <td>
                      <button
                        onClick={() =>
                          this.props.makeOrRemoveAdmin(
                            {id: user.id, admin: !user.admin},
                            () => {}
                          )
                        }
                      >
                        {user.admin === true ? 'Remove Admin' : 'Make Admin'}
                      </button>
                    </td>
                    <td>
                      <button onClick={() => this.props.delete(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({users}) => {
  return {
    users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delete: id => dispatch(removeUser(id)),
    makeOrRemoveAdmin: (user, push) => dispatch(updateUser(user, push)),
    loadUsers: () => dispatch(getUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
