import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { Flex, Text, Button, Box } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import Link from 'next/link'

import * as actionsProducts from '../state/products/actions'
import * as actionsAuth from '../state/auth/actions'
import { Container } from '../components/Layout'
import useAuth from '../providers/useAuth'

function LoginPage() {
  const {
    register,
    handleSubmit,
    errors
  } = useForm()

  const { isAuthenticated, login } = useAuth()

  async function onSubmit(data) {
    login(data.email)
  }

  useEffect(() => {
    console.log('isAuthenticated => ', isAuthenticated);
    if (isAuthenticated) {
      Router.push('/minha-conta')
    }
  }, [isAuthenticated])

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" alignItems="center" pt={40}>
          <Box mb={10} style={{ maxWidth: '400px' }} width={1}>
            <Label color="#404040" htmlFor="email">
              <b>Email</b>
            </Label>
            <Input
              color="#8C8C8C"
              id="email"
              name="email"
              type="email"
              ref={register({ required: true })}
            />
            {errors.email && <Text mt="10px" color="#FF253A" fontWeight="bold">Por favor preencher com o email</Text>}
            <br/>
            <Box py={10}>
              <Button style={{ background: '#1686FF' }} mr={2} width={1} type="submit">Entrar</Button>
            </Box>
            <Box py={10}>
              <Link href="/cadastro">
                <Button variant="outline" color="#8C8C8C" mr={2} width={1} type="button">Cadastro</Button>
              </Link>
            </Box>
          </Box>
        </Flex>
      </form>
    </Container>
  )
}

export default LoginPage
