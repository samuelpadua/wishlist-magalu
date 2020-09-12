import Joi from 'joi'

export default {
  payload: Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required()
  })
}
