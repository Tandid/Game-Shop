import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ProductList from './ProductList'
import {deleteOrderItem} from '../store/orderItems'

class Cart extends React.Component {
  constructor() {
    super()
  }

  render() {
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

const mapStateToProps = ({orders, orderItems, user}) => {
  const cart = orders.find(
    order => order.userId === user.id && order.status === 'cart'
  )

  return {
    cart,
    orderItems,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: orderItem => dispatch(deleteOrderItem(orderItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
