import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAILURE,
  PRODUCT_FAVORITE_UPDATE
} from './constants'

export const INITIAL_STATE = {
  error: false,
  isRequesting: false,
  page: 1,
  meta: {},
  products: []
}

export default function productsReducer (state = INITIAL_STATE, action = {}) {
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
        meta: {
          ...action.payload.data.meta
        },
        products: state.products.concat(action.payload.data.products),
        page: action.payload.page,
        error: false,
        isRequesting: false
      }
    case PRODUCT_FAVORITE_UPDATE:
      return {
        ...state,
        products: action.payload
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
