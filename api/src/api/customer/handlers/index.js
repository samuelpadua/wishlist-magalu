import createCustomer from './create-customer.handler'
import findCustomer from './find-customer.handler'
import destroyCustomer from './destroy-customer.handler'
import addFavoriteProduct from './add-favorite-product.handler'
import listCustomerFavoriteProducts from './list-customer-favorite-products'

export default {
  createCustomer,
  findCustomer,
  destroyCustomer,
  addFavoriteProduct,
  listCustomerFavoriteProducts
}
