import axios from 'axios'
import numeral from 'numeral'

import config from '../../../config/environment'
import Wishlist from '../../customer/models/wishlist.model'

function serializeProducts (products, wishlist = []) {
  return products.map((product) => ({
    ...product,
    price: numeral(product.price).format('$ 0,0.00'),
    isFavorite: wishlist.some((favoriteProduct) => product.id === favoriteProduct.product_id)
  }))
}

export async function list (params) {
  const { data } = await axios.get(`${config.apis.challenge.baseUrl}/api/product/`, {
    params: {
      page: params.page
    }
  })

  let wishlist = []
  if (params['customer.id']) {
    wishlist = await Wishlist.findAll({
      where: {
        customer_id: params['customer.id']
      }
    })
  }

  return {
    ...data,
    products: serializeProducts(data.products, wishlist)
  }
}
