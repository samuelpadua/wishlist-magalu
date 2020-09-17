import { combineReducers } from 'redux'
import auth from '../modules/auth/state/reducer'
import customer from '../modules/customer/state/reducer'
import products from '../modules/products/state/reducer'
import wishlist from '../modules/wishlist/state/reducer'

export default combineReducers({
  auth,
  customer,
  products,
  wishlist
})
