import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout, me} from '../store'

class Navbar extends React.Component {
  constructor() {
    super()
    this.userSignOut = this.userSignOut.bind(this)
  }

  async userSignOut() {
    await this.props.signOut()
    await this.props.getUser()
  }

  render() {
    const {userSignOut} = this
    const {signOut, isLoggedIn} = this.props
    return (
      <div>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <NavLink to="/">ProGamerz</NavLink>
              <NavLink to="/products"> Games </NavLink>
              <NavLink to="/cart"> Cart </NavLink>
              <NavLink to="/orders"> Order History </NavLink>
              <NavLink to="/account"> Account </NavLink>
              <a href="#" onClick={userSignOut}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <NavLink to="/">ProGamerz</NavLink>
              <NavLink to="/products"> Products </NavLink>
              <NavLink to="/cart"> Cart(#)</NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <NavLink to="/">ProGamerz</NavLink>
//           <NavLink to="/products"> Games </NavLink>
//           <NavLink to="/cart"> Cart </NavLink>
//           <NavLink to="/orders"> Orders </NavLink>
//           <NavLink to="/account"> Account Info </NavLink>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <NavLink to="/">ProGamerz</NavLink>
//           <NavLink to="/products"> Products </NavLink>
//           <NavLink to="/cart"> Cart(#)</NavLink>
//           <NavLink to="/login">Login</NavLink>
//           <NavLink to="/signup">Sign Up</NavLink>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(logout()),
    getUser: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  // handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
