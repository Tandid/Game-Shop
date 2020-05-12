import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

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
    const {user} = this.props
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
            <h1> Payment Method </h1>
            {/* <Payment/> */}
            <button disabled> Process Payment </button>
          </div>
          <div className="checkout-form">
            <h1> Items in Cart </h1>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(Checkout)
