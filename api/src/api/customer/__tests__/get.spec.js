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
          email: 'example-3@example.com'
        }
      })

      const customerCreated = JSON.parse(responseCreatedCustomer.payload)

      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: `/api/customer/${customerCreated.id}`
      })

      const customer = JSON.parse(payload)

      expect(customer.name).toBe('Nome do cliente')
      expect(customer.email).toBe('example-3@example.com')
      expect(statusCode).toBe(HTTPStatus.OK)
      expect(customer).toHaveProperty('id')
      expect(customer).toHaveProperty('createdAt')
      expect(customer).toHaveProperty('updatedAt')
    })
  })
})
