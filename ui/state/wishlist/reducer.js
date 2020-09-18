import {
  WISHLIST_LIST_REQUEST,
  WISHLIST_LIST_REQUEST_SUCCESS,
  WISHLIST_LIST_REQUEST_FAILURE,
  WISHLIST_LIST_REQUEST_FINISHED
} from './constants'

export const INITIAL_STATE = {
  error: false,
  isRequesting: false,
  list: []
}

export default function wishlistReducer (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case WISHLIST_LIST_REQUEST:
      return {
        ...state,
        error: false,
        isRequesting: true
      }
    case WISHLIST_LIST_REQUEST_FINISHED:
      return {
        ...state,
        error: false,
        isRequesting: false
      }
    case WISHLIST_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        error: false,
        isRequesting: false
      }
    case WISHLIST_LIST_REQUEST_FAILURE:
      return {
        ...state,
        error: true,
        isRequesting: false
      }
    default:
      return state
  }
}
