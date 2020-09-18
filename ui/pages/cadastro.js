import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { Flex, Text, Button, Box } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

import * as actionsCustomer from '../state/customer/actions'
import { Container } from '../components/Layout'
import useAuth from '../providers/useAuth'

function RegisterPage({
  customer,
  create
}) {
  const {
    register,
    handleSubmit,
    errors
  } = useForm()

  const { login, isAuthenticated } = useAuth()

  async function onSubmit(data) {
    create(data.email, data.name)
  }

  useEffect(() => {
    if (customer.id) {
      login(customer.email)
    }
  })

  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/minha-conta')
    }
  }, [isAuthenticated])

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" alignItems="center" pt={40}>
          <Box mb={10} style={{ maxWidth: '400px' }} width={1}>
            <Label color="#404040" htmlFor="name"><b>Nome</b></Label>
            <Input
              color="#8C8C8C"
              id="name"
              name="name"
              type="name"
              ref={register({ required: true })}
            />
            {errors.email && <Text mt="10px" color="#FF253A" fontWeight="bold">Por favor preencher com o seu nome</Text>}
          </Box>
          <Box mb={10} style={{ maxWidth: '400px' }} width={1}>
            <Label color="#404040" htmlFor="email"><b>Email</b></Label>
            <Input
              color="#8C8C8C"
              id="email"
              name="email"
              type="email"
              ref={register({ required: true })}
            />
            {errors.email && <Text mt="10px" color="#FF253A" fontWeight="bold">Por favor preencher com o email</Text>}
          </Box>
          <Box py={10} style={{ maxWidth: '400px' }} width={1}>
            <Button style={{ background: '#1686FF' }} mr={2} width={1} type="submit">Finalizar</Button>
          </Box>
        </Flex>
      </form>
    </Container>
  )
}

const mapStateToProps = ({ customer, auth }) => ({
  auth,
  customer
})

const mapActionsToProps = {
  ...actionsCustomer
}

export default connect(mapStateToProps, mapActionsToProps)(RegisterPage)
