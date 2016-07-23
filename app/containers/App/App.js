import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'

import Layout from '../../components/Layout'

import '../../styles/base.scss'

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render () {
    const { store } = this.props

    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    )
  }
}

export default App