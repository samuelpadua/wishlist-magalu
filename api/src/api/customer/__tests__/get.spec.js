import HTTPStatus from 'http-status'

import Customer from '../models/customer.model'
import Wishlist from '../models/wishlist.model'
import { generateToken } from '../../auth/services/auth.service'

describe('customer', () => {
  beforeEach(async () => {
    await Customer.truncate({
      cascade: true
    })
  })
  describe('GET /api/customer', () => {
    it('should return status code 200 when find a customer', async () => {
      const customerCreated = await Customer.create({
        name: 'Nome do cliente',
        email: 'example-3@example.com'
      })

      const Authorization = await generateToken(customerCreated.email)

      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: `/api/customer/${customerCreated.id}`,
        headers: {
          Authorization
        }
      })

      const customer = JSON.parse(payload)

      expect(statusCode).toBe(HTTPStatus.OK)
      expect(customer.name).toBe('Nome do cliente')
      expect(customer.email).toBe('example-3@example.com')
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

      const Authorization = await generateToken(customer.email)

      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: `/api/customer/${customer.id}/wishlist`,
        headers: {
          Authorization
        }
      })

      const body = JSON.parse(payload)

      expect(body).toHaveLength(2)
      expect(statusCode).toBe(HTTPStatus.OK)
    })
  })
})
