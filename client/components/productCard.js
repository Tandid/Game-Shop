import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import orderItems, {createOrderItem} from '../store/orderItems'
import {getOrders} from '../store/orders'

class ProductCard extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchOrders(this.props.user.id)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.fetchOrders(this.props.user.id)
    }
  }

  render() {
    const {id, title, imageURL, price, inventory, orders, cart} = this.props
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
            this.props.addToCart({productId: id, orderId: cart.id})
          }
        >
          {' '}
          Add to Cart{' '}
        </button>
        <p>Quantity: {inventory}</p>
      </li>
    )
  }
}

const mapStateToProps = ({orders, user}) => {
  const cart = orders.find(order => order.status === 'cart')
  return {
    cart,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: id => {
      dispatch(getOrders(id))
    },
    addToCart: orderItem => dispatch(createOrderItem(orderItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
