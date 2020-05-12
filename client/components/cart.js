import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ProductList from './ProductList'
import {updateOrder, createOrder} from '../store/orders'
import {deleteOrderItem, getOrderItems} from '../store/orderItems'

class Cart extends React.Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadOrderItems()
  }

  async onSubmit(event) {
    event.preventDefault()
    try {
      await this.props.acceptOrder(
        {id: this.props.cart.id, status: 'accepted'},
        this.props.history.push
      )
      await this.props.createNewCart({
        userId: this.props.user.id,
        status: 'cart'
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    const {onSubmit} = this
    const {cart, orderItems} = this.props
    if (!cart || !orderItems) {
      return <h1>Loading...</h1>
    } else {
      const cartOrderItems = orderItems.filter(
        orderItem => orderItem.orderId === cart.id
      )
      return (
        <div className="cart-wrapper">
          <h1>Cart</h1>
          <ul>
            {cartOrderItems.map(orderItem => (
              <ProductList key={Math.random()} {...orderItem} />
            ))}
          </ul>
          <p> Total Price: $ </p>
          {/* <button
            className="cart-button"
            onClick={onSubmit}
            disabled={!cartOrderItems.length}
          >
            Checkout
          </button> */}
          <button
            className="cart-button"
            onClick={() => {
              cartOrderItems.forEach(orderItem =>
                this.props.removeFromCart(orderItem)
              )
            }}
            disabled={!cartOrderItems.length}
          >
            Clear Cart
          </button>
          <Link className="link-button" to="/checkout">
            Checkout Page
          </Link>
        </div>
      )
    }
  }
}

const mapStateToProps = ({orders, products, orderItems, user}) => {
  const cart = orders.find(
    order => order.userId === user.id && order.status === 'cart'
  )

  return {
    cart,
    products,
    orderItems,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadOrderItems: () => dispatch(getOrderItems()),
    acceptOrder: (order, push) => dispatch(updateOrder(order, push)),
    createNewCart: order => dispatch(createOrder(order)),
    removeFromCart: orderItem => dispatch(deleteOrderItem(orderItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
