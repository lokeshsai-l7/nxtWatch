import styled from 'styled-components'

export const SavedVideosContainer = styled.div`
  height: 90vh;
  background-color: ${props => (props.$darkTheme ? '#000000' : '#f1f1f1')};
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const NoVideosContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const NoVideosImg = styled.img`
  width: 80%;
  @media screen and (min-width: 768px) {
    width: 40%;
  }
`

export const NoVideosHead = styled.h1`
  color: ${props => (props.$darkTheme ? '#f9f9f9' : '#231f20')};
  @media screen and (min-width: 768px) {
    font-size: 28px;
  }
  font-size: 20px;
  font-family: 'Roboto';
`

export const NoVideosDes = styled.p`
  color: ${props => (props.$darkTheme ? '#ebebeb' : '#606060')};
  @media screen and (min-width: 768px) {
    font-size: 20px;
  }
  font-size: 16px;
  font-family: 'Roboto';
`

export const VideosList = styled.ul`
  width: 100%;
  list-style-type: none;
  padding-left: 0px;
  display: flex;
  flex-direction: column;
`
