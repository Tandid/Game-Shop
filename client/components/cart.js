import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './productCard.js'

const Cart = ({cart, products}) => {
  if (!cart.items) {
    return <h3>Loading...</h3>
  } else {
    console.log(cart.items)
    return (
      <div>
        <ul>
          {products
            .filter(product => cart.items.includes(String(product.id)))
            .map(product => <ProductCard key={product.id} {...product} />)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({cart, products}) => {
  return {cart, products}
}

export default connect(mapStateToProps)(Cart)
