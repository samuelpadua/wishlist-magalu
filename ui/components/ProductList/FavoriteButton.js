import React from 'react'
import { IoMdHeart } from 'react-icons/io'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
		transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(220,68,167, 0.7);
    color: rgba(220,68,167, 0.7);
	}

	70% {
		transform: scale(1);
    box-shadow: 0 0 0 10px rgba(220,68,167, 0);
    color: rgba(220,68,167, 0);
	}

	100% {
		transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(220,68,167, 0);
    color: rgba(220,68,167, 0.7);
	}
`;


const FavoriteButtonStyled = styled.div`
  .heart {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    transition: .333s;

    svg:hover{
      font-size: 2.2em;
    }

    svg {
      transition: .333s;
      font-size: 2em;
      color:#cbcbcb
    }
  }

  .checked {
    svg {
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgb(220,68,167, .1);
      transform: scale(1);
      animation: ${pulse} 2s 1;
      color: #DD3294 !important;
    }
  }
`

function FavoriteButton ({ product, handleAddProductWishlist }) {
  return (
    <FavoriteButtonStyled product={product} onClick={() => handleAddProductWishlist(product)}>
      <div className={`heart ${product.isFavorite && 'checked'}`}>
        <IoMdHeart />
      </div>
    </FavoriteButtonStyled>
  )
}

export default FavoriteButton
