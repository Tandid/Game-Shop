import React from 'react'
import {connect} from 'react-redux'

const ProductList = ({id, title, imageURL, price, inventory, products}) => {
  return (
    <li key={id} className="cart">
      <img src={imageURL} />
      <p>{title}</p>
      <p>${price}</p>
      <button>Remove From Cart</button>
      <div>
        <p>Quantity: 1</p>
        <button> - </button>
        <button> + </button>
      </div>
    </li>
  )
}

const mapStateToProps = ({products}) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(ProductList)
