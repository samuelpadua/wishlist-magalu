import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import HTTPStatus from 'http-status'
import thunk from 'redux-thunk'

import {
  AUTH_REQUEST,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_FAILURE,
} from '../constants'
import { INITIAL_STATE } from '../reducer'
import Config from '../../../../config/environment'
import * as actions from '../actions'

const mockStore = configureMockStore([thunk])
const initialStore = {
  auth: INITIAL_STATE,
}

describe('module auth actions', () => {
  it('should auth user and return token', (done) => {
    const store = mockStore(initialStore)
    const response = {
      token: '',
    }

    const payload = {
      email: 'example@example.com.br',
    }

    const expectedActions = [
      { type: AUTH_REQUEST },
      { type: AUTH_REQUEST_SUCCESS, payload: response },
    ]

    nock(Config.api.baseUrl)
      .post('/api/auth', payload)
      .reply(HTTPStatus.OK, response)

    store.dispatch(actions.login(payload.email))
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
      token: '',
    }

    const payload = {
      email: 'example@example.com.br',
    }

    const expectedActions = [
      { type: AUTH_REQUEST },
      { type: AUTH_REQUEST_FAILURE },
    ]

    nock(Config.api.baseUrl)
      .post('/api/auth', payload)
      .reply(HTTPStatus.UNAUTHORIZED, response)

    store.dispatch(actions.login(payload.email))
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
      auth: {
        ...initialStore.auth,
        isRequesting: true,
      },
    })

    const expectedActions = []

    store.dispatch(actions.login())
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(expectedActions)
        done()
      })
  })
})
