import React from 'react'
import {connect} from 'react-redux'
import OrderCard from './OrderCard'
import {getOrders} from '../store/orders'

class Orders extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {orders, user} = this.props
    return (
      <div>
        {orders
          .filter(order => order.userId === user.id && order.status !== 'cart')
          .map(order => <OrderCard key={order.id} {...order} />)}
      </div>
    )
  }
}

const mapStateToProps = ({orders, user}) => {
  return {
    orders,
    user
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchOrders: id => {
//       dispatch(getOrders(id))
//     }
//   }
// }

export default connect(mapStateToProps)(Orders)
