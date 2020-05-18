import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class Confirmation extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      order: {},
      orderItems: {}
      //   products: {},
    }
  }
  async componentDidMount() {
    const user = await axios.get('/auth/me')
    const order = await axios.get('/api/orders/')
    const orderItems = await axios.get('/api/orderitems/')
    // const products = await axios.get('/api/products/')

    const recentOrder = order.data
      .filter(_order => _order.userId === user.data.id)
      .slice(-1)[0]

    const recentOrderItems = orderItems.data.filter(
      orderItem => orderItem.orderId === recentOrder.id
    )

    // const recentProducts = products.data.find(
    //   (product) => product.id === recentOrderItems.productId
    // )

    console.log(recentOrder)
    console.log(recentOrderItems)

    this.setState({
      user: user.data,
      order: recentOrder,
      orderItems: recentOrderItems
      //   products: recentProducts,
    })
  }

  render() {
    // const {orders, user} = this.props
    const order = this.state.order
    const orderItems = this.state.orderItems
    const products = this.state

    if (!orderItems.length) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <div>
            <p>Thank you for shopping with us!</p>
            <p>
              You will receive an email confirmation soon with shipping and
              tracking details
            </p>
          </div>

          <ul key={Math.random()} className="OrderCard">
            <div>
              <li>Order #: {orderItems.id}</li>
              <li>Status: {orderItems.status}</li>
            </div>
            <div>
              {/* <ul>
                {orderItems.map((orderItem) => (
                  <li className="orderItem-title" key={Math.random()}>
                    {
                      products.find(
                        (product) => product.id === orderItem.productId
                      ).title
                    }{' '}
                    x {orderItem.quantity}
                  </li>
                ))}
              </ul> */}
              <div>${order.totalPrice}</div>
            </div>
          </ul>
        </div>
      )
    }
  }
}

const mapStateToProps = ({products}) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(Confirmation)
