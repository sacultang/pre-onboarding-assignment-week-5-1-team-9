import React from 'react'
import styled from 'styled-components'
import Highlights from './Highlights'
import NoResults from './NoResults'
import Spinner from './Spinner'
import { AiOutlineSearch } from 'react-icons/ai'

function RecommendedKeyword({ data, query, isLoading, status }) {
  return (
    <RecommendedContainer>
      <RecommendedHeader>추천 검색어</RecommendedHeader>
      <RecommendedKeywordUL>
        {isLoading ? (
          <Spinner />
        ) : (
          data.map((item, index) => (
            <RecommendedLI key={index}>
              <AiOutlineSearch />
              <Highlights query={query} total={item.sickNm} />
            </RecommendedLI>
          ))
        )}
        {(status === 'NoResults' || status === 'Reset') && <NoResults />}
      </RecommendedKeywordUL>
    </RecommendedContainer>
  )
}

export default React.memo(RecommendedKeyword)

const RecommendedKeywordUL = styled.ul`
  list-style: none;
  & Spinner {
    margin: 0 auto;
  }
`

const RecommendedLI = styled.li`
  list-style: none;
  padding: 10px 0;
  display: flex;
  align-items: center;
`

const RecommendedHeader = styled.div`
  margin: 5px 0 0 5px;
  font-weight: 300;
  font-size: 12px;
`

const RecommendedContainer = styled.div`
  width: 80%;
  background-color: white;
  border-radius: 10px;
`
