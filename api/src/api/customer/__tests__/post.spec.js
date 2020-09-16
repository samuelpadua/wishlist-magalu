import HTTPStatus from 'http-status'

import Customer from '../models/customer.model'
import { generateToken } from '../../auth/services/auth.service'

describe('customer', () => {
  beforeEach(async () => {
    await Customer.truncate({
      cascade: true
    })
  })

  describe('POST /api/customer', () => {
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

  describe('POST /api/customer/{id}/wishlist', () => {
    it('should return status code 201 when adding a product to the wish list', async () => {
      const customer = await Customer.create({
        name: 'Nome do cliente',
        email: 'example-6@example.com'
      })

      const Authorization = await generateToken(customer.email)

      const { payload, statusCode } = await server.inject({
        method: 'POST',
        url: `/api/customer/${customer.id}/wishlist`,
        headers: {
          Authorization
        },
        payload: {
          price: 1699.0,
          image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
          brand: 'bébé confort',
          product_id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
          title: 'Cadeira para Auto Iseos Bébé Confotrt Earth Brown'
        }
      })

      const body = JSON.parse(payload)

      expect(body.price).toBe(1699)
      expect(body.image).toBe('http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg')
      expect(body.brand).toBe('bébé confort')
      expect(body.product_id).toBe('1bf0f365-fbdd-4e21-9786-da459d78dd1f')
      expect(body.title).toBe('Cadeira para Auto Iseos Bébé Confotrt Earth Brown')
      expect(statusCode).toBe(HTTPStatus.CREATED)
      expect(body).toHaveProperty('id')
      expect(body).toHaveProperty('createdAt')
      expect(body).toHaveProperty('updatedAt')
    })

    it('should return status code 409 when adding a product and it is already marked as a favorite', async () => {
      const responseCustomer = await server.inject({
        method: 'POST',
        url: '/api/customer',
        payload: {
          name: 'Nome do cliente',
          email: 'example-7@example.com'
        }
      })

      const customer = JSON.parse(responseCustomer.payload)

      const Authorization = await generateToken(customer.email)

      await server.inject({
        method: 'POST',
        url: `/api/customer/${customer.id}/wishlist`,
        headers: {
          Authorization
        },
        payload: {
          price: 1699.0,
          image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
          brand: 'bébé confort',
          product_id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
          title: 'Cadeira para Auto Iseos Bébé Confotrt Earth Brown'
        }
      })

      const { payload, statusCode } = await server.inject({
        method: 'POST',
        url: `/api/customer/${customer.id}/wishlist`,
        headers: {
          Authorization
        },
        payload: {
          price: 1699.0,
          image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
          brand: 'bébé confort',
          product_id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
          title: 'Cadeira para Auto Iseos Bébé Confotrt Earth Brown'
        }
      })

      const body = JSON.parse(payload)

      expect(body.message).toBe('This product already marked as a favorite')
      expect(statusCode).toBe(HTTPStatus.CONFLICT)
    })
  })
})
