import React from 'react'
import {connect} from 'react-redux'
import {getDetails, updateProduct} from '../store/product'

class EditProductDetails extends React.Component {
  constructor(props) {
    let title = ''
    let description = ''
    let imageURL = ''
    let price = ''
    let inventory = ''
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
    }
    super()
    this.state = {
      title,
      description,
      imageURL,
      price,
      inventory,
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
          inventory: parseInt(this.state.inventory)
        },
        this.props.history.push
      )
    } catch (exception) {
      this.setState({error: exception.response.data.message})
    }
  }

  render() {
    const {onSubmit} = this
    const {title, description, imageURL, price, inventory, error} = this.state
    const {product} = this.props
    return (
      <form onSubmit={onSubmit} className="editProductDetails">
        {error}
        <input
          value={title}
          onChange={event => this.setState({title: event.target.value})}
        />
        <input
          value={description}
          onChange={event => this.setState({description: event.target.value})}
        />
        <input
          value={imageURL}
          onChange={event => this.setState({imageURL: event.target.value})}
        />
        <input
          value={price}
          onChange={event => this.setState({price: event.target.value})}
        />
        <input
          value={inventory}
          onChange={event => this.setState({inventory: event.target.value})}
        />
        <button
          disabled={
            title === product.title &&
            description === product.description &&
            imageURL === product.imageURL &&
            price === product.price &&
            inventory === product.inventory
          }
        >
          Update
        </button>
      </form>
    )
  }
}

const mapPropsToState = ({product}) => {
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

export default connect(mapPropsToState, mapDispatchToProps)(EditProductDetails)
