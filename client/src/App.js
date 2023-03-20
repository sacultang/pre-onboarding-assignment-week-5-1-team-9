import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useCache } from 'hooks/useCache'
import useDebounce from 'hooks/useDebounce'
import Header from 'components/Header'
import Searchbar from 'components/Searchbar'
import RecommendedKeyword from 'components/RecommendedKeyword'

const App = () => {
  const [query, setQuery] = useState('')
  const [currentIndex, setCurrentIndex] = useState(-1)

  const debounceVal = useDebounce(query)
  const { data, isLoading, status } = useCache(debounceVal)

  useEffect(() => {
    setCurrentIndex(-1)
  }, [query])

  const keyHandler = event => {
    if (query === '' || event.nativeEvent.isComposing) return
    if (event.code === 'ArrowDown') {
      currentIndex >= data.length - 1 ? setCurrentIndex(0) : setCurrentIndex(prev => prev + 1)
    }
    if (event.code === 'ArrowUp') {
      currentIndex <= 0 ? setCurrentIndex(data.length - 1) : setCurrentIndex(prev => prev - 1)
    }
    if (event.code === 'Enter' && currentIndex >= 0) {
      setQuery(data[currentIndex].sickNm)
    }
  }
  return (
    <Container onKeyDown={keyHandler}>
      <Header />

      <Searchbar setQuery={setQuery} query={query} />

      <RecommendedKeyword
        status={status}
        isLoading={isLoading}
        data={data}
        query={debounceVal}
        currentIndex={currentIndex}
      />
    </Container>
  )
}

export default App

const Container = styled.div`
  margin: 0 auto;
  width: 600px;
  padding: 30px;
  background-color: #d0e8fd;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
`
