import React, { PropTypes } from 'react'
import s from './AtmScreen.scss'

import Spinner from '../Spinner'
import ProgressBar from '../ProgressBar'

import { withdrawAmounts } from '../../config'

const Stage0 = () => (
  <div className={s.content}>
    <h2>Welcome to ATM simulation</h2>
    <p>Please insert a card...</p>
  </div>
)

const Stage1 = ({ input, error }) => (
  <div className={s.content}>
    <h2>Please type in your pin</h2>
    <input type="text" value={input} disabled />
    <p className={s.error}>{error}</p>
  </div>
)

const Stage2 = ({ input, error, withdraw }) => (
  <div className={s.content}>
    <h2>Select amount to withdraw</h2>

    <p>Select from one of the predifend amount below:</p>

    <div className={s.buttonsRow}>
      {withdrawAmounts.map(amount => (
        <button className={s.btn} key={amount} onClick={_ => withdraw(amount, 4000)}>{amount}</button>
      ))}
    </div>

    <p>Or type in the desired sum manually and press confirm:</p>
    <input type="text" value={input} disabled />
    <p className={s.error}>{error}</p>
  </div>
)

const Stage3 = () => (
  <div className={s.content}>
    <h2>Preparing your money</h2>

    <ProgressBar />
  </div>
)

const Stage4 = ({ withdrawnMoney }) => (
  <div className={s.content}>
    <h2>All done</h2>

    <p>Successfully withdrawn {withdrawnMoney} monies :)</p>
    <p>Please don't forget your card and money!</p>
  </div>
)

const AtmScreen = (props) => {
  const { stage, processing } = props
  const stages = [
    <Stage0 {...props} />,
    <Stage1 {...props} />,
    <Stage2 {...props} />,
    <Stage3 {...props} />,
    <Stage4 {...props} />
  ]

  return (
    <div className={s.root}>
      {processing ? <Spinner /> : stages[stage]}
    </div>
  )
}

AtmScreen.propTypes = {
  stage: PropTypes.number.isRequired,
  input: PropTypes.string.isRequired,
  processing: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  withdraw: PropTypes.func.isRequired,
  withdrawnMoney: PropTypes.number.isRequired
}

export default AtmScreen