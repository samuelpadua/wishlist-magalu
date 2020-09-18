import api from '../../providers/api'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAILURE,
  PRODUCT_FAVORITE_UPDATE
} from './constants'

export function updateFavorite(productId, isFavorite, wishlistId) {
  return async (dispatch, getState) => {
    const {
      products: {
        products
      }
    } = getState()

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        product.isFavorite = isFavorite
        product.wishlist_id = wishlistId
      }

      return product
    })

    dispatch({
      type: PRODUCT_FAVORITE_UPDATE,
      payload: updatedProducts
    })
  }
}

export function list(page, customer = {}) {
  return async (dispatch, getState) => {
    const {
      products: {
        isRequesting
      }
    } = getState()

    if (isRequesting) return null

    dispatch({
      type: PRODUCT_LIST_REQUEST,
    })

    try {
      const { data } = await api
        .get('/api/products', {
          params: {
            page,
            'customer.id': customer ? customer.id : null
          }
        })

      dispatch({
        type: PRODUCT_LIST_REQUEST_SUCCESS,
        payload: {
          data,
          page
        },
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_REQUEST_FAILURE,
      })
    }
  }
}
