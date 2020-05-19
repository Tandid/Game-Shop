import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createOrderItem, updateOrderItem} from '../store/orderItems'
import {updateOrder} from '../store/orders'

class ProductCard extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
  }

  async addToCart(event) {
    event.preventDefault()
    try {
      const existingOrderItem = this.props.orderItems.find(
        orderItem =>
          orderItem.productId === this.props.id &&
          orderItem.orderId === this.props.cart.id
      )
      if (!existingOrderItem) {
        await this.props.newOrderItem({
          productId: this.props.id,
          orderId: this.props.cart.id
        })
      } else {
        await this.props.incrementOrderItem({
          productId: this.props.id,
          orderId: this.props.cart.id,
          quantity: existingOrderItem.quantity + 1
        })
      }
      await this.props.updateTotalPrice(
        {
          id: this.props.cart.id,
          totalPrice:
            parseFloat(this.props.cart.totalPrice) +
            parseFloat(this.props.price)
        },
        () => {}
      )
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    const {addToCart} = this
    const {
      id,
      title,
      imageURL,
      price,
      inventory,
      cart,
      orderItems,
      reviews
    } = this.props

    const totalReviews = reviews.filter(review => review.productId === id)
      .length

    const totalRating = reviews
      .filter(review => review.productId === id)
      .reduce((accum, review) => {
        return (accum += review.stars)
      }, 0)

    const averageRating = totalRating / totalReviews

    if (!id || !cart) {
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
          <button onClick={addToCart}>Add to Cart</button>
          <p>Rating: {averageRating}</p>
        </li>
      )
    }
  }
}

const mapStateToProps = ({orders, user, orderItems, reviews}) => {
  const cart = user.id
    ? orders.find(order => order.status === 'cart' && order.userId === user.id)
    : orders.find(
        order =>
          order.status === 'cart' &&
          order.userId === parseInt(localStorage.getItem('guestId'))
      )

  return {
    cart,
    user,
    orderItems,
    reviews
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadOrders: () => dispatch(getOrders()),
    newOrderItem: orderItem => dispatch(createOrderItem(orderItem)),
    incrementOrderItem: orderItem => dispatch(updateOrderItem(orderItem)),
    updateTotalPrice: (order, push) => dispatch(updateOrder(order, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
