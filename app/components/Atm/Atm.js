import React, { PropTypes } from 'react'
import s from './Atm.scss'

import AtmScreen from '../../components/AtmScreen'
import AtmNumpad from '../../components/AtmNumpad'
import AtmCardReceiver from '../../components/AtmCardReceiver'

/* Main ATM presentational component */
const Atm = ({
  stage, input, processing, error, withdrawnMoney,
  changeStage, updateInput, clearInput, confirmInput, abort, back, withdraw
  }) => (
  <div className={s.root}>
    <div className={s.main}>
      <AtmScreen {...{input, stage, error, processing, withdraw, withdrawnMoney}} />
      <AtmNumpad {...{updateInput, clearInput, confirmInput, abort, back}} />
    </div>

    <div className={s.side}>
      <AtmCardReceiver {...{stage, processing, changeStage}} />

      <p className={s.withdrawn}>Money withdrawn - {withdrawnMoney}</p>
    </div>
  </div>
)

Atm.propTypes = {
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

export default Atm