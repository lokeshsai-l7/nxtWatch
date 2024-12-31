import styled from 'styled-components'

export const ListItem = styled.li`
  padding: 10px 0px 10px 40px;
  background-color: ${props =>
    props.$isActive ? props.$bgColor : 'transparent'};
  display: flex;
  align-items: center;
  font-family: 'Roboto';
  font-size: 20px;
`

export const MenuIconContainer = styled.div`
  color: ${props => (props.$isActive ? '#FC0A0A' : props.$unselectedColor)};
`

export const Text = styled.span`
  color: ${props =>
    props.$isActive ? props.$selectedColor : props.$unSelectedColor};
  padding-left: 15px;
  font-weight: ${props => (props.$isActive ? '600' : '500')};
`
