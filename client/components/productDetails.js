import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getDetails} from '../store/product'
import orderItems, {createOrderItem, updateOrderItem} from '../store/orderItems'

class ProductDetails extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const productId = this.props.match.params.id
    this.props.getProduct(productId)
  }

  render() {
    const {product, cart, orderItems} = this.props
    if (!orderItems || !cart) {
      return <h1>Loading...</h1>
    } else {
      const existingOrderItem = orderItems.find(
        orderItem =>
          orderItem.productId === product.id && orderItem.orderId === cart.id
      )
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
            <button
              onClick={() => {
                if (!existingOrderItem) {
                  this.props.addToCart({
                    productId: product.id,
                    orderId: cart.id
                  })
                } else {
                  this.props.increment({
                    productId: product.id,
                    orderId: cart.id,
                    quantity: existingOrderItem.quantity + 1
                  })
                }
              }}
            >
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

const mapStateToProps = (
  {products, product, orders, user, orderItems},
  {match}
) => {
  const cart = orders.find(
    order => order.status === 'cart' && order.userId === user.id
  )

  return {
    products,
    product,
    cart,
    user,
    orderItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(getDetails(id)),
    addToCart: orderItem => dispatch(createOrderItem(orderItem)),
    increment: orderItem => dispatch(updateOrderItem(orderItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
