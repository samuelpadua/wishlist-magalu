import Customer from '../models/customer.model'

export async function create (payload) {
  const emailAlreadyExists = await Customer.findOne({
    where: {
      email: payload.email
    }
  })

  if (emailAlreadyExists) {
    const error = new Error()
    error.message = 'This email is already in use'

    throw error
  }

  const customer = await Customer.create(payload)

  return customer
}

export async function find (where) {
  const customer = await Customer.findOne({
    where
  })

  return customer
}

export async function destroy (id) {
  const customer = await Customer.destroy({
    where: {
      id
    }
  })

  return customer
}
