import Joi from 'joi'

export default {
  params: Joi.object({
    id: Joi.number().required()
  }),
  payload: Joi.object({
    price: Joi.number().required(),
    image: Joi.string().required(),
    brand: Joi.string().required(),
    product_id: Joi.string().required(),
    title: Joi.string().required(),
    review_score: Joi.number().min(1).max(5)
  })
}
