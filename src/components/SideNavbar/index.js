import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {
  SideNavBar,
  NavList,
  SocialMediaContainer,
  SideHeading,
  SocialMediaImgContainer,
  SocialMediaImg,
  SocialMsg,
} from './styledComponent'
import ThemeContext from '../../context/ThemeContext'
import SideNavbarBtn from '../SideNavbarBtn/index'

const navList = [
  {
    id: 'HOME',
    displayText: 'Home',
    icon: AiFillHome,
    path: '/',
  },
  {
    id: 'GAMING',
    displayText: 'Gaming',
    icon: SiYoutubegaming,
    path: '/gaming',
  },
  {
    id: 'TRENDING',
    displayText: 'Trending',
    icon: HiFire,
    path: '/trending',
  },
  {
    id: 'SAVEDVIDEOS',
    displayText: 'Saved Videos',
    icon: BiListPlus,
    path: '/savedvideos',
  },
]

const SideNavbar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value
      return (
        <SideNavBar $darkTheme={darkTheme}>
          <NavList>
            {navList.map(each => (
              <SideNavbarBtn buttonDetails={each} key={each.id} />
            ))}
          </NavList>
          <SocialMediaContainer $darkTheme={darkTheme}>
            <SideHeading>Contact Us</SideHeading>
            <SocialMediaImgContainer>
              <SocialMediaImg
                alt="facebook logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              />
              <SocialMediaImg
                alt="twitter logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              />
              <SocialMediaImg
                alt="linked in logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              />
            </SocialMediaImgContainer>
            <SocialMsg>
              Enjoy! Now to see your channels and recommendations!
            </SocialMsg>
          </SocialMediaContainer>
        </SideNavBar>
      )
    }}
  </ThemeContext.Consumer>
)

export default SideNavbar
