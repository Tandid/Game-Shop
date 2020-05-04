import React from 'react'
import {connect} from 'react-redux'

const ProductList = ({id, title, imageURL, price, products}) => {
  let count = 1
  return (
    <li key={id} className="cart-items">
      <img src={imageURL} />
      <p>{title}</p>
      <p>${price * count}</p>
      <p>Quantity: {count}</p>
      <div>
        <button onClick={ev => console.log(count--)}> - </button>
        <button onClick={ev => console.log(count++)}> + </button>
      </div>
      <button onClick={ev => console.log(id)}>Remove From Cart</button>
    </li>
  )
}

const mapStateToProps = ({products}) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(ProductList)
