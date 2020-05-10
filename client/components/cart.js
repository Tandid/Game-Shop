import React from 'react'
import {connect} from 'react-redux'
import ProductList from './productList.js'
import {getOrders, updateOrder, createOrder} from '../store/orders'
import {getOrderItems, deleteOrderItem} from '../store/orderItems.js'

class Cart extends React.Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.orderItems.length !== prevProps.orderItems.length) {
  //     this.props.loadOrderItems()
  //   }
  // }

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
    const {orderItems, cart, products, user} = this.props
    if (!cart || !orderItems || !products) {
      return <h3>Loading...</h3>
    } else {
      return (
        <div className="cart-wrapper">
          <h1>Cart</h1>
          <ul>
            {orderItems
              .filter(orderItem => orderItem.orderId === cart.id)
              .map(orderItem => (
                <ProductList key={Math.random()} {...orderItem} />
              ))}
          </ul>
          <p> Total Price: $</p>
          <button className="cart-button" onClick={onSubmit}>
            {' '}
            Checkout{' '}
          </button>
          <button
            className="cart-button"
            onClick={() => {
              orderItems
                .filter(orderItem => orderItem.orderId === cart.id)
                .forEach(orderItem => this.props.removeFromCart(orderItem))
            }}
          >
            Clear Cart
          </button>
        </div>
      )
    }
  }
}

const mapStateToProps = ({orderItems, products, orders, user}) => {
  const cart = orders.find(
    order => order.status === 'cart' && order.userId === user.id
  )
  return {cart, orderItems, products, user}
}

const mapDispatchToProps = dispatch => {
  return {
    // loadOrderItems: () => dispatch(getOrderItems()),
    removeFromCart: orderItem => dispatch(deleteOrderItem(orderItem)),
    acceptOrder: (order, push) => dispatch(updateOrder(order, push)),
    createNewCart: order => dispatch(createOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
