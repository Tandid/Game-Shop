import React from 'react'
import {connect} from 'react-redux'
import OrderCard from './OrderCard'

// class Orders extends React.Component {
//   constructor() {
//     super()
//   }

//   render() {
//     return <h1>Hello World</h1>
//   }
// }

class Orders extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {orders} = this.props
    return (
      <div>{orders.map(order => <OrderCard key={order.id} {...order} />)}</div>
    )
  }
}

const mapStateToProps = ({orders}) => {
  return {
    orders
  }
}

export default connect(mapStateToProps)(Orders)
