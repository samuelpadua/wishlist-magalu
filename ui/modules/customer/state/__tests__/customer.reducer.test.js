import {
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_REQUEST_SUCCESS,
  CUSTOMER_CREATE_REQUEST_FAILURE,
} from '../constants'

import customerReducer, { INITIAL_STATE } from '../reducer'

describe('module customer reducers', () => {
  it('should return initial state', () => {
    const state = customerReducer()
    expect(state).toEqual(INITIAL_STATE)
  })

  it('should handle CUSTOMER_CREATE_REQUEST', () => {
    const state = customerReducer(INITIAL_STATE, {
      type: CUSTOMER_CREATE_REQUEST,
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      isRequesting: true,
    })
  })

  it('should handle CUSTOMER_CREATE_REQUEST_SUCCESS', () => {
    const state = customerReducer(INITIAL_STATE, {
      type: CUSTOMER_CREATE_REQUEST_SUCCESS,
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      isRequesting: false,
    })
  })

  it('should handle CUSTOMER_CREATE_REQUEST_FAILURE', () => {
    const state = customerReducer(INITIAL_STATE, {
      type: CUSTOMER_CREATE_REQUEST_FAILURE,
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      error: true,
      isRequesting: false,
    })
  })
})
