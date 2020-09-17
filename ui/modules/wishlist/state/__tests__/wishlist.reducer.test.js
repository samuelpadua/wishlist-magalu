import {
  WISHLIST_LIST_REQUEST,
  WISHLIST_LIST_REQUEST_SUCCESS,
  WISHLIST_LIST_REQUEST_FAILURE,
} from '../constants'

import wishlistReducer, { INITIAL_STATE } from '../reducer'

describe('module wishlist reducers', () => {
  it('should return initial state', () => {
    const state = wishlistReducer()
    expect(state).toEqual(INITIAL_STATE)
  })

  it('should handle WISHLIST_LIST_REQUEST', () => {
    const state = wishlistReducer(INITIAL_STATE, {
      type: WISHLIST_LIST_REQUEST,
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      isRequesting: true,
    })
  })

  it('should handle WISHLIST_LIST_REQUEST_SUCCESS', () => {
    const payload = [
      {
        price: 'R$ 1.699,00',
        image: 'http://challenge-api.luizalabs.com/images/4bd442b1-4a7d-2475-be97-a7b22a08a024.jpg',
        brand: 'bébé confort',
        id: '4bd442b1-4a7d-2475-be97-a7b22a08a024',
        title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown',
        isFavorite: true
      }
    ]

    const state = wishlistReducer(INITIAL_STATE, {
      type: WISHLIST_LIST_REQUEST_SUCCESS,
      payload
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      list: payload,
      isRequesting: false,
    })
  })

  it('should handle WISHLIST_LIST_REQUEST_FAILURE', () => {
    const state = wishlistReducer(INITIAL_STATE, {
      type: WISHLIST_LIST_REQUEST_FAILURE,
    })

    expect(state).toEqual({
      ...INITIAL_STATE,
      error: true,
      isRequesting: false,
    })
  })
})
