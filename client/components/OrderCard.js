import React from 'react'
import {connect} from 'react-redux'

const OrderCard = ({id, status, orderItems, products}) => {
  if (!orderItems.length || !products.length) {
    return <h1>Loading...</h1>
  } else {
    return (
      <ul key={id} className="OrderCard">
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
                  }
                </li>
              ))}
          </ul>
        </div>
      </ul>
    )
  }
}

const mapStateToProps = ({orderItems, products}) => {
  return {orderItems, products}
}

export default connect(mapStateToProps)(OrderCard)
