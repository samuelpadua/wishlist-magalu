import Joi from 'joi'

export default {
  payload: Joi.object({
    email: Joi.string().required()
  })
}
