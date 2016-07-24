import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import atm from './modules/atm'

export default combineReducers({
  form: formReducer,
  atm
})