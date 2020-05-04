import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './productCard.js'

const Popular = ({mostPopular}) => {
  return (
    <div className="most-popular">
      <h1>Most Popular</h1>
      <ul className="wrapper">
        {mostPopular.map(product => {
          return <ProductCard key={product.id} {...product} />
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = ({products}) => {
  const mostPopular = products.slice(0, 3) //this is just an example for the first 3 games, fix logic later
  return {mostPopular}
}

export default connect(mapStateToProps)(Popular)
