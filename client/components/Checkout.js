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
      <div className="wrapper">
        <form onSubmit={this.handleSubmit}>
          <h1>Checkout</h1>
          <div>
            <div>
              <input
                type="text"
                name="firstName"
                onChange={this.handleChange}
                value={user.firstName ? user.firstName : this.state.firstName}
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                onChange={this.handleChange}
                value={user.lastName ? user.lastName : this.state.lastName}
                placeholder="Last Name"
              />
              <input
                type="text"
                name="email"
                onChange={this.handleChange}
                value={user.email ? user.email : this.state.email}
                placeholder="Email"
              />
              <input
                type="text"
                name="address"
                onChange={this.handleChange}
                value={user.address ? user.address : this.state.address}
                placeholder="Address"
              />
              {/* <Payment/> */}
            </div>
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
