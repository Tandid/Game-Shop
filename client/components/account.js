import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, updateUser} from '../store'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    await this.props.getUser()
  }

  render() {
    return <div> hello</div>
  }
}
const mapStateToProps = ({user}) => {
  return {
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(me()),
    updateUser: id => dispatch(updateUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
