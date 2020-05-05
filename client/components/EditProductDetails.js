import React from 'react'
import {connect} from 'react-redux'
import {loadProduct, updateProduct} from '../store/singleProduct'

class EditProductDetails extends React.Component {
  constructor(props) {
    let title = ''
    let description = ''
    let imageURL = ''
    let price = ''
    let inventory = ''
    if (props.singleProduct) {
      if (props.singleProduct.title) {
        title = props.singleProduct.title
      }
      if (props.singleProduct.description) {
        description = props.singleProduct.description
      }
      if (props.singleProduct.imageURL) {
        imageURL = props.singleProduct.imageURL
      }
      if (props.singleProduct.price) {
        price = props.singleProduct.price
      }
      if (props.singleProduct.inventory) {
        inventory = props.singleProduct.inventory
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
    if (prevProps.singleProduct.title !== this.props.singleProduct.title) {
      this.setState({title: this.props.singleProduct.title})
    }
    if (
      prevProps.singleProduct.description !==
      this.props.singleProduct.description
    ) {
      this.setState({description: this.props.singleProduct.description})
    }
    if (
      prevProps.singleProduct.imageURL !== this.props.singleProduct.imageURL
    ) {
      this.setState({imageURL: this.props.singleProduct.imageURL})
    }
    if (prevProps.singleProduct.price !== this.props.singleProduct.price) {
      this.setState({price: this.props.singleProduct.price})
    }
    if (
      prevProps.singleProduct.inventory !== this.props.singleProduct.inventory
    ) {
      this.setState({inventory: this.props.singleProduct.inventory})
    }
  }

  async onSubmit(event) {
    event.preventDefault()
    try {
      this.props.update(
        {
          id: this.props.singleProduct.id,
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
    const {singleProduct} = this.props
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
            title === singleProduct.title &&
            description === singleProduct.description &&
            imageURL === singleProduct.imageURL &&
            price === singleProduct.price &&
            inventory === singleProduct.inventory
          }
        >
          Update
        </button>
      </form>
    )
  }
}

const mapPropsToState = ({singleProduct}) => {
  return {
    singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(loadProduct(id)),
    update: (product, push) => dispatch(updateProduct(product, push))
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(EditProductDetails)
