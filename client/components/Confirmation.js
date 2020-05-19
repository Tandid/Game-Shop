import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrder} from '../store/orders'

class Confirmation extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const orderId = this.props.match.params.id
    this.props.loadOrder(orderId)
  }

  render() {
    const {products, order, orderItems} = this.props

    if (!products.length || !order.id || !orderItems.length) {
      return <h1>Loading...</h1>
    } else {
      const thisOrderItems = orderItems.filter(
        orderItem => orderItem.orderId === order.id
      )
      return (
        <div className="OrderCard">
          <div>
            <p>Thank you for shopping with us!</p>
            <p>
              You will receive an email confirmation soon with shipping and
              tracking details
            </p>
          </div>

          <ul key={Math.random()}>
            <div>
              <li>Order #: {order.id}</li>
              <li>Status: {order.status}</li>
            </div>
            <div>
              <ul>
                {thisOrderItems.map(orderItem => (
                  <li className="orderItem-title" key={Math.random()}>
                    {
                      products.find(
                        product => product.id === orderItem.productId
                      ).title
                    }
                    x {orderItem.quantity}
                  </li>
                ))}
              </ul>
              <div>${order.totalPrice}</div>
            </div>
          </ul>
        </div>
      )
    }
  }
}

const mapStateToProps = ({products, order, orderItems}) => {
  return {
    products,
    order,
    orderItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadOrder: id => dispatch(getOrder(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)
