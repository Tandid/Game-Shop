import React from 'react'
import {connect} from 'react-redux'

const ProductDetails = ({product}) => {
  return (
    <h1>product details</h1>

    // <div key={id} className="details">
    //   <img src={imageURL} />
    //   <div>
    //     <p>{title}</p>
    //     <p>{description}</p>
    //     <p>Reviews</p>
    //   </div>
    //   <div>
    //     <p>${price}</p>
    //     <p>Quantity: {inventory}</p>
    //     <button>Add to Cart</button>
    //   </div>
    // </div>
  )
}

const mapStateToProps = ({products}, {match}) => {
  const product = products.filter(prod => prod.id == match.params.id)
  console.log(product[0])

  return {
    product
  }
}

export default connect(mapStateToProps)(ProductDetails)
