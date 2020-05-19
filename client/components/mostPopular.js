import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard.js'

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

const mapStateToProps = ({products, reviews}) => {
  const topProducts = () => {
    let result = []
    let filteredProducts = products
    while (result.length < 3) {
      // ----------
      const topProduct = filteredProducts.reduce((accum, product) => {
        const productReviews = reviews.filter(
          review => review.productId === product.id
        )

        const average =
          productReviews.reduce((acc, review) => {
            acc += review.stars
            return acc
          }, 0) / productReviews.length

        if (!accum.average || average > accum.average) {
          accum.id = product.id
          accum.average = average
          accum.title = product.title
        }

        return accum
      }, {})
      //-------
      result.push(topProduct)
      filteredProducts = filteredProducts.filter(product => {
        return result.find(prod => product.id !== prod.id)
      })
    }

    return result
  }

  console.log(topProducts())

  //-------
  const mostPopular = products.filter(product => {
    return topProducts().find(prod => prod.id === product.id)
  })

  return {mostPopular}
}

export default connect(mapStateToProps)(Popular)
