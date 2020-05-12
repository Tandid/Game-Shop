import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import ProductList from './ProductList'

// import Payment from './Payment' //add this component through STRIPE

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: ''
      // order: {},
    }

    this.handleChange = this.handleChange.bind(this)
  }

  // async componentDidMount() {
  //   const response = await axios.get(`/api/orders/${order.id}`)
  //   this.setState({...this.state, order: response.data})
  // }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  render() {
    const {user, cart, orderItems, products} = this.props
    console.log({CART: cart, ORDER: orderItems, PRODUCT: products})
    if (!cart || !orderItems) {
      return <h1>Loading...</h1>
    } else {
      const cartOrderItems = orderItems.filter(
        orderItem => orderItem.orderId === cart.id
      )
      return (
        <div className="form-wrapper">
          <form className="split" onSubmit={this.handleSubmit}>
            <div className="checkout-form">
              <h1>Shipping/Billing Information</h1>
              <input
                type="text"
                name="firstName"
                onChange={this.handleChange}
                value={this.state.firstName}
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                onChange={this.handleChange}
                value={this.state.lastName}
                placeholder="Last Name"
              />
              <input
                type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                placeholder="Email"
              />
              <input
                type="text"
                name="address"
                onChange={this.handleChange}
                value={user.address ? user.address : this.state.address}
                placeholder="Address"
              />
              <div>
                <h1> Payment Method </h1>
                <Link className="link-button" to="/cart">
                  Edit Cart
                </Link>
                {/* <Payment/> */}
                <button disabled> Process Payment </button>
              </div>
            </div>
            <div className="checkout-form">
              <h1> Items in Cart </h1>
              <ul>
                {cartOrderItems.map(orderItem => (
                  <ProductList key={Math.random()} {...orderItem} />
                ))}
              </ul>
            </div>
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = ({user, orders, orderItems, products}) => {
  const cart = orders.find(
    order => order.userId === user.id && order.status === 'cart'
  )
  return {
    user,
    cart,
    orderItems,
    products
  }
}

export default connect(mapStateToProps)(Checkout)
