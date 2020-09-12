import HTTPStatus from 'http-status'

import Customer from '../../../modules/customer/models/customer.model'

describe('customer', () => {
  describe('GET /api/customer', () => {
    beforeEach(() => {
      Customer.truncate({
        cascade: true
      })
    })

    it('should return status code 200 when find a customer', async () => {
      const responseCreatedCustomer = await server.inject({
        method: 'POST',
        url: '/api/customer',
        payload: {
          name: 'Nome do cliente',
          email: 'example-6@example.com'
        }
      })

      const customerCreated = JSON.parse(responseCreatedCustomer.payload)

      const { statusCode } = await server.inject({
        method: 'DELETE',
        url: `/api/customer/${customerCreated.id}`
      })

      expect(statusCode).toBe(HTTPStatus.NO_CONTENT)
    })
  })
})
