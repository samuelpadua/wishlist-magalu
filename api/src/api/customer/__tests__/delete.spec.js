import HTTPStatus from 'http-status'

import Customer from '../../../modules/customer/models/customer.model'
import Wishlist from '../../../modules/customer/models/wishlist.model'

describe('customer', () => {
  describe('DELETE /api/customer', () => {
    beforeEach(() => {
      Customer.truncate({
        cascade: true
      })
    })

    it('should return status code 204 when delete a customer', async () => {
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

  describe('DELETE /api/customer/{id}/wishlist/{id}', () => {
    it('should return status code 200 when find a customer', async () => {
      const customer = await Customer.create({
        name: 'Nome do cliente',
        email: 'example-1029301@example.com'
      })

      const wishlist = await Wishlist.create({
        customer_id: customer.id,
        price: 1699,
        image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
        brand: 'bébé confort',
        product_id: '4bd442b1-4a7d-2475-be97-a7b22a08a024',
        title: 'Cadeira para Auto Iseos Bébé Confotrt Earth Brown'
      })

      const { statusCode } = await server.inject({
        method: 'DELETE',
        url: `/api/customer/${customer.id}/wishlist/${wishlist.id}`
      })

      expect(statusCode).toBe(HTTPStatus.NO_CONTENT)
    })
  })
})
