import React from 'react'
import {connect} from 'react-redux'
import ProductList from './ProductList'
import {deleteOrderItem, getOrderItems} from '../store/orderItems'
import {updateOrder} from '../store/orders'

class Cart extends React.Component {
  constructor() {
    super()
    this.clearCart = this.clearCart.bind(this)
  }

  async clearCart(event) {
    event.preventDefault()
    const cartOrderItems = await this.props.orderItems.filter(
      orderItem => orderItem.orderId === this.props.cart.id
    )
    try {
      let orderItemsPrice = 0
      await cartOrderItems.forEach(orderItem => {
        console.log(orderItemsPrice)
        orderItemsPrice =
          orderItemsPrice +
          parseFloat(
            this.props.products.find(
              product => product.id === orderItem.productId
            ).price
          ) *
            orderItem.quantity
      })
      await this.props.updateTotalPrice(
        {
          id: this.props.cart.id,
          totalPrice: this.props.cart.totalPrice - orderItemsPrice
        },
        () => {}
      )
      await cartOrderItems.forEach(orderItem => {
        this.props.removeFromCart(orderItem)
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    const {clearCart} = this
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
          <p> Total Price: ${cart.totalPrice} </p>

          <button
            className="cart-button"
            onClick={clearCart}
            disabled={!cartOrderItems.length}
          >
            Clear Cart
          </button>
          <a href="/checkout">
            <button disabled={!cartOrderItems.length}>Checkout Page</button>
          </a>
        </div>
      )
    }
  }
}

const mapStateToProps = ({orders, orderItems, user, products}) => {
  const cart = orders.find(
    order => order.userId === user.id && order.status === 'cart'
  )

  return {
    cart,
    orderItems,
    user,
    products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadOrderItems: () => dispatch(getOrderItems()),
    removeFromCart: orderItem => dispatch(deleteOrderItem(orderItem)),
    updateTotalPrice: (order, push) => dispatch(updateOrder(order, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
