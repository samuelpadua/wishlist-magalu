import httpStatus from 'http-status'

import * as WishlistService from '../../../modules/customer/service/wishlist.service'

export default async function (request, h) {
  try {
    const result = await WishlistService.createFavoriteProduct(
      request.params.id,
      request.payload
    )

    return h.response(result).code(httpStatus.CREATED)
  } catch (error) {
    if (error.message) {
      return h.response({
        message: error.message
      }).code(httpStatus.CONFLICT)
    }
  }
}
