import React from 'react'
import {connect} from 'react-redux'
import {
  updateOrderItem,
  deleteOrderItem,
  getOrderItems,
  getOrderItem
} from '../store/orderItems'

class ProductList extends React.Component {
  constructor(props) {
    super()
  }

  componentDidMount() {
    this.props.loadOrderItem({
      orderId: this.props.orderId,
      productId: this.props.productId
    })
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.orderItem.quantity !== prevProps.orderItem.quantity ||
      this.props.orderItems.length !== prevProps.orderItems.length
    ) {
      this.props.loadOrderItems()
    }
  }

  render() {
    const {productId, products, addOrSubtract} = this.props
    const product = products.find(product => product.id === productId)
    if (!product) {
      return <h1>Loading...</h1>
    } else {
      return (
        <li className="cart-items">
          <img src={product.imageURL} />
          <p>{product.title}</p>
          <p>${product.price * this.props.quantity}</p>
          <p>Quantity: {this.props.quantity}</p>{' '}
          <div>
            <button
              onClick={() => {
                addOrSubtract({
                  productId: this.props.productId,
                  orderId: this.props.orderId,
                  quantity: this.props.quantity - 1
                })
              }}
            >
              {' '}
              -{' '}
            </button>
            <button
              onClick={() => {
                addOrSubtract({
                  productId: this.props.productId,
                  orderId: this.props.orderId,
                  quantity: this.props.quantity + 1
                })
              }}
            >
              {' '}
              +{' '}
            </button>{' '}
          </div>
          <button
            onClick={() =>
              this.props.removeFromCart({
                productId: this.props.productId,
                orderId: this.props.orderId
              })
            }
          >
            Remove From Cart
          </button>{' '}
        </li>
      )
    }
  }
}

const mapStateToProps = ({orderItem, orderItems, products}) => {
  return {
    orderItem,
    orderItems,
    products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadOrderItem: orderItem => dispatch(getOrderItem(orderItem)),
    loadOrderItems: () => dispatch(getOrderItems()),
    addOrSubtract: orderItem => dispatch(updateOrderItem(orderItem)),
    removeFromCart: orderItem => dispatch(deleteOrderItem(orderItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
