import React from 'react'
import {connect} from 'react-redux'
import ProductList from './productList.js'

const Cart = ({cart, products}) => {
  if (!cart.items) {
    return <h3>Cart is Empty</h3>
  } else {
    console.log(cart.items)
    return (
      <div className="cart-wrapper">
        <h1>Cart</h1>
        <ul>
          {products
            .filter(product => cart.items.includes(String(product.id)))
            .map(product => <ProductList key={product.id} {...product} />)}
        </ul>
        <p> Total Price: </p>
        <button className="cart-button"> Checkout </button>
        <button className="cart-button"> Clear Cart </button>
      </div>
    )
  }
}

const mapStateToProps = ({cart, products}) => {
  return {cart, products}
}

export default connect(mapStateToProps)(Cart)
