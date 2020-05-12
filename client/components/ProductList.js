import React from 'react'
import {connect} from 'react-redux'
import {
  deleteOrderItem,
  updateOrderItem,
  getOrderItem,
  getOrderItems
} from '../store/orderItems'

class ProductList extends React.Component {
  constructor() {
    super()
    this.iterate = this.iterate.bind(this)
  }

  async iterate(event) {
    try {
      if (event.target.value === '+') {
        await this.props.addOrSubtract({
          orderId: this.props.orderId,
          productId: this.props.productId,
          quantity: this.props.quantity + 1
        })
      } else if (this.props.quantity > 1) {
        await this.props.addOrSubtract({
          orderId: this.props.orderId,
          productId: this.props.productId,
          quantity: this.props.quantity - 1
        })
      } else {
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

  render() {
    const {iterate} = this
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
          <button
            onClick={() => this.props.removeFromCart({orderId, productId})}
          >
            Remove From Cart
          </button>
        </li>
      )
    }
  }
}

const mapStateToProps = ({products, orderItems, orderItem}) => {
  return {
    products,
    orderItems,
    orderItem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadOrderItems: () => dispatch(getOrderItems()),
    addOrSubtract: orderItem => dispatch(updateOrderItem(orderItem)),
    removeFromCart: orderItem => dispatch(deleteOrderItem(orderItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
