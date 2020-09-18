import { combineReducers } from 'redux'
import customer from './customer/reducer'
import products from './products/reducer'
import wishlist from './wishlist/reducer'

export default combineReducers({
  customer,
  products,
  wishlist
})
