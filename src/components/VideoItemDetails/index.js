import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'

import {MdPlaylistAdd} from 'react-icons/md'

import Loading from '../Loading/index'
import FailureView from '../FailureView/index'
import ThemeContext from '../../context/ThemeContext'
import {
  ResContainer,
  Description,
  ChannelSubscribers,
  ChannelName,
  ChannelTextContainer,
  ChannelImage,
  ChannelContainer,
  PlayerContainer,
  VideoPlayerContainer,
  Title,
  NumberContainer,
  Views,
  DotContainer,
  ButtonItem,
  Line,
} from './styledComponent'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoItemDetailsData: {},
    apiStatus: apiConstants.initial,
    saved: false,
    status: null,
  }

  componentDidMount() {
    this.getVideosDetailsData()
  }

  tryAgain = () => {
    this.setState({apiStatus: apiConstants.initial}, this.getVideosDetailsData)
  }

  handleLike = () => {
    this.setState(prev =>
      prev.status === 'like' ? {status: null} : {status: 'like'},
    ) // Toggle like
  }

  handleDislike = () => {
    this.setState(prev =>
      prev.status === 'dislike' ? {status: null} : {status: 'dislike'},
    ) // Toggle dislike
  }

  getVideosDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderVideoDetails()
      case apiConstants.inProgress:
        return <Loading />
      case apiConstants.failure:
        return <FailureView onClickRetry={this.tryAgain} />
      default:
        return null
    }
  }

  getVideosDetailsData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const videoDetails = fetchedData.video_details
      const updatedData = {
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.channel.subscriber_count,
        },
        description: videoDetails.description,
        id: videoDetails.id,
        publishedAt: formatDistanceToNow(new Date(videoDetails.published_at)),
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,
      }
      this.setState({
        videoItemDetailsData: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderVideoDetails = () => (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme, onClickSaveVideoButton} = value
        const {videoItemDetailsData, status, saved} = this.state

        const onHandleSave = () => {
          const {match} = this.props
          const {params} = match
          const {id} = params
          onClickSaveVideoButton(videoItemDetailsData, id)
        }

        const {
          videoUrl = '',
          title = '',
          publishedAt = '',
          viewCount = 0,
          channel = {name: '', profileImageUrl: '', subscriberCount: ''},
          description = '',
        } = videoItemDetailsData

        return (
          <PlayerContainer $darkTheme={darkTheme}>
            <VideoPlayerContainer>
              <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
            </VideoPlayerContainer>
            <Title $darkTheme={darkTheme}>{title}</Title>
            <ResContainer>
              <NumberContainer>
                <Views $darkTheme={darkTheme}>{viewCount} Views</Views>
                <DotContainer $darkTheme={darkTheme}>Dot</DotContainer>
                <Views $darkTheme={darkTheme}>{publishedAt}</Views>
              </NumberContainer>
              <NumberContainer>
                <ButtonItem
                  $darkTheme={darkTheme}
                  onClick={this.handleLike}
                  $liked={status === 'like'}
                >
                  {status === 'like' ? 'liked' : 'not'} Like
                </ButtonItem>
                <ButtonItem
                  $darkTheme={darkTheme}
                  onClick={this.handleDislike}
                  $liked={status === 'dislike'}
                >
                  {status === 'dislike' ? 'disliked' : 'not'} Dislike
                </ButtonItem>
                <ButtonItem
                  $darkTheme={darkTheme}
                  onClick={onHandleSave}
                  $liked={saved}
                >
                  <MdPlaylistAdd /> {saved ? 'Saved' : 'Save'}
                </ButtonItem>
              </NumberContainer>
            </ResContainer>
            <Line $darkTheme={darkTheme} />
            <ChannelContainer>
              <ChannelImage
                $darkTheme={darkTheme}
                alt={channel.name}
                src={channel.profileImageUrl}
              />
              <ChannelTextContainer>
                <ChannelName $darkTheme={darkTheme}>{channel.name}</ChannelName>
                <ChannelSubscribers
                  $darkTheme={darkTheme}
                >{`${channel.subscriberCount} subscribers`}</ChannelSubscribers>
              </ChannelTextContainer>
            </ChannelContainer>
            <Description $darkTheme={darkTheme}>{description}</Description>
          </PlayerContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return this.getVideosDetailsView()
  }
}

export default VideoItemDetails
