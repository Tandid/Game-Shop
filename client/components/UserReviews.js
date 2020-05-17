import React from 'react'
import {connect} from 'react-redux'
import {getDetails} from '../store/product'
import {orderItems, orderItem} from '../store'
import {createReview} from '../store/reviews'

class UserReviews extends React.Component {
  constructor() {
    super()
    this.state = {
      stars: 0,
      text: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(productId)
  }

  async onSubmit(event) {
    event.preventDefault()
    try {
      this.props.postReview(
        {
          stars: this.state.stars,
          text: this.state.text,
          userId: this.props.user.id,
          productId: this.props.product.id
        },
        this.props.history.push
      )
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    const {onSubmit} = this
    const {product} = this.props
    const {stars, text} = this.state
    return (
      <form onSubmit={onSubmit}>
        <h1>{product.title} - Review</h1>
        Number of Stars
        <select onChange={event => this.setState({stars: event.target.value})}>
          <option value="">-- Select --</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
        <input
          value={text}
          onChange={event => this.setState({text: event.target.value})}
        />
        <button disabled={!stars || !text}>Submit Review</button>
      </form>
    )
  }
}

const mapStateToProps = ({product, user}) => {
  return {
    product,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(getDetails(id)),
    postReview: (review, push) => dispatch(createReview(review, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserReviews)
