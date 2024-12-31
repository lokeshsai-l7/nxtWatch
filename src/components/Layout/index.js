import {MainContainer, ContentContainer} from './styledComponent'
import Header from '../Header/index'
import SideNavbar from '../SideNavbar/index'

const Layout = ({children}) => (
  <MainContainer>
    <Header />
    <ContentContainer>
      <SideNavbar />
      {children}
    </ContentContainer>
  </MainContainer>
)

export default Layout
