import HTTPStatus from 'http-status'

import Customer from '../../../modules/customer/models/customer.model'
import Wishlist from '../../../modules/customer/models/wishlist.model'

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

  describe('GET /api/customer/{id}/wishlist', () => {
    it('should return status code 200 with wishlist of a customer', async () => {
      const customer = await Customer.create({
        name: 'Nome do cliente',
        email: 'example-100@example.com'
      })

      await Wishlist.create({
        customer_id: customer.id,
        price: 1699,
        image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
        brand: 'bébé confort',
        product_id: '4bd442b1-4a7d-2475-be97-a7b22a08a024',
        title: 'Cadeira para Auto Iseos Bébé Confotrt Earth Brown'
      })

      await Wishlist.create({
        customer_id: customer.id,
        price: 1149,
        image: 'http://challenge-api.luizalabs.com/images/6a512e6c-6627-d286-5d18-583558359ab6.jpg',
        brand: 'bébé confort',
        product_id: '6a512e6c-6627-d286-5d18-583558359ab6',
        title: 'Moisés Dorel Windoo 1529'
      })

      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: `/api/customer/${customer.id}/wishlist`
      })

      const body = JSON.parse(payload)

      expect(body).toHaveLength(2)
      expect(statusCode).toBe(HTTPStatus.OK)
    })
  })
})
