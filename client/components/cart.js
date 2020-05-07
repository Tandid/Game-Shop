import React from 'react'
import {connect} from 'react-redux'
import ProductList from './productList.js'
import {getOrders} from '.././store/orders'

class Cart extends React.Component {
  constructor() {
    super()
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

export default connect(mapStateToProps)(Cart)
