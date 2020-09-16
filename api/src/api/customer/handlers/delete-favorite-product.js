import httpStatus from 'http-status'

import * as wishlistService from '../services/wishlist.service'

export default async function (request, h) {
  const result = await wishlistService.destroy(request.params.id, request.params.wishlist_id)

  return h.response(result).code(httpStatus.NO_CONTENT)
}
