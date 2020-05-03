import React from 'react'
import {connect} from 'react-redux'
import {getDetails, editProduct, removeProduct} from '../store/product'

class ProductDetails extends React.Component {
  constructor(props) {
    let title = ''
    // let description = ''
    // let imageUrl = ''
    // let price = ''
    // let inventory = ''
    if (props.singleProduct && props.singleProduct.title) {
      title = props.singleProduct.title
    }
    //   if (props.product.description) {
    //     description = props.product.description
    //   }
    //   if (props.product.imageUrl) {
    //     imageUrl = props.product.imageUrl
    //   }
    //   if (props.product.price) {
    //     price = props.product.price
    //   }
    //   if (props.product.inventory) {
    //     inventory = props.product.inventory
    //   }

    super()
    this.state = {
      title,
      //   description,
      //   imageUrl,
      //   price,
      //   inventory,
      error: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProduct(id)
  }

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.product.title !== this.props.product.title) {
  //       this.setState({title: this.props.product.title})
  //     }
  //   }
  // else if (
  //     prevProps.product.description !== this.props.product.description
  //   ) {
  //     this.setState({description: this.props.product.description})
  //   } else if (prevProps.product.imageUrl !== this.props.product.imageUrl) {
  //     this.setState({imageUrl: this.props.product.imageUrl})
  //   } else if (prevProps.product.price !== this.props.product.price) {
  //     this.setState({price: this.props.product.price})
  //   } else if (prevProps.product.inventory !== this.props.product.inventory) {
  //     this.setState({inventory: this.props.product.inventory})
  //   }
  // }

  async onSubmit(event) {
    event.preventDefault()
    try {
      this.props.update(
        {
          id: this.props.product.id,
          title: this.state.title,
          description: this.props.product.description,
          imageUrl: this.props.product.imageUrl,
          price: this.props.product.price,
          inventory: this.props.product.inventory
        },
        () => {}
      )
    } catch (exception) {
      this.setState({error: exception.response.data.message})
    }
  }

  render() {
    const {onSubmit} = this
    const {title, error} = this.state
    const {product, update, destroy} = this.props
    console.log(title)
    if (!product) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <h1>{product.title}</h1>
        </div>
      )
    }
  }
}

const mapStateToProps = ({products}, {match}) => {
  const product = products.find(prod => prod.id == match.params.id)

  return {
    product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(getDetails(id)),
    update: product => dispatch(editProduct(product)),
    destroy: (id, push) => dispatch(removeProduct(id, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
