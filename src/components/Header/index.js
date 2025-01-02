import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {GiHamburgerMenu} from 'react-icons/gi'
import {FaMoon} from 'react-icons/fa'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus, BiLogOut} from 'react-icons/bi'
import {IoMdClose, IoIosSunny} from 'react-icons/io'
import {withRouter, Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import HeaderBtn from '../HeaderBtn/index'

import {
  LogoutBtn,
  ProfileImg,
  NavBar,
  NavContainer,
  NxtWatchLogo,
  NavListContainer,
  SmallDisplayContainer,
  LargeDisplayContainer,
  NavList,
  SideNavBar,
  NavBtn,
  CloseBtn,
  PopupBtn,
  Modal,
  Heading,
  BtnContainer,
  SocialMediaContainer,
  SideHeading,
  SocialMediaImgContainer,
  SocialMediaImg,
  SocialMsg,
  NavSubContainer,
} from './styledComponent'

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

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme, onClickThemeChange} = value
      const onClickThemeBtn = () => {
        onClickThemeChange()
      }

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const cancelBtncolor = darkTheme ? '#f9f9f9' : '#00306e'

      return (
        <NavBar $darkTheme={darkTheme}>
          <NavContainer>
            <Link to="/">
              <NxtWatchLogo
                alt="website logo"
                src={
                  darkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
              />
            </Link>

            <NavListContainer>
              <NavBtn
                data-testid="theme"
                $darkTheme={darkTheme}
                onClick={onClickThemeBtn}
              >
                {darkTheme ? <IoIosSunny /> : <FaMoon />}
              </NavBtn>

              <SmallDisplayContainer>
                <Popup
                  trigger={
                    <NavBtn $darkTheme={darkTheme}>
                      <GiHamburgerMenu />
                    </NavBtn>
                  }
                  modal
                  position="left"
                  on="click"
                  mouseLeaveDelay={300}
                  mouseEnterDelay={0}
                  contentStyle={{padding: '0px', border: 'none'}}
                  arrow={false}
                >
                  {close => (
                    <SideNavBar $darkTheme={darkTheme}>
                      <CloseBtn $darkTheme={darkTheme} onClick={close}>
                        <IoMdClose />
                      </CloseBtn>
                      <NavSubContainer>
                        <NavList>
                          {navList.map(each => (
                            <HeaderBtn buttonDetails={each} key={each.id} />
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
                      </NavSubContainer>
                    </SideNavBar>
                  )}
                </Popup>
                <Popup
                  trigger={
                    <NavBtn $darkTheme={darkTheme}>
                      <BiLogOut />
                    </NavBtn>
                  }
                  modal
                  nested
                >
                  {close => (
                    <Modal $darkTheme={darkTheme}>
                      <Heading $darkTheme={darkTheme}>
                        Are you sure, you want to logout
                      </Heading>
                      <BtnContainer>
                        <PopupBtn
                          $border
                          $btnclr={cancelBtncolor}
                          onClick={() => {
                            console.log('modal closed ')
                            close()
                          }}
                        >
                          Cancel
                        </PopupBtn>
                        <PopupBtn onClick={onClickLogout}>Confirm</PopupBtn>
                      </BtnContainer>
                    </Modal>
                  )}
                </Popup>
              </SmallDisplayContainer>
              <LargeDisplayContainer>
                <ProfileImg
                  alt="profile"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                />
                <Popup
                  trigger={
                    <LogoutBtn
                      onClick={onClickLogout}
                      $darkTheme={darkTheme}
                      type="button"
                    >
                      Logout
                    </LogoutBtn>
                  }
                  modal
                  nested
                >
                  {close => (
                    <Modal $darkTheme={darkTheme}>
                      <Heading $darkTheme={darkTheme}>
                        Are you sure you want to logout?
                      </Heading>
                      <BtnContainer>
                        <PopupBtn
                          $border
                          $darkTheme={darkTheme}
                          onClick={() => {
                            close()
                          }}
                        >
                          Cancel
                        </PopupBtn>
                        <PopupBtn onClick={onClickLogout}>Confirm</PopupBtn>
                      </BtnContainer>
                    </Modal>
                  )}
                </Popup>
              </LargeDisplayContainer>
            </NavListContainer>
          </NavContainer>
        </NavBar>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
