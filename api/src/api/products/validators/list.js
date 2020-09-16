import Joi from 'joi'

export default {
  query: Joi.object({
    page: Joi.number().required(),
    'customer.id': Joi.number()
  })
}
