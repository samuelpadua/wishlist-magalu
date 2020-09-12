import Joi from 'joi'

export default {
  params: Joi.object({
    id: Joi.number().required()
  })
}
