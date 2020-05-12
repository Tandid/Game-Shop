import React from 'react'
import {connect} from 'react-redux'
// import {removeOrder} from '../store'

class OrderList extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {users, orders, orderItems} = this.props
    console.log(orders, users)
    return (
      <div className="wrapper">
        <h2>Orders</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer Name</th>
                <th>Order Status</th>
                <th>Change Status</th>
                <th>Cancellation</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {users.find(user => user.id === order.userId).firstName}
                    </td>
                    <td>{order.status}</td>
                    <td>
                      <button> Complete Order </button>
                    </td>
                    <td>
                      <button>Cancel Order</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({users, orders, products, orderItems}) => {
  return {
    users,
    orders,
    products,
    orderItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delete: id => dispatch(removeOrder(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
