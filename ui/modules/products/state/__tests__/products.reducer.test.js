import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAILURE,
} from '../constants'

import productReducer, { INITIAL_STATE } from '../reducer'

describe('module product reducers', () => {
  it('should return initial state', () => {
    const state = productReducer()
    expect(state).toEqual(INITIAL_STATE)
  })

  it('should handle PRODUCT_LIST_REQUEST', () => {
    const state = productReducer(INITIAL_STATE, {
      type: PRODUCT_LIST_REQUEST,
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      isRequesting: true,
    })
  })

  it('should handle PRODUCT_LIST_REQUEST_SUCCESS', () => {
    const payload = {
      meta: {
        page_number: 1,
        page_size: 2
      },
      products: [
        {
          price: 'R$ 1.699,00',
          image: 'http://challenge-api.luizalabs.com/images/4bd442b1-4a7d-2475-be97-a7b22a08a024.jpg',
          brand: 'bébé confort',
          id: '4bd442b1-4a7d-2475-be97-a7b22a08a024',
          title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown',
          isFavorite: true
        }
      ]
    }

    const state = productReducer(INITIAL_STATE, {
      type: PRODUCT_LIST_REQUEST_SUCCESS,
      payload
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      ...payload,
      isRequesting: false,
    })
  })

  it('should handle PRODUCT_LIST_REQUEST_FAILURE', () => {
    const state = productReducer(INITIAL_STATE, {
      type: PRODUCT_LIST_REQUEST_FAILURE,
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      error: true,
      isRequesting: false,
    })
  })
})
