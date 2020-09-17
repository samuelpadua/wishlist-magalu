import {
  AUTH_REQUEST,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_FAILURE,
} from '../constants'

import authReducer, { INITIAL_STATE } from '../reducer'

describe('module auth reducers', () => {
  it('should return initial state', () => {
    const state = authReducer()
    expect(state).toEqual(INITIAL_STATE)
  })

  it('should handle AUTH_REQUEST', () => {
    const state = authReducer(INITIAL_STATE, {
      type: AUTH_REQUEST,
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      isRequesting: true,
    })
  })

  it('should handle AUTH_REQUEST_SUCCESS', () => {
    const state = authReducer(INITIAL_STATE, {
      type: AUTH_REQUEST_SUCCESS,
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      isRequesting: false,
    })
  })

  it('should handle AUTH_REQUEST_FAILURE', () => {
    const state = authReducer(INITIAL_STATE, {
      type: AUTH_REQUEST_FAILURE,
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      error: true,
      isRequesting: false,
    })
  })
})
