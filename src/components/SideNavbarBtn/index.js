import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import {ListItem, IconContainer, Text} from './styledComponent'

const SideNavbarBtn = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme, activeNavId, setActiveNavId} = value
      const {path, id, displayText} = props.buttonDetails
      const onClickNavBtn = () => {
        setActiveNavId(id)
      }
      const selectedNavbarRouteBg = darkTheme ? '#383838' : '#94a3b8'
      const selectedTextColor = darkTheme ? '#ffffff' : '#1e293b'
      const unSelectedColor = darkTheme ? '#f1f1f1' : ' #475569'
      return (
        <Link to={path} key={id}>
          <ListItem
            onClick={onClickNavBtn}
            $isActive={id === activeNavId}
            $bgColor={selectedNavbarRouteBg}
          >
            <IconContainer
              $isActive={id === activeNavId}
              $unselectedColor={unSelectedColor}
            >
              <props.buttonDetails.icon />
            </IconContainer>

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

export default SideNavbarBtn
