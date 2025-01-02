import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login/index'
import Layout from './components/Layout/index'
import Home from './components/Home/index'
import ThemeContext from './context/ThemeContext'
import Gaming from './components/Gaming/index'
import Trending from './components/Trending/index'
import VideoItemDetails from './components/VideoItemDetails/index'
import SavedVideos from './components/SavedVideos/index'
import ProtectedRoute from './components/ProtectedRoute/index'
import NotFound from './components/NotFound/index'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    darkTheme: false,
    savedVideosList: [],
    activeNavId: 'HOME',
  }

  onClickThemeChange = () => {
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))
  }

  setActiveNavId = id => {
    this.setState({activeNavId: id})
  }

  onClickSaveVideoButton = (newVideoObj, id) => {
    console.log('called')
    console.log(newVideoObj, id)
    this.setState(prevState => {
      const isAlreadySaved = prevState.savedVideosList.some(
        item => item.id === id,
      )
      if (isAlreadySaved) {
        return {
          savedVideosList: prevState.savedVideosList.filter(
            item => item.id !== id,
          ),
        }
      }
      return {
        savedVideosList: [...prevState.savedVideosList, newVideoObj],
      }
    })
  }

  render() {
    const {savedVideosList, activeNavId, darkTheme} = this.state
    console.log(savedVideosList)
    return (
      <ThemeContext.Provider
        value={{
          savedVideosList,
          activeNavId,
          darkTheme,
          onClickThemeChange: this.onClickThemeChange,
          onClickSaveVideoButton: this.onClickSaveVideoButton,
          setActiveNavId: this.setActiveNavId,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Layout>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Layout>
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
