import React from 'react'
import styled from 'styled-components'

const Stars = styled.div`
  font-size: 2em;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
`

const StarsEmptyContent = styled.div`
  position: relative;

  div {
    float: left;
    color: #d8d8d8;
  }
`

const StarsFullContent = styled.div`
  position: absolute;
  top: 0;

  div {
    float: left;
    overflow: hidden;
    color: #FFCC03;
  }
`

function fillStars(score, index) {
  const quantityFullFilled = parseInt(score)

  const percents = []

  for (let i = 0; i < quantityFullFilled; ++i) {
    percents.push('20%')
  }

  if (score < 5) {
    percents.push(`${(score * 20) % 20}%`)
  }

  return percents[index] || '0%'
}

function Review ({ score }) {
  return (
    <Stars>
      <StarsEmptyContent>
        <div>&#9733;</div>
        <div>&#9733;</div>
        <div>&#9733;</div>
        <div>&#9733;</div>
        <div>&#9733;</div>
      </StarsEmptyContent>
      <StarsFullContent>
        <div style={{ width: fillStars(score, 0) }}>&#9733;</div>
        <div style={{ width: fillStars(score, 1) }}>&#9733;</div>
        <div style={{ width: fillStars(score, 2) }}>&#9733;</div>
        <div style={{ width: fillStars(score, 3) }}>&#9733;</div>
        <div style={{ width: fillStars(score, 4) }}>&#9733;</div>
      </StarsFullContent>
    </Stars>
  )
}

export default Review
