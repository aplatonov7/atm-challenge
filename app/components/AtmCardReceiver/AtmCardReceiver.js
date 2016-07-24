import React, { PropTypes } from 'react'
import s from './AtmCardReceiver.scss'

const AtmCardReceiver = ({ stage, processing, changeStage }) => (
  <div className={s.root}>
    <div className={s.slot}></div>
    <button
      className={s.inject}
      disabled={stage !== 0 || processing}
      onClick={_ => changeStage(1, 1000)}>
      Insert Card
    </button>
  </div>
)

AtmCardReceiver.propTypes = {
  stage: PropTypes.number.isRequired,
  processing: PropTypes.bool.isRequired,
  changeStage: PropTypes.func.isRequired
}

export default AtmCardReceiver