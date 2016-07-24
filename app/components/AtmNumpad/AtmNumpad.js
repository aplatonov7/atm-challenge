import React, { PropTypes } from 'react'
import s from './AtmNumpad.scss'

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "CLEAR", 0, "CONFIRM", "ABORT", "", "BACK"]

/* Using delegated handler here to avoid creating multiple handlers inside map callback */
const AtmNumpad = ({updateInput, clearInput, confirmInput, abort, back}) => {
  const clickHandler = e => {
    const key = e.target.dataset.key

    if (!isNaN(key)) {
      updateInput(key)
    } else if (key === 'CLEAR') {
      clearInput()
    } else if (key === 'CONFIRM') {
      confirmInput(500)
    } else if (key === 'ABORT') {
      abort(500)
    } else if (key === 'BACK') {
      back(500)
    }
  }

  return (
    <div className={s.root} onClick={clickHandler}>
      {keys.map(key => {
        const keyClass = isNaN(key) ? s.keyAlt : s.key
        return <button className={keyClass} key={key} data-key={key}>{key}</button>
      })}
    </div>
  )
}

AtmNumpad.propTypes = {
  updateInput: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
  confirmInput: PropTypes.func.isRequired,
  abort: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired
}

export default AtmNumpad