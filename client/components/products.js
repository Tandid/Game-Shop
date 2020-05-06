import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProducts} from '.././store'
import ProductCard from './productCard.js'

// const Products = ({products}) => {
//   if (!products.length) {
//     return <h1>Loading...</h1>
//   } else {
//     console.log(products)
//     return (
//       <div>
//         <Link to="/newProduct">Create New Product</Link>
//         <ul className="wrapper">
//           {products.map(product => {
//             return <ProductCard key={product.id} {...product} />
//           })}
//         </ul>
//       </div>
//     )
//   }
// }

class Products extends React.Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    try {
      await this.props.load()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {products} = this.props
    if (!products.length) {
      return <h1>Loading...</h1>
    } else {
      console.log(products)
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
}

const mapStateToProps = ({products}) => {
  return {products}
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(getProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
