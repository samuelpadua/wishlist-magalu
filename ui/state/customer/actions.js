import api from '../../providers/api'

import {
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_REQUEST_SUCCESS,
  CUSTOMER_CREATE_REQUEST_FAILURE,
} from './constants'
import Config from '../../config/environment'

export function create(email, name) {
  return async (dispatch, getState) => {
    const {
      customer: {
        isRequesting,
      },
    } = getState()

    if (isRequesting) return null

    dispatch({
      type: CUSTOMER_CREATE_REQUEST,
    })

    try {
      const { data } = await api
        .post('/api/customer', { email, name })

      dispatch({
        type: CUSTOMER_CREATE_REQUEST_SUCCESS,
        payload: {
          id: data.id,
          email: data.email
        },
      })
    } catch (error) {
      dispatch({
        type: CUSTOMER_CREATE_REQUEST_FAILURE,
      })
    }
  }
}
