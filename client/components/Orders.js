import React from 'react'
import {connect} from 'react-redux'
import OrderCard from './OrderCard'
import {getOrders} from '../store/orders'

class Orders extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchOrders(this.props.user.id)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.fetchOrders(this.props.user.id)
    }
  }

  render() {
    const {orders} = this.props
    return (
      <div>
        {orders
          .filter(order => order.status !== 'cart')
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

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: id => {
      dispatch(getOrders(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
