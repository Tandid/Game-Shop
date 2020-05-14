import React from 'react'
import {connect} from 'react-redux'

const OrderCard = ({id, status, totalPrice, orderItems, products}) => {
  if (!orderItems.length || !products.length) {
    return <h1>Loading...</h1>
  } else {
    return (
      <ul key={Math.random()} className="OrderCard">
        <div>
          <li>Order #: {id}</li>
          <li>Status: {status}</li>
        </div>
        <div>
          <ul>
            {orderItems
              .filter(orderItem => orderItem.orderId === id)
              .map(orderItem => (
                <li key={Math.random()}>
                  {
                    products.find(product => product.id === orderItem.productId)
                      .title
                  }{' '}
                  x {orderItem.quantity}
                </li>
              ))}
          </ul>
          <div>${totalPrice}</div>
        </div>
      </ul>
    )
  }
}

const mapStateToProps = ({orderItems, products}) => {
  return {orderItems, products}
}

export default connect(mapStateToProps)(OrderCard)
