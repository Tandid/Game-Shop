import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ProductCard from './productCard.js'

const Products = ({products}) => {
  if (!products) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div>
        <Link to="/newProduct">Create New Product</Link>
        <ul className="wrapper">
          {products.map(product => {
            return <ProductCard key={product.id} {...product} />
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({products}) => {
  return {products}
}

export default connect(mapStateToProps)(Products)
