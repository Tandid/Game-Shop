import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import orderItems, {createOrderItem} from '../store/orderItems'
import {getOrders} from '../store/orders'

class ProductCard extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {id, title, imageURL, price, inventory, cart} = this.props
    if (!id || !title || !imageURL || !price || !inventory || !cart) {
      return <h1>Loading...</h1>
    } else {
      return (
        <li key={id} className="card">
          <h4>{title}</h4>
          <br />
          <img src={imageURL} />
          <p>${price}</p>
          <Link to={`/products/${id}`} className="productLink">
            More Details
          </Link>
          <button
            onClick={() =>
              this.props.addToCart({productId: this.props.id, orderId: cart.id})
            }
          >
            Add to Cart
          </button>
          <p>Quantity: {inventory}</p>
        </li>
      )
    }
  }
}

const mapStateToProps = ({orders, user}) => {
  const cart = orders.find(
    order => order.status === 'cart' && order.userId === user.id
  )
  return {
    orders,
    cart,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: orderItem => dispatch(createOrderItem(orderItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
