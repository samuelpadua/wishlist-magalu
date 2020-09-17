import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAILURE
} from './constants'

export const INITIAL_STATE = {
  error: false,
  isRequesting: false,
  meta: {},
  products: []
}

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        error: false,
        isRequesting: true
      }
    case PRODUCT_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: false,
        isRequesting: false
      }
    case PRODUCT_LIST_REQUEST_FAILURE:
      return {
        ...state,
        error: true,
        isRequesting: false
      }
    default:
      return state
  }
}
