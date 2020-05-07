import React from 'react'
import {connect} from 'react-redux'
import {updateOrderItem} from '../store/orderItems'

class ProductList extends React.Component {
  constructor() {
    super()
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
          <p>${product.price}</p>
          <p>Quantity: {this.props.quantity}</p>{' '}
          <div>
            <button
              onClick={() =>
                addOrSubtract(
                  {
                    id: this.props.id,
                    productId: this.props.productId,
                    orderId: this.props.orderId,
                    quantity: 0
                  },
                  () => {}
                )
              }
            >
              {' '}
              -{' '}
            </button>
            <button
              onClick={() =>
                addOrSubtract(
                  {
                    id: this.props.id,
                    productId: this.props.productId,
                    orderId: this.props.orderId,
                    quantity: 0
                  },
                  () => {}
                )
              }
            >
              {' '}
              +{' '}
            </button>{' '}
          </div>
          <button onClick={ev => console.log(productId)}>
            Remove From Cart
          </button>{' '}
        </li>
      )
    }
  }
}

const mapStateToProps = ({orderItems, products}) => {
  return {
    orderItems,
    products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrSubtract: (orderItem, push) =>
      dispatch(updateOrderItem(orderItem, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
