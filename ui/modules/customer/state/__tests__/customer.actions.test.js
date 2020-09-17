import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import HTTPStatus from 'http-status'
import thunk from 'redux-thunk'

import {
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_REQUEST_SUCCESS,
  CUSTOMER_CREATE_REQUEST_FAILURE,
} from '../constants'
import { INITIAL_STATE } from '../reducer'
import Config from '../../../../config/environment'
import * as actions from '../actions'

const mockStore = configureMockStore([thunk])
const initialStore = {
  customer: INITIAL_STATE,
}

describe('module customer actions', () => {
  it('should create anew user', (done) => {
    const store = mockStore(initialStore)
    const response = {
      id: 1021,
      email: 'Nome do cliente',
      name: 'example@example.com.br',
    }

    const payload = {
      email: 'example@example.com.br',
      name: 'Nome do cliente',
    }

    const expectedActions = [
      { type: CUSTOMER_CREATE_REQUEST },
      { type: CUSTOMER_CREATE_REQUEST_SUCCESS, payload: { id: response.id } },
    ]

    nock(Config.api.baseUrl)
      .post('/api/customer', payload)
      .reply(HTTPStatus.CREATED, response)

    store.dispatch(actions.create(payload.email, payload.name))
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(expectedActions)
        done()
      })
  })

  it('should failure when auth user', (done) => {
    const store = mockStore(initialStore)
    const response = {
      message: 'Email already in use',
    }

    const payload = {
      email: 'example@example.com.br',
      name: 'Nome do cliente',
    }

    const expectedActions = [
      { type: CUSTOMER_CREATE_REQUEST },
      { type: CUSTOMER_CREATE_REQUEST_FAILURE },
    ]

    nock(Config.api.baseUrl)
      .post('/api/customer', payload)
      .reply(HTTPStatus.CONFLICT, response)

    store.dispatch(actions.create(payload.email, payload.name))
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
      customer: {
        ...initialStore.customer,
        isRequesting: true,
      },
    })

    const expectedActions = []

    store.dispatch(actions.create())
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(expectedActions)
        done()
      })
  })
})
