import {Component} from 'react'
import Cookies from 'js-cookie'
import {
  ShwPswLabel,
  ResponsiveContainer,
  LoginCardContainer,
  FormContainer,
  InputContainer,
  Label,
  Input,
  NxtWatchLogo,
  ShowPswInput,
  LoginBtn,
  Error,
} from './styledComponent'
import ThemeContext from '../../context/ThemeContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showError: false,
    errorMsg: '',
  }

  onInputChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  validateCredentials = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
      console.log('success')
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderLoginForm = () => (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        const {
          username,
          password,
          showPassword,
          showError,
          errorMsg,
        } = this.state
        return (
          <ResponsiveContainer $darkTheme={darkTheme}>
            <LoginCardContainer $darkTheme={darkTheme}>
              <NxtWatchLogo
                alt="nxtwatch logo"
                src={
                  darkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
              />
              <FormContainer onSubmit={this.validateCredentials}>
                <InputContainer $normalContainer>
                  <Label $normalLabel htmlFor="username">
                    USERNAME
                  </Label>
                  <Input
                    $darkTheme={darkTheme}
                    onChange={this.onInputChange}
                    value={username}
                    type="text"
                    id="username"
                    placeholder="Username"
                  />
                </InputContainer>
                <InputContainer>
                  <Label $darkTheme={darkTheme} htmlFor="password">
                    PASSWORD
                  </Label>
                  <Input
                    $darkTheme={darkTheme}
                    onChange={this.onPasswordChange}
                    value={password}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Password"
                  />
                </InputContainer>
                <InputContainer
                  onClick={this.onClickShowPassword}
                  $normalContainer
                >
                  <ShwPswLabel $darkTheme={darkTheme}>
                    <ShowPswInput type="checkbox" />
                    Show Password
                  </ShwPswLabel>
                </InputContainer>
                <LoginBtn type="submit">Login</LoginBtn>
                {showError && <Error>{`*${errorMsg}`}</Error>}
              </FormContainer>
            </LoginCardContainer>
          </ResponsiveContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return this.renderLoginForm()
  }
}

export default Login
