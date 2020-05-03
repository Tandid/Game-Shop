import React from 'react'
import {connect} from 'react-redux'
import {createProduct} from '../store/product'

class ProductForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      imageUrl: '',
      price: '',
      inventory: '',
      error: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(event) {
    event.preventDefault()
    try {
      await this.props.save({
        title: this.state.title,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        price: this.state.price,
        inventory: this.state.inventory
      })
      this.setState({
        title: '',
        description: '',
        imageUrl: '',
        price: '',
        inventory: ''
      })
    } catch (exception) {
      this.setState({error: exception.response.data.message})
    }
  }

  render() {
    const {onSubmit} = this
    const {title, description, imageUrl, price, inventory, error} = this.state
    return (
      <form className="newGame" onSubmit={onSubmit}>
        {error}
        <input
          value={title}
          onChange={event => this.setState({title: event.target.value})}
          placeholder="Title"
        />
        <input
          value={description}
          onChange={event => this.setState({description: event.target.value})}
          placeholder="Description"
        />
        <input
          value={imageUrl}
          onChange={event => this.setState({imageUrl: event.target.value})}
          placeholder="Image Url"
        />
        <input
          value={price}
          onChange={event => this.setState({price: event.target.value})}
          placeholder="Price"
        />
        <input
          value={inventory}
          onChange={event => this.setState({inventory: event.target.value})}
          placeholder="Inventory"
        />
        <button
          disabled={!title || !description || !imageUrl || !price || !inventory}
        >
          Create New Game
        </button>
      </form>
    )
  }
}

const mapDispatchToProducts = dispatch => {
  return {
    save: product => dispatch(createProduct(product))
  }
}

export default connect(null, mapDispatchToProducts)(ProductForm)
