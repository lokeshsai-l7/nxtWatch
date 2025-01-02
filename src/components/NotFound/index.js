import {NotFoundContainer} from './styledComponent'
import FailureView from '../FailureView'
import ThemeContext from '../../context/ThemeContext'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value
      const failedViewDetails = {
        failedAlt: 'not found',
        darkThemeImgUrl:
          'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png',
        lightThemeImgUrl:
          'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png',
        heading: 'Page Not Found',
        description: 'We are sorry the page you requested could not be found',
      }
      return (
        <NotFoundContainer $darkTheme={darkTheme}>
          <FailureView
            showRetryButton={false}
            failedViewDetails={failedViewDetails}
          />
        </NotFoundContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
