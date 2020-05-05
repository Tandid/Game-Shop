import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const ProductDetails = ({product, cart, categories}) => {
  if (!product) {
    return <h1>Loading...</h1>
  } else {
    const category = categories.find(
      category => category.id === product.categoryId
    )
    if (!category) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className="product-details">
          <div className="details-1">
            <h3>{product.title}</h3>
            <img className="img-details" src={product.imageURL} />
          </div>

          <div className="details-2">
            <p>Description: {product.description}</p>
            <p>Platform: {category.name}</p>
            <p>Reviews</p>
          </div>

          <div className="details-3">
            <p>${product.price}</p>
            <p>Quantity: {product.inventory}</p>
            <button onClick={ev => cart.items.push(`${product.id}`)}>
              Add to Cart
            </button>
            <Link to={`/products/${product.id}/edit`}>Edit</Link>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = ({products, cart, categories}, {match}) => {
  const product = products.find(prod => prod.id == match.params.id)
  return {
    product,
    cart,
    categories
  }
}

export default connect(mapStateToProps)(ProductDetails)
