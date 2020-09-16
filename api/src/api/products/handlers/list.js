import httpStatus from 'http-status'
import * as productService from '../services/products.service'

export default async function (request, h) {
  const products = await productService.list(request.query)

  return h.response(products).code(httpStatus.OK)
}
