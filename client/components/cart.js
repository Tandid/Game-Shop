import React from 'react'
import {connect} from 'react-redux'
import ProductList from './productList.js'
import {getOrders} from '.././store/orders'

class Cart extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchOrders(this.props.user.id)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.fetchOrders(this.props.user.id)
    }
  }

  render() {
    const {cart, orderItems, products} = this.props
    if (!cart || !orderItems || !products) {
      return <h3>Loading...</h3>
    } else {
      return (
        <div className="cart-wrapper">
          <h1>Cart</h1>
          <ul>
            {orderItems
              .filter(orderItem => orderItem.orderId === cart.id)
              .map(orderItem => <li>{orderItem.quantity}</li>)}
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
  const cart = orders.find(order => order.status === 'cart')
  return {cart, orderItems, products, user}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: id => dispatch(getOrders(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
