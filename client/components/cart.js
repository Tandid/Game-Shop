import React from 'react'
import {connect} from 'react-redux'
import ProductList from './productList.js'
import {getOrders} from '.././store/orders'
import {getOrderItems} from '../store/orderItems.js'

class Cart extends React.Component {
  constructor(props) {
    let cart = []
    if (props.cart && props.cart.length) {
      cart = props.cart
    }
    super()
    this.state = {
      cart
    }
  }

  async componentDidMount() {
    const orderItems = this.props.loadOrderItems()
  }

  async componentDidUpdate(prevProps) {
    // incorrect to avoid infinite loop
    if (this.props.orderItems === prevProps.orderItems) {
      await this.props.loadOrderItems()
    }
  }

  render() {
    const {cart, orderItems, products, user} = this.props
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
          <p> Total Price: </p>
          <button className="cart-button"> Checkout </button>
          <button className="cart-button"> Clear Cart </button>
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
    loadOrderItems: () => dispatch(getOrderItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
