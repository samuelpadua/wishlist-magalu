import HTTPStatus from 'http-status'

import Customer from '../../customer/models/customer.model'

describe('auth', () => {
  beforeEach(async () => {
    await Customer.truncate({
      cascade: true
    })
  })

  describe('POST /api/auth', () => {
    it('should return status code 200 with a token jwt', async () => {
      await Customer.create({
        name: 'Nome do cliente',
        email: 'example-auth@example.com'
      })

      const { payload, statusCode } = await server.inject({
        method: 'POST',
        url: '/api/auth',
        payload: {
          email: 'example-auth@example.com'
        }
      })

      const body = JSON.parse(payload)

      expect(body).toHaveProperty('token')
      expect(statusCode).toBe(HTTPStatus.OK)
    })

    it('should return status code 401 when email not founded', async () => {
      const { payload, statusCode } = await server.inject({
        method: 'POST',
        url: '/api/auth',
        payload: {
          email: 'unathorized-user@example.com'
        }
      })

      const body = JSON.parse(payload)

      expect(body.message).toBe('Not authorized')
      expect(statusCode).toBe(HTTPStatus.UNAUTHORIZED)
    })

    it('should return status code 401 when not pass header authorization', async () => {
      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: '/api/customer/teste'
      })

      const body = JSON.parse(payload)

      expect(body.message).toBe('Missing authentication')
      expect(statusCode).toBe(HTTPStatus.UNAUTHORIZED)
    })
  })
})
