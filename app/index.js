import React from 'react'
import ReactDom from 'react-dom'
import App from './containers/App'
import configureStore from './redux/configureStore'

/* Setting up the app store and rendering our root container into DOM */
const store = configureStore()
const rootEl = document.getElementById('app')

if (module.hot) {
  module.hot.accept()
}

ReactDom.render(<App store={store} />, rootEl)