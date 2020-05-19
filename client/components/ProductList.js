import React from 'react'
import {connect} from 'react-redux'
import {
  deleteOrderItem,
  updateOrderItem,
  getOrderItems
} from '../store/orderItems'
import {updateOrder} from '../store/orders'

class ProductList extends React.Component {
  constructor() {
    super()
    this.iterate = this.iterate.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  async iterate(event) {
    event.preventDefault()
    const product = this.props.products.find(
      product => product.id === this.props.productId
    )
    try {
      if (event.target.value === '+') {
        await this.props.updateTotalPrice(
          {
            id: this.props.orderId,
            totalPrice:
              parseFloat(this.props.cart.totalPrice).toFixed(2) +
              parseFloat(product.price).toFixed(2)
          },
          () => {}
        )
        await this.props.addOrSubtract({
          orderId: this.props.orderId,
          productId: this.props.productId,
          quantity: this.props.quantity + 1
        })
      } else if (this.props.quantity > 1) {
        await this.props.updateTotalPrice(
          {
            id: this.props.orderId,
            totalPrice:
              parseFloat(this.props.cart.totalPrice).toFixed(2) -
              parseFloat(product.price).toFixed(2)
          },
          () => {}
        )
        await this.props.addOrSubtract({
          orderId: this.props.orderId,
          productId: this.props.productId,
          quantity: this.props.quantity - 1
        })
      } else {
        await this.props.updateTotalPrice(
          {
            id: this.props.orderId,
            totalPrice:
              parseFloat(this.props.cart.totalPrice).toFixed(2) -
              parseFloat(product.price).toFixed(2)
          },
          () => {}
        )
        this.props.removeFromCart({
          orderId: this.props.orderId,
          productId: this.props.productId
        })
      }
      await this.props.loadOrderItems()
    } catch (exception) {
      console.log(exception)
    }
  }

  async destroy(event) {
    event.preventDefault()
    const product = this.props.products.find(
      product => product.id === this.props.productId
    )
    try {
      await this.props.updateTotalPrice(
        {
          id: this.props.orderId,
          totalPrice:
            parseFloat(this.props.cart.totalPrice).toFixed(2) -
            parseFloat(product.price * this.props.quantity).toFixed(2)
        },
        () => {}
      )
      await this.props.removeFromCart({
        orderId: this.props.orderId,
        productId: this.props.productId
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    const {iterate, destroy} = this
    const {orderId, productId, quantity, products, orderItem} = this.props
    const product = products.find(product => product.id === productId)
    if (!product) {
      return <h1>Loading...</h1>
    } else {
      return (
        <li className="cart-items">
          <img src={product.imageURL} />
          <p>{product.title}</p>
          <p>${product.price * quantity}</p>
          <p>Quantity: {quantity}</p>
          <div>
            <button value="-" onClick={iterate}>
              -
            </button>
            <button value="+" onClick={iterate}>
              +
            </button>
          </div>
          <button onClick={destroy}>Remove From Cart</button>
        </li>
      )
    }
  }
}

const mapStateToProps = ({products, orderItems, orderItem, orders, user}) => {
  const cart = user.id
    ? orders.find(order => order.status === 'cart' && order.userId === user.id)
    : orders.find(
        order =>
          order.status === 'cart' &&
          order.userId === localStorage.getItem('guestId')
      )

  return {
    products,
    orderItems,
    orderItem,
    cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadOrderItems: () => dispatch(getOrderItems()),
    addOrSubtract: orderItem => dispatch(updateOrderItem(orderItem)),
    removeFromCart: orderItem => dispatch(deleteOrderItem(orderItem)),
    updateTotalPrice: (order, push) => dispatch(updateOrder(order, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
