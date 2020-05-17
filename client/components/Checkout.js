import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ProductList from './ProductList'
import {updateOrder, createOrder} from '../store/orders'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

// import Payment from './Payment' //add this component through STRIPE

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleToken = this.handleToken.bind(this)
  }

  async onSubmit(event) {
    event.preventDefault()
    try {
      await this.props.acceptOrder(
        {id: this.props.cart.id, status: 'accepted'},
        this.props.history.push
      )
      await this.props.createNewCart({
        userId: this.props.user.id
          ? this.props.user.id
          : parseInt(localStorage.getItem('guestId')),
        status: 'cart'
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  async handleToken(token) {
    // console.log({token, addresses})
    const response = await axios.post('/api/stripe/checkout', {
      token,
      order: this.props.cart
    })

    const {status} = response.data

    console.log(status)

    // if (status === 'success') {
    //   console.log('success! check emails for details')
    // } else {
    //   console.log('something went wrong')
    // }
  }

  render() {
    const {onSubmit, handleToken} = this
    const {user, cart, orderItems, products} = this.props
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
                <button
                  className="cart-button"
                  onClick={onSubmit}
                  disabled={!cartOrderItems.length}
                >
                  Process Payment
                </button>
              </div>
            </div>

            <div className="checkout-form">
              <h1> Items in Cart </h1>
              <div className="cart-container">
                <ul>
                  {cartOrderItems.map(orderItem => (
                    <ProductList key={Math.random()} {...orderItem} />
                  ))}
                </ul>
              </div>
              <p>Total Price: </p>
            </div>
          </form>
          <StripeCheckout
            stripeKey="pk_test_E1dVa6505p5SZc6KIGv6yrQB00yOT20RJM"
            token={handleToken}
            billingAddress
            shippingAddress
            amount={cart.totalPrice * 100}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = ({user, orders, orderItems, products}) => {
  const cart = user.id
    ? orders.find(order => order.status === 'cart' && order.userId === user.id)
    : orders.find(
        order =>
          order.status === 'cart' &&
          order.userId === parseInt(localStorage.getItem('guestId'))
      )
  return {
    user,
    cart,
    orderItems,
    products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    acceptOrder: (order, push) => dispatch(updateOrder(order, push)),
    createNewCart: order => dispatch(createOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
