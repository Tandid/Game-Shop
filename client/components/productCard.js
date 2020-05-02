import React from 'react'
import {connect} from 'react-redux'

const ProductCard = ({
  id,
  title,
  imageURL,
  description,
  price,
  inventory,
  products
}) => {
  return (
    <li key={id} className="card">
      <p>{title}</p>
      <br />
      <img src={imageURL} />
      <p>{description}</p>
      <p>{price}</p>
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
