import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Text } from 'rebass'
import { IoMdHeart } from 'react-icons/io'

import { Container } from '../components/Layout'
import * as actionsWishlist from '../state/wishlist/actions'
import useAuth, { ProtectRoute } from '../providers/useAuth'
import ProductList from '../components/ProductList'

function Wishlist({
  wishlist,
  listWishlist,
  removeWishlist
}) {
  const { isAuthenticated, customer } = useAuth()

  if (!isAuthenticated) {
    return null
  }

  useEffect(() => {
    listWishlist(customer.id)
  }, [])

  async function addProductToWishlist(product) {
    removeWishlist(customer, product)
  }

  return (
    <Container>
      <Flex py={3}>
        <Box mr={10}>
          <IoMdHeart color="#DD3294" size="2em" />
        </Box>
        <Box>
          <Text
            fontSize={4}
            color="#DD3294"
          >
            Favoritos
          </Text>

        </Box>
      </Flex>

      {wishlist.isRequesting && (
        <Flex p={30} justifyContent="center">
          <Text
            fontSize={4}
            fontWeight="bold"
            color="primary"
          >
            Carregando ...
          </Text>
        </Flex>
      )}

      {!wishlist.list.length && (
        <Flex p={30} justifyContent="center">
          <Text
            fontSize={4}
            color="primary"
          >
            Nenhum favorito adicionado
          </Text>
        </Flex>
      )}

      <ProductList
        products={wishlist.list}
        handleAddProductWishlist={addProductToWishlist}
      />
    </Container>
  )
}

Wishlist.propTypes = {

}

const mapStateToProps = ({
  wishlist
}) => ({
  wishlist
})

const mapActionsToProps = {
  ...actionsWishlist
}

const WishlistWithRedux = connect(mapStateToProps, mapActionsToProps)(Wishlist)

export default ProtectRoute(WishlistWithRedux)
