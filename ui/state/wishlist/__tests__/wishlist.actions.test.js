import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import HTTPStatus from 'http-status'
import thunk from 'redux-thunk'

import {
  WISHLIST_LIST_REQUEST,
  WISHLIST_LIST_REQUEST_SUCCESS,
  WISHLIST_LIST_REQUEST_FAILURE,
  WISHLIST_CREATE_REQUEST,
  WISHLIST_CREATE_REQUEST_SUCCESS,
  WISHLIST_CREATE_REQUEST_FAILURE,
  WISHLIST_LIST_REQUEST_FINISHED
} from '../constants'
import { INITIAL_STATE } from '../reducer'
import * as actions from '../actions'
import { urls } from '../../../providers/api'
import httpStatus from 'http-status'

const mockStore = configureMockStore([thunk])
const initialStore = {
  wishlist: INITIAL_STATE
}

describe('module wishlist actions', () => {
  it('should list wishlist', (done) => {
    const store = mockStore(initialStore)

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

    const expectedActions = [
      { type: WISHLIST_LIST_REQUEST },
      { type: WISHLIST_LIST_REQUEST_SUCCESS, payload }
    ]

    nock(urls.test)
      .get('/api/customer/1/wishlist')
      .reply(HTTPStatus.OK, payload)

    store.dispatch(actions.listWishlist(1))
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(expectedActions)
        done()
      })
  })

  it('should failure when list wishlist', (done) => {
    const store = mockStore(initialStore)

    const payload = []

    const expectedActions = [
      { type: WISHLIST_LIST_REQUEST },
      { type: WISHLIST_LIST_REQUEST_FAILURE }
    ]

    nock(urls.test)
      .get('/api/customer/1/wishlist')
      .reply(HTTPStatus.INTERNAL_SERVER_ERROR, payload)

    store.dispatch(actions.listWishlist(1))
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(expectedActions)
        done()
      })
  })

  it('should return null when request is in progress', (done) => {
    const store = mockStore({
      ...initialStore,
      wishlist: {
        isRequesting: true,
      },
    })

    const expectedActions = []

    store.dispatch(actions.listWishlist(1))
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(expectedActions)
        done()
      })
  })

  it('should add product to wishlist', (done) => {
    const store = mockStore(initialStore)

    const payload = {
      price: 1699,
      image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
      brand: 'bébé confort',
      product_id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
      title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown'
    }

    const expectedActions = [
      { type: WISHLIST_LIST_REQUEST },
      { type: WISHLIST_LIST_REQUEST_FINISHED }
    ]

    nock(urls.test)
      .post('/api/customer/1/wishlist', payload)
      .reply(HTTPStatus.OK, payload)

    const product = {
      price: 1699,
      image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
      brand: 'bébé confort',
      id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
      title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown',
      formattedPrice: 'R$ 1.699,00',
      isFavorite: false,
      wishlist_id: null
    }

    store.dispatch(actions.addWishlist({ id: 1 }, product))
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(expectedActions)
        done()
      })
  })

  it('should failure when add product to wishlist', (done) => {
    const store = mockStore(initialStore)

    const payload = {
      price: 1699,
      image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
      brand: 'bébé confort',
      product_id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
      title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown'
    }

    const expectedActions = [
      { type: WISHLIST_LIST_REQUEST },
      { type: WISHLIST_LIST_REQUEST_FAILURE }
    ]

    nock(urls.test)
      .post('/api/customer/1/wishlist', payload)
      .reply(HTTPStatus.SERVICE_UNAVAILABLE, payload)

    const product = {
      price: 1699,
      image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
      brand: 'bébé confort',
      id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
      title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown',
      formattedPrice: 'R$ 1.699,00',
      isFavorite: false,
      wishlist_id: null
    }

    store.dispatch(actions.addWishlist({ id: 1 }, product))
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(expectedActions)
        done()
      })
  })

  it('should return null when request create wishlist in progress', (done) => {
    const store = mockStore({
      ...initialStore,
      wishlist: {
        isRequesting: true,
      },
    })

    const expectedActions = []

    store.dispatch(actions.addWishlist())
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(expectedActions)
        done()
      })
  })

  it('should remove product from wishlist', (done) => {
    const store = mockStore({
      ...initialStore,
      wishlist: {
        ...initialStore.wishlist,
        list: [
          {
            price: 1699,
            image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
            brand: 'bébé confort',
            id: 1,
            product_id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
            title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown',
            formattedPrice: 'R$ 1.699,00',
            isFavorite: false,
            wishlist_id: 1
          }
        ]
      }
    })

    const expectedActions = [
      { type: WISHLIST_LIST_REQUEST_SUCCESS, payload: [] }
    ]

    nock(urls.test)
      .delete('/api/customer/1/wishlist/1')
      .reply(httpStatus.NO_CONTENT)

    store.dispatch(actions.removeWishlist({ id: 1 }, { wishlist_id: 1, id: 1 }))
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(expectedActions)
        done()
      })
  })
})
