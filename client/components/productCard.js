import React from 'react'
import {connect} from 'react-redux'

const ProductCard = ({id, title, imageURL, price, inventory, products}) => {
  return (
    <li key={id} className="card">
      <p>{title}</p>
      <br />
      <img src={imageURL} />
      <p>${price}</p>
      <button>Add to Cart</button>
      <p>Quantity: {inventory}</p>
    </li>
  )
}

const mapStateToProps = ({products}) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(ProductCard)
