'use strict'

import Wishlist from '../models/wishlist.model'

function serializeWishlist (wishlist) {
  return wishlist.map((product) => ({
    ...product.dataValues,
    isFavorite: true,
    reviewScore: product.review_score,
    wishlist_id: product.id
  }))
}

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

export async function list (customerId) {
  const wishlist = await Wishlist.findAll({
    where: {
      customer_id: customerId
    }
  })

  return serializeWishlist(wishlist)
}

export async function destroy (customerId, wishlistId) {
  const deleted = await Wishlist.destroy({
    where: {
      id: wishlistId,
      customer_id: customerId
    }
  })

  return deleted
}
