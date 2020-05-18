import React from 'react'
import {connect} from 'react-redux'
import {getDetails, updateProduct} from '../store/product'

class EditProduct extends React.Component {
  constructor(props) {
    let title = ''
    let description = ''
    let imageURL = ''
    let price = ''
    let inventory = ''
    let category = ''
    if (props.product) {
      if (props.product.title) {
        title = props.product.title
      }
      if (props.product.description) {
        description = props.product.description
      }
      if (props.product.imageURL) {
        imageURL = props.product.imageURL
      }
      if (props.product.price) {
        price = props.product.price
      }
      if (props.product.inventory) {
        inventory = props.product.inventory
      }
      if (props.product.category) {
        category = props.product.category
      }
    }
    super()
    this.state = {
      title,
      description,
      imageURL,
      price,
      inventory,
      category,
      error: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.id
    this.props.getProduct(productId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.title !== this.props.product.title) {
      this.setState({title: this.props.product.title})
    }
    if (prevProps.product.description !== this.props.product.description) {
      this.setState({description: this.props.product.description})
    }
    if (prevProps.product.imageURL !== this.props.product.imageURL) {
      this.setState({imageURL: this.props.product.imageURL})
    }
    if (prevProps.product.price !== this.props.product.price) {
      this.setState({price: this.props.product.price})
    }
    if (prevProps.product.inventory !== this.props.product.inventory) {
      this.setState({inventory: this.props.product.inventory})
    }
    if (prevProps.product.category !== this.props.product.category) {
      this.setState({category: this.props.product.category})
    }
  }

  async onSubmit(event) {
    event.preventDefault()
    try {
      this.props.update(
        {
          id: this.props.product.id,
          title: this.state.title,
          description: this.state.description,
          imageURL: this.state.imageURL,
          price: parseFloat(this.state.price),
          inventory: parseInt(this.state.inventory),
          category: this.state.category
        },
        this.props.history.push
      )
    } catch (exception) {
      this.setState({error: exception.response.data.message})
    }
  }

  render() {
    const {onSubmit} = this
    const {
      title,
      description,
      imageURL,
      price,
      inventory,
      category,
      error
    } = this.state
    const {product} = this.props
    return (
      <div className="form-wrapper">
        <form className="edit-form">
          {error}
          <h3>Edit Product Details</h3>
          <p className="row">
            Product Title:{' '}
            <input
              value={title}
              onChange={event => this.setState({title: event.target.value})}
            />
          </p>
          <p className="row">
            Description:{' '}
            <input
              value={description}
              onChange={event =>
                this.setState({description: event.target.value})
              }
            />
          </p>
          <p className="row">
            ImageURL:{' '}
            <input
              value={imageURL}
              onChange={event => this.setState({imageURL: event.target.value})}
            />
          </p>
          <p className="row">
            Price:{' '}
            <input
              value={price}
              onChange={event => this.setState({price: event.target.value})}
            />
          </p>
          <p className="row">
            Inventory:{' '}
            <input
              value={inventory}
              onChange={event => this.setState({inventory: event.target.value})}
            />
          </p>

          <p className="row">
            Platform:{' '}
            <select
              value={category}
              onChange={ev => this.setState({category: ev.target.value})}
            >
              <option value="">--Select a Platform--</option>
              <option value="Xbox">Xbox</option>
              <option value="Playstation">Playstation</option>
              <option value="PC">PC</option>
              <option value="Nintendo">Switch</option>
            </select>
          </p>

          <button
            disabled={
              title === product.title &&
              description === product.description &&
              imageURL === product.imageURL &&
              price === product.price &&
              inventory === product.inventory &&
              category === product.category
            }
            onClick={onSubmit}
          >
            Update
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({product}) => {
  return {
    product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(getDetails(id)),
    update: (product, push) => dispatch(updateProduct(product, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
