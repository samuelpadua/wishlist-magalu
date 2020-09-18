import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'rebass'

const ContainerStyled = styled(Box)`
  position: relative;
  margin: 0 auto !important;
  max-width: 1220px;
`

function Container({ children, ...props }) {
  return (
    <ContainerStyled
      {...props}
      px={15}
      width={props.width}
    >
      {children}
    </ContainerStyled>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string
}

Container.defaultProps = {
  width: '100%'
}

export default Container
