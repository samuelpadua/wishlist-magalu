import httpStatus from 'http-status'

import * as customerService from '../../../modules/customer/service/customer.service'

export default async function (request, h) {
  const result = await customerService.find(request.params.id)

  return h.response(result).code(httpStatus.OK)
}