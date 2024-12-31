import {
  RouteHeaderContainer,
  RouteLogoContainer,
  RouteHeading,
} from './styledComponent'
import ThemeContext from '../../context/ThemeContext'

const RouteHeader = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value
      const {icon, name} = props
      return (
        <RouteHeaderContainer $darkTheme={darkTheme}>
          <RouteLogoContainer $darkTheme={darkTheme}>{icon}</RouteLogoContainer>
          <RouteHeading $darkTheme={darkTheme}>{name}</RouteHeading>
        </RouteHeaderContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default RouteHeader
