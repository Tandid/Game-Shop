import React from 'react'
import {connect} from 'react-redux'

const OrderCard = ({id, status, orderItems, products}) => {
  return (
    <ul key={id}>
      <li>Order #: {id}</li>
      <li>Status: {status}</li>
      <ul>
        {orderItems
          .filter(orderItem => orderItem.orderId === id)
          .map(orderItem => (
            <li key={orderItem.id}>
              {
                products.find(product => product.id === orderItem.productId)
                  .title
              }
            </li>
          ))}
      </ul>
    </ul>
  )
}

const mapStateToProps = ({orderItems, products}) => {
  return {orderItems, products}
}

export default connect(mapStateToProps)(OrderCard)
