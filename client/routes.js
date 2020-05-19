import React, {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
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
  CreateProduct,
  Orders,
  Account,
  Listings,
  UserList,
  OrderList,
  Checkout,
  UserReviews,
  Confirmation
} from './components'
import {me, getProducts, getUsers} from './store'
import EditProduct from './components/EditProduct'
import {
  getOrderItems,
  orderItems,
  deleteOrderItem,
  createOrderItem,
  updateOrderItem
} from './store/orderItems'
import {getOrders, createOrder, updateOrder} from './store/orders'
import {createUser} from './store/user'
import {getReviews} from './store/reviews'

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super()
    this.createGuestUser = this.createGuestUser.bind(this)
    this.mergeCart = this.mergeCart.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialData()
  }

  componentDidUpdate(prevProps) {
    if (!this.props.user.id && !localStorage.guestId) {
      this.createGuestUser()
    }

    if (this.props.isLoggedIn && !prevProps.isLoggedIn) {
      this.mergeCart()
    }
  }

  async createGuestUser() {
    const guestId = await uuidv4()
    await localStorage.setItem('guestId', guestId)
    await this.props.createUser({id: guestId})
    await this.props.createGuestCart({userId: guestId})
  }

  async mergeCart() {
    const {orders, orderItems, user, products} = this.props

    const userCart = await orders.find(
      order => order.userId === user.id && order.status === 'cart'
    )

    const guestCart = await orders.find(
      order =>
        order.userId === localStorage.getItem('guestId') &&
        order.status === 'cart'
    )

    const userOrderItems = await orderItems.filter(
      orderItem => orderItem.orderId === userCart.id
    )

    const guestOrderItems = await orderItems.filter(
      orderItem => orderItem.orderId === guestCart.id
    )

    let guestOrderItemsPrice = 0
    await guestOrderItems.forEach(guestOrderItem => {
      guestOrderItemsPrice =
        guestOrderItemsPrice +
        parseFloat(
          products.find(product => product.id === guestOrderItem.productId)
            .price
        ) *
          guestOrderItem.quantity

      const existingOrderItem = userOrderItems.find(
        userOrderItem =>
          userOrderItem.productId === guestOrderItem.productId &&
          userOrderItem.orderId === userCart.id
      )

      if (!existingOrderItem) {
        this.props.newOrderItem({
          productId: guestOrderItem.productId,
          orderId: userCart.id
        })
      } else {
        this.props.incrementOrderItem({
          productId: guestOrderItem.productId,
          orderId: userCart.id,
          quantity: existingOrderItem.quantity + guestOrderItem.quantity
        })
      }
    })

    await this.props.updateTotalPrice(
      {
        id: guestCart.id,
        totalPrice: 0
      },
      () => {}
    )

    await this.props.updateTotalPrice(
      {
        id: userCart.id,
        totalPrice:
          parseFloat(userCart.totalPrice) + parseFloat(guestOrderItemsPrice)
      },
      () => {}
    )

    await guestOrderItems.forEach(orderItem =>
      this.props.removeFromGuestCart(orderItem)
    )
  }

  render() {
    const {isLoggedIn} = this.props
    const {user} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={UserHome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/confirmation/:id" component={Confirmation} />
        {isLoggedIn && (
          <Switch>
            <Route exact path="/account" component={Account} />
            <Route exact path="/listings" component={Listings} />
            <Route exact path="/userlist" component={UserList} />
            <Route exact path="/orderlist" component={OrderList} />
            <Route
              exact
              path="/review/:orderId/:productId"
              component={UserReviews}
            />
            <Route exact path="/products/:id/edit" component={EditProduct} />
            <Route exact path="/newProduct" component={CreateProduct} />
            {/* Routes placed here are only available after logging in */}
          </Switch>
        )}
        {user.admin == true && <Switch />}
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
    isLoggedIn: !!state.user.id,
    user: state.user,
    users: state.users,
    orders: state.orders,
    orderItems: state.orderItems,
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getUsers())
      dispatch(getProducts())
      dispatch(getOrders())
      dispatch(getOrderItems())
      dispatch(getReviews())
    },

    createUser: user => dispatch(createUser(user)),
    createGuestCart: order => dispatch(createOrder(order)),
    removeFromGuestCart: orderItem => dispatch(deleteOrderItem(orderItem)),
    updateTotalPrice: (order, push) => dispatch(updateOrder(order, push)),
    newOrderItem: orderItem => dispatch(createOrderItem(orderItem)),
    incrementOrderItem: orderItem => dispatch(updateOrderItem(orderItem))
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
