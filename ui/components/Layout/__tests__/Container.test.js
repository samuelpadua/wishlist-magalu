import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { AuthProvider } from '../../../providers/useAuth'
import Container from '../Container'

describe('Container component', () => {
  it('should render no logged customer', () => {
    const tree = renderer
      .create(<Container>Content</Container>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
