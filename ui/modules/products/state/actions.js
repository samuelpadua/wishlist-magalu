import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAILURE,
} from './constants'
import Config from '../../../config/environment'

export function list(page) {
  return async (dispatch, getState) => {
    const {
      customer: {
        id: customerId,
      },
      products: {
        isRequesting
      }
    } = getState()

    if (isRequesting) return null

    dispatch({
      type: PRODUCT_LIST_REQUEST,
    })

    try {
      const { data } = await axios
        .get(`${Config.api.baseUrl}/api/products`, {
          params: {
            page,
            'customer.id': customerId
          }
        })

      dispatch({
        type: PRODUCT_LIST_REQUEST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_REQUEST_FAILURE,
      })
    }
  }
}
