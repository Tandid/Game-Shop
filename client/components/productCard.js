import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import orderItems, {createOrderItem, updateOrderItem} from '../store/orderItems'
import {getOrders} from '../store/orders'

class ProductCard extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {id, title, imageURL, price, inventory, cart, orderItems} = this.props
    if (!id || !title || !imageURL || !price || !inventory || !cart) {
      return <h1>Loading...</h1>
    } else {
      const existingOrderItem = orderItems.find(
        orderItem =>
          orderItem.productId === this.props.id && orderItem.orderId === cart.id
      )
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
            onClick={() => {
              if (!existingOrderItem) {
                this.props.addToCart({
                  productId: this.props.id,
                  orderId: cart.id
                })
              } else {
                this.props.increment({
                  productId: this.props.id,
                  orderId: cart.id,
                  quantity: existingOrderItem.quantity + 1
                })
              }
            }}
          >
            Add to Cart
          </button>
          <p>Inventory: {inventory}</p>
        </li>
      )
    }
  }
}

const mapStateToProps = ({orders, user, orderItems}) => {
  const cart = orders.find(
    order => order.status === 'cart' && order.userId === user.id
  )
  return {
    cart,
    user,
    orderItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: orderItem => dispatch(createOrderItem(orderItem)),
    increment: orderItem => dispatch(updateOrderItem(orderItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
