import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import GameCard from '../GameCard/index'
import RouteHeader from '../RouteHeader/index'
import Loading from '../Loading/index'
import FailureView from '../FailureView/index'
import ThemeContext from '../../context/ThemeContext'

import {
  DataDisplayContainer,
  DataContainer,
  GamingVideoContainer,
  GamingVideosList,
} from './styledComponent'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {gamingVideosData: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getGamingVideosData()
  }

  tryAgain = () => {
    this.setState({apiStatus: apiConstants.initial}, this.getGamingVideosData)
  }

  getGamingVideosData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(eachObj => ({
        id: eachObj.id,
        thumbnailUrl: eachObj.thumbnail_url,
        title: eachObj.title,
        viewCount: eachObj.view_count,
      }))
      this.setState({
        gamingVideosData: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderGamingVideos = () => {
    const {gamingVideosData} = this.state
    return (
      <GamingVideosList>
        {gamingVideosData.map(eachObj => (
          <GameCard key={eachObj.id} videoData={eachObj} />
        ))}
      </GamingVideosList>
    )
  }

  getVideosView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderGamingVideos()
      case apiConstants.inProgress:
        return <Loading />
      case apiConstants.failure:
        return <FailureView onClickRetry={this.tryAgain} />
      default:
        return null
    }
  }

  renderDataContainer = () => (
    <DataContainer>
      <RouteHeader name="Gaming" icon={<SiYoutubegaming />} />
      <GamingVideoContainer>{this.getVideosView()}</GamingVideoContainer>
    </DataContainer>
  )

  renderGaming = () => (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <DataDisplayContainer $darkTheme={darkTheme}>
            {this.renderDataContainer()}
          </DataDisplayContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return this.renderGaming()
  }
}

export default Gaming
