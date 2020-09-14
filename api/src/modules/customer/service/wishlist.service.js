'use strict'

import Wishlist from '../models/wishlist.model'

export async function createFavoriteProduct (customerId, payload) {
  const productAlreadyFavorite = await Wishlist.findOne({
    where: {
      customer_id: customerId,
      product_id: payload.product_id
    }
  })

  if (productAlreadyFavorite) {
    const error = new Error()
    error.message = 'This product already marked as a favorite'

    throw error
  }

  payload.customer_id = customerId

  const wishlist = await Wishlist.create(payload)

  return wishlist
}
