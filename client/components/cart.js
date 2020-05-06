import React from 'react'
import {connect} from 'react-redux'
import ProductList from './productList.js'

const Cart = ({orderItems, products}) => {
  if (!orderItems) {
    return <h3>Cart is Empty</h3>
  } else {
    console.log(orderItems)
    return (
      <div className="cart-wrapper">
        <h1>Cart</h1>
        <ul>
          {products
            .filter(product => orderItems.productId === product.id)
            .map(product => <ProductList key={product.id} {...product} />)}
        </ul>
        <p> Total Price: </p>
        <button className="cart-button"> Checkout </button>
        <button className="cart-button"> Clear Cart </button>
      </div>
    )
  }
}

const mapStateToProps = ({orderItems, products}) => {
  return {orderItems, products}
}

export default connect(mapStateToProps)(Cart)
