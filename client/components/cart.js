import React from 'react'
import {connect} from 'react-redux'
import ProductList from './productList.js'
import {getOrders} from '../store/orders'
import {getOrderItems, deleteOrderItem} from '../store/orderItems.js'

class Cart extends React.Component {
  constructor(props) {
    // let orderItems = []
    // if (props.orderItems && props.orderItems.length) {
    //   orderItems = props.orderItems
    // }
    super()
    // this.state = {
    //   orderItems,
    // }
  }

  componentDidMount() {
    this.props.loadOrderItems()
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.orderItems.length !== prevProps.orderItems.length) {
  //     this.props.loadOrderItems()
  //   }
  // }

  render() {
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
          <button className="cart-button"> Checkout </button>
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
    loadOrderItems: () => dispatch(getOrderItems()),
    removeFromCart: orderItem => dispatch(deleteOrderItem(orderItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
