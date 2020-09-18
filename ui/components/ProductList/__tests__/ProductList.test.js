import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { AuthProvider } from '../../../providers/useAuth'
import ProductList from '../ProductList'

describe('ProductList component', () => {
  it('should render no logged customer', () => {
    const products = [
      {
        price: 1699,
        image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
        brand: 'bébé confort',
        id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
        title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown',
        formattedPrice: 'R$ 1.699,00',
        isFavorite: false,
        wishlist_id: null
      },
      {
        price: 1149,
        image: 'http://challenge-api.luizalabs.com/images/958ec015-cfcf-258d-c6df-1721de0ab6ea.jpg',
        brand: 'bébé confort',
        id: '958ec015-cfcf-258d-c6df-1721de0ab6ea',
        title: 'Moisés Dorel Windoo 1529',
        formattedPrice: 'R$ 1.149,00',
        isFavorite: false,
        wishlist_id: null
      },
      {
        price: 1149,
        image: 'http://challenge-api.luizalabs.com/images/6a512e6c-6627-d286-5d18-583558359ab6.jpg',
        brand: 'bébé confort',
        id: '6a512e6c-6627-d286-5d18-583558359ab6',
        title: 'Moisés Dorel Windoo 1529',
        formattedPrice: 'R$ 1.149,00',
        isFavorite: true,
        reviewScore: 4.2,
        wishlist_id: null
      }
    ]

    const tree = renderer
      .create(
        <AuthProvider>
          <ProductList products={products} />
        </AuthProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
