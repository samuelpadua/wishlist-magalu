import handlers from './handlers'
import validator from './validators'

export default [
  {
    method: 'POST',
    path: '/api/customer',
    handler: handlers.createCustomer,
    config: {
      description: 'Create a customer',
      tags: ['api', 'customer'],
      validate: validator.createCustomer
    }
  },
  {
    method: 'GET',
    path: '/api/customer/{id}',
    handler: handlers.findCustomer,
    config: {
      description: 'Show customer info',
      tags: ['api', 'customer'],
      validate: validator.findCustomer
    }
  },
  {
    method: 'DELETE',
    path: '/api/customer/{id}',
    handler: handlers.destroyCustomer,
    config: {
      description: 'Delete customer info',
      tags: ['api', 'customer'],
      validate: validator.findCustomer
    }
  },
  {
    method: 'POST',
    path: '/api/customer/{id}/wishlist',
    handler: handlers.addFavoriteProduct,
    config: {
      description: 'Add product a customer wishlist',
      tags: ['api', 'customer', 'wishlist'],
      validate: validator.createFavoriteProduct
    }
  },
  {
    method: 'GET',
    path: '/api/customer/{id}/wishlist',
    handler: handlers.listCustomerFavoriteProducts,
    config: {
      description: 'List favorite products of a customer',
      tags: ['api', 'customer', 'wishlist'],
      validate: validator.findCustomer
    }
  }
]
