import React from 'react'
import styled from 'styled-components'

function Header() {
  return (
    <HeaderContainer>
      국내 모든 임상시험 검색하고
      <br /> 온라인으로 참여하기
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
`
