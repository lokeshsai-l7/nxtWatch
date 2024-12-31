import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Loading from '../Loading/index'
import FailureView from '../FailureView/index'
import RouteHeader from '../RouteHeader/index'
import TrendingCard from '../TrendingCard/index'
import ThemeContext from '../../context/ThemeContext'

import {
  DataDisplayContainer,
  DataContainer,
  TrendingVideoContainer,
  TrendingVideosList,
} from './styledComponent'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {trendingVideosData: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getTrendingVideosData()
  }

  tryAgain = () => {
    this.setState({apiStatus: apiConstants.initial}, this.getTrendingVideosData)
  }

  getTrendingVideosData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/trending`
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
        channel: {
          name: eachObj.channel.name,
          profileImageUrl: eachObj.channel.profile_image_url,
        },
        publishedAt: eachObj.published_at,
        id: eachObj.id,
        thumbnailUrl: eachObj.thumbnail_url,
        title: eachObj.title,
        viewCount: eachObj.view_count,
      }))
      this.setState({
        trendingVideosData: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderTrendingVideos = () => {
    const {trendingVideosData} = this.state
    return (
      <TrendingVideosList>
        {trendingVideosData.map(eachObj => (
          <TrendingCard key={eachObj.id} videoData={eachObj} />
        ))}
      </TrendingVideosList>
    )
  }

  getVideosView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderTrendingVideos()
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
      <RouteHeader name="Trending" icon={<HiFire />} />
      <TrendingVideoContainer>{this.getVideosView()}</TrendingVideoContainer>
    </DataContainer>
  )

  renderTrending = () => (
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
    return this.renderTrending()
  }
}

export default Trending
