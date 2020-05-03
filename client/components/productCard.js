import React from 'react'
import {connect} from 'react-redux'

const ProductCard = ({id, title, imageURL, price, inventory}) => {
  return (
    <li key={id} className="card">
      <p>{title}</p>
      <br />
      <img src={imageURL} />
      <p>${price}</p>
      <a href={'products/' + id}> More Details </a>
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
