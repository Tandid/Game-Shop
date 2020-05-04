import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const ProductCard = ({id, title, imageURL, price, inventory}) => {
  return (
    <li key={id} className="card">
      <h4>{title}</h4>
      <br />
      <img src={imageURL} />
      <p>${price}</p>
      <Link to={`/products/${id}`} className="productLink">
        More Details
      </Link>
      <button> Add to Cart </button>
      <p>Quantity: {inventory}</p>
    </li>
  )
}

const mapStateToProps = state => {
  return {
    state
  }
}

export default connect(mapStateToProps)(ProductCard)
