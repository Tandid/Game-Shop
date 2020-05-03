import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const ProductDetails = ({product}) => {
  console.log(product)
  // const {id, title, description, imageURL, price, inventory} = product
  if (!product) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div>
        <h1>{product.title}</h1>
        <Link to={`/products/${product.id}/edit`}>Edit</Link>
        <div key={product.id} className="details">
          <img src={product.imageURL} />
          <div>
            <p>{product.description}</p>
            <p>Reviews</p>
          </div>
          <div>
            <p>${product.price}</p>
            <p>Quantity: {product.inventory}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({products}, {match}) => {
  const product = products.find(prod => prod.id == match.params.id)

  return {
    product
  }
}

export default connect(mapStateToProps)(ProductDetails)
