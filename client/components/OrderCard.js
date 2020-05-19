import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {product} from '../store'

const OrderCard = ({id, status, totalPrice, orderItems, products}) => {
  if (!orderItems.length || !products.length) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div className="order-card-wrapper">
        <ul className="order-card" key={Math.random()}>
          <div>
            <li>Order #: {id}</li>
            <li>Status: {status}</li>
          </div>
          <div>
            <ul>
              {orderItems
                .filter(orderItem => orderItem.orderId === id)
                .map(orderItem => (
                  <div className="order-card-items" key={Math.random()}>
                    <li>X{orderItem.quantity}</li>
                    <li>
                      {
                        products.find(
                          product => product.id === orderItem.productId
                        ).title
                      }
                    </li>

                    <li>
                      $
                      {
                        products.find(
                          product => product.id === orderItem.productId
                        ).price
                      }
                      <Link
                        className="back-button"
                        to={`/review/${id}/${orderItem.productId}`}
                      >
                        Write Review
                      </Link>
                    </li>
                  </div>
                ))}
            </ul>
            <div className="total">Total Price: ${totalPrice}</div>
          </div>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({orderItems, products}) => {
  return {orderItems, products}
}

export default connect(mapStateToProps)(OrderCard)
