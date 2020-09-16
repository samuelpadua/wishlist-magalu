import jwt from 'jsonwebtoken'

import Customer from '../../customer/models/customer.model'

export async function generateToken (email) {
  const customer = await Customer.findOne({
    where: {
      email
    }
  })

  if (!customer) {
    const error = new Error()
    error.message = 'Not authorized'
    throw error
  }

  const secretKey = process.env.JWT_SECRET || 'some_jwt_secret'

  const token = jwt.sign({
    id: customer.id,
    email: customer.email
  }, secretKey, {})

  return token
}

export async function validate (decoded, request, h) {
  const customer = await Customer.findOne({
    where: {
      id: decoded.id,
      email: decoded.email
    }
  })

  if (customer) {
    return {
      isValid: true
    }
  }

  return { isValid: false }
}
