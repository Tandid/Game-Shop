import React from 'react'
import {connect} from 'react-redux'

const ProductList = ({id, title, imageURL, price, inventory, products}) => {
  return (
    <li key={id} className="cart-items">
      <img src={imageURL} />
      <p>{title}</p>
      <p>${price}</p>
      <p>Quantity: 1</p>
      <div>
        <button> - </button>
        <button> + </button>
      </div>
      <button>Remove From Cart</button>
    </li>
  )
}

const mapStateToProps = ({products}) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(ProductList)
