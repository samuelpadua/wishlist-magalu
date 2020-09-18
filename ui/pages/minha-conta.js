import React from 'react'
import {
  Flex,
  Text,
  Button,
  Box,
  Heading,
  Card
} from 'rebass'

import { Container } from '../components/Layout'
import useAuth, { ProtectRoute } from '../providers/useAuth'
import api from '../providers/api'

function MyAccount() {
  const {
    isAuthenticated,
    logout,
    customer
  } = useAuth()

  if (!isAuthenticated) {
    return null
  }

  function handleDestroyCustomer() {
    api
      .delete(`/api/customer/${customer.id}`)
      .then(logout())
  }

  return (
    <Container>
      <Flex flexDirection="column" alignItems="center" pt={40}>
        <Box mb={10} style={{ maxWidth: '500px' }} width={1}>
          <Card>
            <Heading color="#404040">{customer.name}</Heading>
            <Text color="#8C8C8C">{customer.email}</Text>
            <Flex flexDirection="row" alignItems="center" pt={40}>
              <Box width={1 / 2} mr="10px">
                <Button color="#FF253A" variant="outline" onClick={() => handleDestroyCustomer()} width={1}>
                  Excluir cadastro
                </Button>
              </Box>
              <Box width={1 / 2}>
                <Button color="#8C8C8C" variant="outline" onClick={() => logout()} width={1}>
                  Sair
                </Button>
              </Box>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </Container>
  )
}

export default ProtectRoute(MyAccount)
