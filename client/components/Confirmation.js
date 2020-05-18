import React, {Component} from 'react'
import axios from 'axios'

class Confirmation extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      products: {}
    }
  }
  async componentDidMount() {
    const user = await axios.get('/auth/me')
    // const recentOrder = await axios.get('/api/orders/')
    this.setState({
      user: user.data
      //   products: recentOrder.data.products,
    })
  }

  render() {
    const user = this.state.user
    const products = this.state.products
    return (
      <div>
        <p>Thank you for shopping with us!</p>
        <p>
          You will receive an email confirmation soon with shipping and tracking
          details
        </p>
      </div>
    )
  }
}

export default Confirmation
