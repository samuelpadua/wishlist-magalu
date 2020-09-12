import HTTPStatus from 'http-status'

import Customer from '../../../modules/customer/models/customer.model'

describe('customer', () => {
  describe('POST /api/customer', () => {
    beforeEach(() => {
      Customer.truncate({
        cascade: true
      })
    })

    it('should return status code 201 when create a new user', async () => {
      const { payload, statusCode } = await server.inject({
        method: 'POST',
        url: '/api/customer',
        payload: {
          name: 'Nome do cliente',
          email: 'example@example.com'
        }
      })

      const body = JSON.parse(payload)

      expect(body.name).toBe('Nome do cliente')
      expect(body.email).toBe('example@example.com')
      expect(statusCode).toBe(HTTPStatus.CREATED)
      expect(body).toHaveProperty('id')
      expect(body).toHaveProperty('createdAt')
      expect(body).toHaveProperty('updatedAt')
    })

    it('should return status code 400 when email is already in use', async () => {
      const { payload, statusCode } = await server.inject({
        method: 'POST',
        url: '/api/customer',
        payload: {
          name: 'Nome do cliente',
          email: 'example-2@example.com'
        }
      })

      const body = JSON.parse(payload)

      expect(body.name).toBe('Nome do cliente')
      expect(body.email).toBe('example-2@example.com')
      expect(statusCode).toBe(HTTPStatus.CREATED)
      expect(body).toHaveProperty('id')
      expect(body).toHaveProperty('createdAt')
      expect(body).toHaveProperty('updatedAt')

      const responseDuplicatedEmail = await server.inject({
        method: 'POST',
        url: '/api/customer',
        payload: {
          name: 'Nome do cliente',
          email: 'example-2@example.com'
        }
      })

      expect(JSON.parse(responseDuplicatedEmail.payload).message).toBe('This email is already in use')
      expect(responseDuplicatedEmail.statusCode).toBe(HTTPStatus.BAD_REQUEST)
    })
  })
})
