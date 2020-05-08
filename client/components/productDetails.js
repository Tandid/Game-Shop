import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getDetails} from '../store/product'

class ProductDetails extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const productId = this.props.match.params.id
    this.props.getProduct(productId)
  }

  render() {
    const {product, cart} = this.props
    if (!product) {
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
            <p>Platform: {product.category}</p>
            <p>Reviews</p>
          </div>

          <div className="details-3">
            <p>${product.price}</p>
            <p>Quantity: {product.inventory}</p>
            <button onClick={ev => cart.items.push(`${product.id}`)}>
              Add to Cart
            </button>
            <Link to={`/products/${product.id}/edit`} className="productLink">
              Edit
            </Link>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = ({products, product, cart}, {match}) => {
  return {
    products,
    product,
    cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(getDetails(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
