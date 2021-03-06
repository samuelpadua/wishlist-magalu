import httpStatus from 'http-status'

import * as wishlistService from '../services/wishlist.service'

export default async function (request, h) {
  const result = await wishlistService.list(request.params.id)

  return h.response(result).code(httpStatus.OK)
}
