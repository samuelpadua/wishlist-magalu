import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css } from 'styled-components'
import { Box, Flex } from 'rebass'

import Review from './Review'
import FavoriteButton from './FavoriteButton'

function createCSS() {
  let styles = '';

  for (let i = 0; i < 100; i += 1) {
    styles += `
    .effect${i} {
      animation: .333s ease-in-out ${i / 13}s 1 backwards;
      opacity: 1;
    }`

  }
  return css`${styles}`;
}

const Product = styled(Box)`
  ${createCSS()}
  ${(props) =>
    css`
      .product {
        animation-name: ${keyframes`
          from {
            opacity: 0;
          }
          to {
            opacity: 1
          }
        `} !important;
      }
    `}
  background: white;
  padding: 12px;
  box-shadow: 1px 10px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e8e8e8;
  margin: 30px 1%;
  border-radius: 5px;
  text-align: center;
  position: relative;
  transition: .233s;
  width: calc(20% - 8px);

  &:hover {
    box-shadow: 1px 10px 20px rgba(0, 0, 0, 0.6);
  }

  @media(max-width: 900px) {
    width: calc(25% - 8px);
  }

  @media(max-width: 700px) {
    width: calc(33.333% - 8px);
  }

  @media(max-width: 400px) {
    width: calc(50% - 8px);
  }
`

const Image = styled(Box)`
  text-align: center;
  img {
    max-width: 130px;
    width: 100%;
  }

  @media(max-width: 700px) {
    img {
      max-width: 90px;
    }
  }

  @media(max-width: 400px) {
    img {
      max-width: 75px;
    }
  }
`

const Title = styled.p`
  font-size: 1em;
  line-height: normal;
  margin-bottom: 10px;
  margin-top: 15px;
  color: #404040;
  font-weight: 400;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Price = styled.p`
  font-weight: bold;
  font-size: 1.3em;
`

function ProductList({ products, handleAddProductWishlist }) {
  return (
    <Flex flexWrap='wrap' mx={-2}>
      {products.map((product, index) => (
        <Product px={2} pt={2} m={1} className={`effect${index} product`} key={product.id}>
          <FavoriteButton product={product} handleAddProductWishlist={handleAddProductWishlist} />
          <Image px={15} pt={15}>
            <img src="https://a-static.mlcdn.com.br/618x463/smartphone-quantum-muv-pro-azul-tela-de-5-5-32gb-16mp/onofre-agora/745804/1ba149b5f3aee4f4bf0715772888924c.jpg" />
          </Image>
          {product.reviewScore && <Review score={product.reviewScore} />}
          <Title>{product.title} - {product.brand}</Title>
          <Price>{product.formattedPrice}</Price>
        </Product>
      ))}
    </Flex>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    formattedPrice: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    reviewScore: PropTypes.number
  }))
}

export default ProductList
