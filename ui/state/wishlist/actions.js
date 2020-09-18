import api from '../../providers/api'
import {
  WISHLIST_LIST_REQUEST,
  WISHLIST_LIST_REQUEST_SUCCESS,
  WISHLIST_LIST_REQUEST_FAILURE,
  WISHLIST_LIST_REQUEST_FINISHED
} from './constants'
import { updateFavorite } from '../products/actions'


export function listWishlist(customerId) {
  return async (dispatch, getState) => {
    const {
      wishlist: {
        isRequesting
      }
    } = getState()

    if (isRequesting) return null

    dispatch({
      type: WISHLIST_LIST_REQUEST,
    })

    try {
      const { data } = await api
        .get(`/api/customer/${customerId}/wishlist`)

      dispatch({
        type: WISHLIST_LIST_REQUEST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: WISHLIST_LIST_REQUEST_FAILURE,
      })
    }
  }
}

export function addWishlist(customer, product) {
  return async (dispatch, getState) => {
    const {
      wishlist: {
        isRequesting
      }
    } = getState()

    if (isRequesting) return null

    dispatch({
      type: WISHLIST_LIST_REQUEST
    })

    const payload = {
      price: product.price,
      image: product.image,
      brand: product.brand,
      product_id: product.id,
      title: product.title,
      review_score: product.reviewScore
    }

    try {
      await api
        .post(`/api/customer/${customer.id}/wishlist`, payload)

      dispatch({
        type: WISHLIST_LIST_REQUEST_FINISHED
      })
    } catch (error) {
      dispatch({
        type: WISHLIST_LIST_REQUEST_FAILURE,
      })
    }
  }
}

export function removeWishlist(customer, product) {
  return async (dispatch, getState) => {
    const {
      wishlist: {
        isRequesting,
        list
      }
    } = getState()

    await api
      .delete(`/api/customer/${customer.id}/wishlist/${product.wishlist_id}`)

    const data = list.filter(({ id }) => product.id !== id)

    dispatch({
      type: WISHLIST_LIST_REQUEST_SUCCESS,
      payload: data
    })
  }
}