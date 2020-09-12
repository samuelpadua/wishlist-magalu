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

export async function find (id) {
  return await Customer.findOne({
    where: {
      id
    }
  })
}

export async function destroy (id) {
  return await Customer.destroy({
    where: {
      id
    }
  })
}
