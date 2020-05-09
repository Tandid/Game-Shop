import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProducts, removeProduct} from '../store'

class Listings extends React.Component {
  constructor() {
    super()
    this.delete = this.deleteProduct.bind(this)
  }

  deleteProduct = id => {
    this.props.delete(id)
  }

  render() {
    const {products} = this.props
    return (
      <div className="wrapper">
        <h2>Product Listings</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Price</th>
                <th>Inventory</th>
                <th>Edit Product</th>
                <th>Delete Product</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <Link to={`/products/${product.id}`}>
                        {product.title}
                      </Link>
                    </td>
                    <td>{product.price}</td>
                    <td>{product.inventory}</td>
                    <td>
                      <Link to={`/products/${product.id}/edit`}>Edit</Link>
                    </td>
                    <td>
                      <button onClick={() => this.deleteProduct(product.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
          <Link className="link-button" to="/newProduct">
            Add Product
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({products}) => {
  return {products}
}

const mapDispatchToProps = dispatch => {
  return {
    delete: id => dispatch(removeProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings)
