import React from 'react'
import {connect} from 'react-redux'
import {createProduct} from '../store/product'

class ProductForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      imageURL: '',
      price: '',
      inventory: '',
      category: '',
      error: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(event) {
    event.preventDefault()
    try {
      await this.props.save(
        {
          title: this.state.title,
          description: this.state.description,
          imageURL: this.state.imageURL,
          price: this.state.price,
          inventory: this.state.inventory,
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
      error,
      category
    } = this.state
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
          value={imageURL}
          onChange={event => this.setState({imageURL: event.target.value})}
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
        <select
          onChange={event => this.setState({category: event.target.value})}
        >
          <option value="">--Select a Platform--</option>
          <option value="Xbox">Xbox</option>
          <option value="Playstation">Playstation</option>
          <option value="PC">PC</option>
          <option value="Nintendo">Switch</option>
        </select>
        <button
          disabled={!title || !description || !imageURL || !price || !inventory}
        >
          Create New Game
        </button>
      </form>
    )
  }
}

const mapStatetoProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProducts = dispatch => {
  return {
    save: (product, push) => dispatch(createProduct(product, push))
  }
}

export default connect(mapStatetoProps, mapDispatchToProducts)(ProductForm)
