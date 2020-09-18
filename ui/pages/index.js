import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Flex, Text, Button } from 'rebass'
import Router from 'next/router'

import * as actionsProducts from '../state/products/actions'
import * as actionsAuth from '../state/auth/actions'
import * as actionsWishlist from '../state/wishlist/actions'
import ProductList from '../components/ProductList'
import { Container } from '../components/Layout'
import useAuth from '../providers/useAuth'

function ProductsPage({
  products,
  list,
  me,
  addWishlist,
  updateFavorite,
  removeWishlist
}) {
  const [ page, setPage ] = useState(1)
  const { isAuthenticated, customer, loading } = useAuth()

  useEffect(() => {
    async function loadProducts() {
      await list(page, customer)
    }

    if (!loading) {
      loadProducts()
    }

    return () => {
      setPage(page + 1)
    }
  }, [page, loading])

  async function loadMoreProducts() {
    const nextPage = products.page + 1

    await list(nextPage)
  }

  async function addProductToWishlist(product) {
    if (!isAuthenticated) {
      Router.push('/entrar')
    }

    if (product.isFavorite) {
      removeWishlist(customer, product)
    } else {
      addWishlist(customer, product)
    }

    updateFavorite(product.id, !product.isFavorite, product.wishlist_id)
  }

  return (
    <Container pt="8px">
      {products.isRequesting && (
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

      <ProductList
        products={products.products}
        handleAddProductWishlist={addProductToWishlist}
      />

      {!products.isRequesting && (
        <Flex justifyContent="center" pt={20} pb={100}>
          <Button style={{ background: '#1686FF' }} mr={2} onClick={() => loadMoreProducts()}>Carregar mais</Button>
        </Flex>
      )}
    </Container>
  )
}

ProductsPage.propTypes = {
  products: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    isRequesting: PropTypes.bool.isRequired
  }),
  list: PropTypes.func.isRequired
}

const mapStateToProps = ({ products, auth }) => ({
  auth,
  products
})

const mapActionsToProps = {
  ...actionsProducts,
  ...actionsAuth,
  ...actionsWishlist
}

export default connect(mapStateToProps, mapActionsToProps)(ProductsPage)
