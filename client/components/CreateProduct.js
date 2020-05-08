import React from 'react'
import {connect} from 'react-redux'
import {createProduct} from '../store/product'

class CreateProduct extends React.Component {
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
      <div className="form-wrapper">
        <form className="new-form" onSubmit={onSubmit}>
          {error}
          <h3> Create New Game </h3>
          <p>
            Title:
            <input
              value={title}
              onChange={event => this.setState({title: event.target.value})}
              placeholder="Title"
            />
          </p>
          <p>
            Description:
            <input
              value={description}
              onChange={event =>
                this.setState({description: event.target.value})
              }
              placeholder="Description"
            />
          </p>
          <p>
            ImageURL:
            <input
              value={imageURL}
              onChange={event => this.setState({imageURL: event.target.value})}
              placeholder="Image Url"
            />
          </p>
          <p>
            Price:
            <input
              value={price}
              onChange={event => this.setState({price: event.target.value})}
              placeholder="Price"
            />
          </p>
          <p>
            Inventory:
            <input
              value={inventory}
              onChange={event => this.setState({inventory: event.target.value})}
              placeholder="Inventory"
            />
          </p>
          <p>
            Platform:
            <select
              onChange={event => this.setState({category: event.target.value})}
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
              !title ||
              !description ||
              !imageURL ||
              !price ||
              !inventory ||
              !category
            }
          >
            Create New Game
          </button>
        </form>
      </div>
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

export default connect(mapStatetoProps, mapDispatchToProducts)(CreateProduct)
