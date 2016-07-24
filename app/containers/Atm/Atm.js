import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, changeStage } from '../../redux/modules/atm'

import AtmComponent from '../../components/Atm'

/* I'm only using a single container for the whole ATM system.
* I considered creating connected containers for each ATM part (screen, numpad and card reciever),
* but it seems a bit excessive at this point. */

class Atm extends Component {
  static propTypes = {
    stage: PropTypes.number.isRequired,
    input: PropTypes.string.isRequired,
    processing: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    withdrawnMoney: PropTypes.number.isRequired,
    changeStage: PropTypes.func.isRequired,
    updateInput: PropTypes.func.isRequired,
    clearInput: PropTypes.func.isRequired,
    confirmInput: PropTypes.func.isRequired,
    abort: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired,
    withdraw: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    return <AtmComponent {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  stage: state.atm.stage,
  input: state.atm.input,
  processing: state.atm.processing,
  error: state.atm.error,
  withdrawnMoney: state.atm.withdrawnMoney
})

const mapActionToDispatch = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapActionToDispatch)(Atm)