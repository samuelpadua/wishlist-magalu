import axios from 'axios'

import Config from '../../../config/environment'
import {
  AUTH_REQUEST,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_FAILURE,
} from './constants'

export function login(email) {
  return async (dispatch, getState) => {
    const {
      auth: {
        isRequesting,
      },
    } = getState()

    if (isRequesting) return null

    dispatch({
      type: AUTH_REQUEST,
    })

    try {
      const { data } = await axios
        .post(`${Config.api.baseUrl}/api/auth`, { email })

      dispatch({
        type: AUTH_REQUEST_SUCCESS,
        payload: {
          token: data.token,
        },
      })
    } catch (error) {
      dispatch({
        type: AUTH_REQUEST_FAILURE,
      })
    }
  }
}
