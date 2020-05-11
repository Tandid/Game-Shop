import React from 'react'
import {connect} from 'react-redux'
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

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      console.log('changed quantity')
    }
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
          <p> Total Price: $ </p>
          <button className="cart-button" onClick={onSubmit}>
            Checkout
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
