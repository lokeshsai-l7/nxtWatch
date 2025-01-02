import styled from 'styled-components'

export const SideNavBar = styled.nav`
  @media screen and (max-width: 768px) {
    display: none;
  }
  width: 20%;
  height: 100%;
  background-color: ${props => (props.$darkTheme ? '#181818' : '#ffffff')};
  padding: 30px 0px 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90vh;
`

export const NavList = styled.ul`
  list-style-type: none;
  padding-left: 0px;
`

export const SocialMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  color: ${props => (props.$darkTheme ? '#ffffff' : '#00306e')};
`

export const SideHeading = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
`

export const SocialMediaImgContainer = styled(SocialMediaContainer)`
  padding-left: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const SocialMediaImg = styled.img`
  width: 40px;
  margin-right: 20px;
`

export const SocialMsg = styled.p`
  font-family: 'Roboto';
  font-size: 18px;
`
