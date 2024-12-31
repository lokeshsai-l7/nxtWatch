import {Link} from 'react-router-dom'
import {ListItem, MenuIconContainer, Text} from './styledComponent'
import ThemeContext from '../../context/ThemeContext'

const HeaderBtn = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme, activeNavId, setActiveNavId} = value
      const {id, path, displayText} = props.buttonDetails

      const onClickNavBtn = () => {
        setActiveNavId(id)
      }
      const selectedNavbarRouteBg = darkTheme ? '#383838' : '#94a3b8'
      const selectedTextColor = darkTheme ? '#ffffff' : '#1e293b'
      const unSelectedColor = darkTheme ? '#f1f1f1' : ' #475569'

      return (
        <Link to={path}>
          <ListItem
            onClick={onClickNavBtn}
            $isActive={id === activeNavId}
            $bgColor={selectedNavbarRouteBg}
          >
            <MenuIconContainer
              $isActive={id === activeNavId}
              $unselectedColor={unSelectedColor}
            >
              <props.buttonDetails.icon />
            </MenuIconContainer>

            <Text
              $selectedColor={selectedTextColor}
              $unSelectedColor={unSelectedColor}
              $isActive={id === activeNavId}
            >
              {displayText}
            </Text>
          </ListItem>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default HeaderBtn
