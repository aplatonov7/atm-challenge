import { createAction, handleAction, handleActions } from 'redux-actions'
import { PIN } from '../../../config'

/* Action Types */
const START_TRANSITION = 'atm/START_TRANSITION'
const STOP_TRANSITION = 'atm/STOP_TRANSITION'
const SET_STAGE = 'atm/SET_STAGE'
const SET_ERROR = 'atm/SET_ERROR'
const SET_WITHDRAWN_MONEY = 'atm/SET_WITHDRAWN_MONEY'
const UPDATE_INPUT = 'atm/UPDATE_INPUT'
const CLEAR_INPUT = 'atm/CLEAR_INPUT'
const ROLLBACK = 'atm/ROLLBACK'
const ABORT = 'atm/ABORT'

/* Action Creators */
const startTransition = createAction(START_TRANSITION)
const stopTransition = createAction(STOP_TRANSITION)
const setStage = createAction(SET_STAGE)
const setError = createAction(SET_ERROR)
const setWithdrawnMoney = createAction(SET_WITHDRAWN_MONEY)
const updateInput = createAction(UPDATE_INPUT)
const clearInput = createAction(CLEAR_INPUT)
const rollback = createAction(ROLLBACK)
const abort = createAction(ABORT)

/* The main idea here is to use stage property to represent the current, well, stage of the process in ATM.
* processing prop is used to emulate async loading feel on the UI. */

/* Initial State */
const initialState = {
  stage: 0,
  processing: false,
  input: "",
  withdrawnMoney: 0,
  error: "",
  cache: []
}

/* Reducer */
export default handleActions({
  [START_TRANSITION]: (state, action) => ({...state, processing: true}),
  [STOP_TRANSITION]: (state, action) => ({...state, processing: false}),
  /* We are using cache property to store part of previous state on stage transitions
  * This allows us to rollback to previous stages. */
  [SET_STAGE]: (state, action) => {
    let cachedState = Object.assign({}, state)
    cachedState.cache = undefined
    cachedState.processing = false

    return {...state, stage: action.payload, input: "", error: "", processing: false, cache: state.cache.concat([cachedState])}
  },
  [SET_ERROR]: (state, action) => ({...state, input: "", error: action.payload}),
  [UPDATE_INPUT]: (state, action) => ({...state, input: state.input + action.payload}),
  [CLEAR_INPUT]: (state, action) => ({...state, input: ""}),
  [SET_WITHDRAWN_MONEY]: (state, action) => ({...state, withdrawnMoney: action.payload}),
  /* On rollback we just pop the last saved state from the end of the array and return it.
  * Of course, we also need to update cache itself and append it to returned state object */
  [ROLLBACK]: (state, action) => {
    const cache = state.cache
    if (cache.length === 0) return state
    const cachedState = cache[cache.length - 1]
    return {...cachedState, cache: cache.slice(0, -1)}
  },
  /* On abort we just revert to initialState */
  [ABORT]: (state, action) => initialState
}, initialState);

/* Actions */

/* This action does different things based on the current process stage.
 * If current stage is 1 - it checks the PIN, specified in config, with the current input.
 * If current stage is 2 - it starts up the money withdrawal process.
 * If current stage is any other value - it just exits early.
 * The dispatch part of the process if always the same, so we just accumulate action creators in an array
 * and the dispatch them all at the end.
 * */
export function confirmInput(delay = 0) {
  return (dispatch, getState) => {
    const toDispatch = []
    const state = getState().atm

    if (state.stage === 1) {
      if (state.input === PIN) {
        toDispatch.push(setStage(2))
      } else {
        toDispatch.push(setError("Incorrect pin"))
        toDispatch.push(clearInput())

        if (delay !== 0) toDispatch.push(stopTransition())
      }
    } else if (state.stage === 2) {
      let input = +state.input
      if (input > 0) {
        toDispatch.push(withdraw(state.input, 4000))
      } else {
        toDispatch.push(setError("Please provide a sum to withdraw"))
        toDispatch.push(clearInput())
        if (delay !== 0) toDispatch.push(stopTransition())
      }
    } else {
      return
    }

    if (delay === 0) {
      toDispatch.map(dispatch)
    } else {
      dispatch(startTransition())
      setTimeout(_ => {
        toDispatch.map(dispatch)
      }, delay)
    }
  }
}

export function changeStage(stage, delay = 0) {
  return (dispatch, getState) => {
    if (delay === 0) {
      dispatch(setStage(stage))
    } else {
      dispatch(startTransition())
      setTimeout(_ => {
        dispatch(setStage(stage))
      }, delay)
    }
  }
}

export function back(delay = 0) {
  return (dispatch, getState) => {
    /* If there is no cached states, exit early */
    if (getState().atm.cache.length === 0) return

    dispatch(startTransition())
    setTimeout(_ => {
      dispatch(rollback())
    }, delay)
  }
}

export function withdraw(amount, delay = 0) {
  return (dispatch, getState) => {
    dispatch(setStage(3))

    setTimeout(_ => {
      dispatch(setStage(4))
      dispatch(setWithdrawnMoney(+amount))
    }, delay)
  }
}

export const actionCreators = {
  updateInput,
  clearInput,
  confirmInput,
  changeStage,
  abort,
  back,
  withdraw
}