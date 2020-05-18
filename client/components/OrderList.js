import React from 'react'
import {connect} from 'react-redux'
// import {removeOrder} from '../store'
import {updateOrder} from '../store/orders'

class OrderList extends React.Component {
  constructor() {
    super()
    // this.completeOrder = this.completeOrder.bind(this)
  }

  // async completeOrder(event) {
  //   await this.props.updateOrder({id: event.target.value, status: 'completed'})
  // }

  render() {
    const {users, orders, orderItems} = this.props
    console.log(orders, users)
    return (
      <div className="wrapper">
        <h2>Accepted Orders</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Complete Order</th>
                <th>Cancel Order</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders
                  .filter(order => order.status === 'accepted')
                  .map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>
                        {order.firstName} {order.lastName}
                      </td>
                      <td>{order.email}</td>
                      <td>{order.address}</td>
                      <td>
                        <button
                          disabled={order.status !== 'accepted'}
                          onClick={() =>
                            this.props.updateOrder(
                              {
                                id: order.id,
                                status: 'completed'
                              },
                              () => {}
                            )
                          }
                        >
                          {' '}
                          Complete Order{' '}
                        </button>
                      </td>
                      <td>
                        <button
                          disabled={order.status !== 'accepted'}
                          onClick={() =>
                            this.props.updateOrder(
                              {
                                id: order.id,
                                status: 'canceled'
                              },
                              () => {}
                            )
                          }
                        >
                          Cancel Order
                        </button>
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
    delete: id => dispatch(removeOrder(id)),
    updateOrder: (order, push) => dispatch(updateOrder(order, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
