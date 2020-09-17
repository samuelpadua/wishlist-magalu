import {
  AUTH_REQUEST,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_FAILURE,
} from './constants'

export const INITIAL_STATE = {
  isRequesting: false,
  error: false,
  token: '',
}

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        error: false,
        isRequesting: true,
      }
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        error: false,
        isRequesting: false,
      }
    case AUTH_REQUEST_FAILURE:
      return {
        ...state,
        error: true,
        isRequesting: false,
      }
    default:
      return state
  }
}
