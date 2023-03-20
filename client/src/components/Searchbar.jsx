import React from 'react'
import styled from 'styled-components'

function Searchbar({ setQuery, query }) {
  const onChangeHandler = event => setQuery(event.target.value)

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        value={query}
        onChange={onChangeHandler}
        placeholder="질환명을 입력해주세요."
      />
      <SearchButton>검색</SearchButton>
    </SearchBarContainer>
  )
}

export default Searchbar

const SearchBarContainer = styled.div`
  width: 100%;
  margin: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`

const SearchInput = styled.input`
  width: 65%;
  padding: 10px;
  border: none;
  border-radius: 20px 0 0 20px;
  &::placeholder {
    background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png);
    background-size: contain;
    background-position: 1px center;
    background-repeat: no-repeat;
    text-align: center;
    text-indent: 0;
  }
`

const SearchButton = styled.button`
  padding: 10px 5px;
  cursor: pointer;
  background-color: #027be8;
  color: white;
  text-decoration: none;
  text-align: center;
  border: none;
  width: 10%;
  border-radius: 0 20px 20px 0;
`
