import {Component} from 'react'
import Cookies from 'js-cookie'
// import {RiCloseLargeFill} from 'react-icons/ri'
import {FaSearch} from 'react-icons/fa'

import {
  DataDisplayContainer,
  BannerContainer,
  WebsiteLogo,
  CloseBtn,
  PremiumText,
  GetItNow,
  DataContainer,
  SearchContainer,
  SearchInput,
  SearchImgBtn,
  VideoContainer,
  VideosList,
} from './styledComponent'

import VideoCard from '../VideoCard/index'
import Loading from '../Loading/index'
import FailureView from '../FailureView/index'
import ThemeContext from '../../context/ThemeContext'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    closeBanner: false,
    apiStatus: apiConstants.initial,
    inputSearch: '',
    videosData: [],
  }

  componentDidMount() {
    this.getVideosData()
  }

  onChangeInputSearch = event => {
    this.setState({inputSearch: event.target.value})
  }

  onClickEnter = event => {
    if (event.key === 'Enter') {
      this.getVideosData()
    }
  }

  onClickRetry = () => {
    this.getVideosData()
  }

  onClickCloseBanner = () => {
    this.setState({closeBanner: true})
  }

  getVideosData = async () => {
    console.log('api Called')
    this.setState({apiStatus: apiConstants.inProgress})
    const {inputSearch} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${inputSearch}`
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
        id: eachObj.id,
        publishedAt: eachObj.published_at,
        thumbnailUrl: eachObj.thumbnail_url,
        title: eachObj.title,
        viewCount: eachObj.view_count,
      }))
      this.setState({videosData: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderNoSearchResultsView = () => {
    const failedViewDetails = {
      failedAlt: 'no videos',
      darkThemeImgUrl:
        'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png',
      lightThemeImgUrl:
        'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png',
      heading: 'No Search results found',
      description: 'Try different key words or remove search filter',
    }
    return (
      <FailureView
        failedViewDetails={failedViewDetails}
        onClickRetry={this.onClickRetry}
      />
    )
  }

  renderVideos = () => {
    const {videosData} = this.state
    return (
      <VideosList>
        {videosData.map(eachObj => (
          <VideoCard key={eachObj.id} videoDetails={eachObj} />
        ))}
      </VideosList>
    )
  }

  getVideosView = () => {
    const {videosData, apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        if (videosData.length !== 0) {
          return this.renderVideos()
        }
        return this.renderNoSearchResultsView()
      case apiConstants.inProgress:
        return <Loading />
      case apiConstants.failure:
        return <FailureView onClickRetry={this.onClickRetry} />
      default:
        return null
    }
  }

  renderDataContainer = () => (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        const {inputSearch, closeBanner} = this.state
        return (
          <DataContainer $darkTheme={darkTheme}>
            <SearchContainer>
              <SearchInput
                $darkTheme={darkTheme}
                type="search"
                placeholder="Search"
                value={inputSearch}
                onChange={this.onChangeInputSearch}
                onKeyDown={this.onClickEnter}
              />
              <SearchImgBtn
                data-testid="searchButton"
                onClick={this.getVideosData}
                $darkTheme={darkTheme}
              >
                <FaSearch />
              </SearchImgBtn>
            </SearchContainer>
            <VideoContainer $close={closeBanner}>
              {this.getVideosView()}
            </VideoContainer>
          </DataContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderBanner = () => {
    const {closeBanner} = this.state
    return (
      <BannerContainer data-testid="banner" $close={closeBanner}>
        <CloseBtn
          data-testid="close"
          type="button"
          onClick={this.onClickCloseBanner}
        >
          close
        </CloseBtn>
        <WebsiteLogo
          alt="nxt watch logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        />
        <PremiumText>Buy Nxt Watch Premium</PremiumText>
        <GetItNow>GET IT NOW</GetItNow>
      </BannerContainer>
    )
  }

  renderHome = () => (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <DataDisplayContainer data-testid="home" $darkTheme={darkTheme}>
            {this.renderBanner()}
            {this.renderDataContainer()}
          </DataDisplayContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return this.renderHome()
  }
}

export default Home
