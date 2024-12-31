import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {
  Card,
  ThumbnailImg,
  DetailsContainer,
  ChannelImg,
  ChannelDetails,
  Details,
  Title,
  Para,
} from './styledComponent'
import ThemeContext from '../../context/ThemeContext'

const VideoCard = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value
      const {videoDetails} = props
      const {
        thumbnailUrl,
        channel,
        title,
        viewCount,
        publishedAt,
        id,
      } = videoDetails
      const date = formatDistanceToNow(new Date(publishedAt))
      return (
        <Link to={`/videos/${id}`}>
          <Card>
            <ThumbnailImg alt="Thumbnail" src={thumbnailUrl} />
            <DetailsContainer>
              <ChannelImg alt="channel" src={channel.profileImageUrl} />
              <ChannelDetails>
                <Title $darkTheme={darkTheme}>{title}</Title>
                <Details $darkTheme={darkTheme}>
                  <Para>{channel.name}</Para>
                  <Para>{viewCount} Views</Para>
                  <Para>{date}</Para>
                </Details>
              </ChannelDetails>
            </DetailsContainer>
          </Card>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default VideoCard
