import React, { Fragment } from 'react'
import { Flex, Box } from 'rebass'
import Link from 'next/link'
import { MdAccountCircle } from 'react-icons/md'
import { IoMdHeart } from 'react-icons/io'

import { Container } from '../Layout'
import { Logo } from './style'
import styled from 'styled-components'
import useAuth from '../../providers/useAuth'

const Nav = styled.nav`
  background: #1686FF;
`

const LoginLink = styled.div`
  a {
    padding-top: 4px;
    color: #ffffff !important;
    cursor: pointer;
  }
`

function Header() {
  const { isAuthenticated } = useAuth()

  return (
    <Nav>
      <Container>
        <Flex width={1}>
          <Box pt={22} pb="8px">
            <Link href="/">
              <Logo>
                <img src="https://lojas.magazineluiza.com.br/_nuxt/img/7064da1.png" />
              </Logo>
            </Link>
          </Box>
          <Flex justifyContent="flex-end" py={15} width={1}>
            {!isAuthenticated && (
              <LoginLink>
                <Link href="/entrar">
                  Entrar
                </Link>
              </LoginLink>
            )}
            {isAuthenticated && (
              <Fragment>
                <Box mr={10}>
                  <Link href="/favoritos" style={{ cursor: 'pointer' }}>
                    <IoMdHeart color="#ffffff" size="2em" />
                  </Link>
                </Box>
                <Box>
                  <Link href="/minha-conta" style={{ cursor: 'pointer' }}>
                    <MdAccountCircle color="#ffffff" size="2em" />
                  </Link>
                </Box>
              </Fragment>
            )}
          </Flex>
        </Flex>
      </Container>
    </Nav>
  )
}

export default Header
