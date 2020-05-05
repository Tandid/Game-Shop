import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Products,
  Cart,
  ProductDetails,
  ProductForm
} from './components'
import {me, getProducts, getCart, getDetails} from './store'
import EditProductDetails from './components/EditProductDetails'
import {getCategories} from './store/categories'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={UserHome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/cart" component={Cart} />
        {isLoggedIn && (
          <Switch>
            <Route exact path="/newProduct" component={ProductForm} />
            <Route
              exact
              path="/products/:id/edit"
              component={EditProductDetails}
            />
            {/* Routes placed here are only available after logging in */}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getProducts())
      dispatch(getCart())
      dispatch(getCategories())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
