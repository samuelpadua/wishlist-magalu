import {
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_REQUEST_SUCCESS,
  CUSTOMER_CREATE_REQUEST_FAILURE,
} from './constants'

export const INITIAL_STATE = {
  error: false,
  isRequesting: false,
}

export default function customerReducer (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CUSTOMER_CREATE_REQUEST:
      return {
        ...state,
        error: false,
        isRequesting: true,
      }
    case CUSTOMER_CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: false,
        isRequesting: false,
      }
    case CUSTOMER_CREATE_REQUEST_FAILURE:
      return {
        ...state,
        error: true,
        isRequesting: false,
      }
    default:
      return state
  }
}
