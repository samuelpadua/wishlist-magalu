import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import HTTPStatus from 'http-status'
import thunk from 'redux-thunk'

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAILURE,
} from '../constants'
import { INITIAL_STATE } from '../reducer'
import Config from '../../../../config/environment'
import * as actions from '../actions'

const mockStore = configureMockStore([thunk])
const initialStore = {
  products: INITIAL_STATE,
  customer: {
    id: 1000
  }
}

describe('module products actions', () => {
  it('should list products', (done) => {
    const store = mockStore(initialStore)

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

    const expectedActions = [
      { type: PRODUCT_LIST_REQUEST },
      { type: PRODUCT_LIST_REQUEST_SUCCESS, payload },
    ]

    nock(Config.api.baseUrl)
      .get('/api/products')
      .query({ page: 1, 'customer.id': 1000 })
      .reply(HTTPStatus.OK, payload)

    store.dispatch(actions.list(1))
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(expectedActions)
        done()
      })
  })

  it('should failure when auth user', (done) => {
    const store = mockStore(initialStore)

    const expectedActions = [
      { type: PRODUCT_LIST_REQUEST },
      { type: PRODUCT_LIST_REQUEST_FAILURE },
    ]

    nock(Config.api.baseUrl)
      .get('/api/products')
      .query({ page: 1, 'customer.id': 1000 })
      .reply(HTTPStatus.INTERNAL_SERVER_ERROR, { message: 'Internal server error' })

    store.dispatch(actions.list(1))
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
      products: {
        isRequesting: true,
      },
    })

    const expectedActions = []

    store.dispatch(actions.list(1))
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(expectedActions)
        done()
      })
  })
})
