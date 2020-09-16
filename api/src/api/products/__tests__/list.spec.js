import nock from 'nock'

import Customer from '../../customer/models/customer.model'
import httpStatus from 'http-status'
import Wishlist from '../../customer/models/wishlist.model'

describe('products', () => {
  describe('GET /api/products', () => {
    it('should return 200 with a list of products', async () => {
      nock('http://challenge-api.luizalabs.com')
        .get('/api/product/')
        .query({ page: 1 })
        .reply(httpStatus.OK, {
          meta: {
            page_number: 1,
            page_size: 2
          },
          products: [
            {
              price: 1699.0,
              image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
              brand: 'bébé confort',
              id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
              title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown'
            },
            {
              price: 1149.0,
              image: 'http://challenge-api.luizalabs.com/images/958ec015-cfcf-258d-c6df-1721de0ab6ea.jpg',
              brand: 'bébé confort',
              id: '958ec015-cfcf-258d-c6df-1721de0ab6ea',
              title: 'Moisés Dorel Windoo 1529'
            }
          ]
        })

      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: '/api/products?page=1'
      })

      const body = JSON.parse(payload)

      expect(body.products).toHaveLength(2)
      expect(statusCode).toBe(httpStatus.OK)
    })

    it('should return 200 with a list of products and wishlist marked of logged user', async () => {
      const customer = await Customer.create({
        name: 'Nome do cliente',
        email: 'example-products-wishlist@example.com'
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

      nock('http://challenge-api.luizalabs.com')
        .get('/api/product/')
        .query({ page: 1 })
        .reply(httpStatus.OK, {
          meta: {
            page_number: 1,
            page_size: 2
          },
          products: [
            {
              price: 1699.0,
              image: 'http://challenge-api.luizalabs.com/images/4bd442b1-4a7d-2475-be97-a7b22a08a024.jpg',
              brand: 'bébé confort',
              id: '4bd442b1-4a7d-2475-be97-a7b22a08a024',
              title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown',
              isFavorite: true
            },
            {
              price: 1149.0,
              image: 'http://challenge-api.luizalabs.com/images/6a512e6c-6627-d286-5d18-583558359ab6.jpg',
              brand: 'bébé confort',
              id: '6a512e6c-6627-d286-5d18-583558359ab6',
              title: 'Moisés Dorel Windoo 1529',
              isFavorite: true
            },
            {
              price: 160.69,
              image: 'http://challenge-api.luizalabs.com/images/77be5ad3-fa87-d8a0-9433-5dbcc3152fac.jpg',
              brand: 'inovox',
              id: '77be5ad3-fa87-d8a0-9433-5dbcc3152fac',
              title: 'Farol Lado Esquerdo para Monza 88/90'
            }
          ]
        })

      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: `/api/products?page=1&customer.id=${customer.id}`
      })

      const body = JSON.parse(payload)

      expect(body.products).toHaveLength(3)
      expect(body.products[0].isFavorite).toBeTruthy()
      expect(body.products[1].isFavorite).toBeTruthy()
      expect(body.products[2].isFavorite).toBeFalsy()
      expect(statusCode).toBe(httpStatus.OK)
    })
  })
})
