import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { AuthProvider } from '../../../providers/useAuth'
import Header from '../Header'

describe('Header component', () => {
  it('should render no logged customer', () => {
    const tree = renderer
      .create(
        <AuthProvider>
          <Header />
        </AuthProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
