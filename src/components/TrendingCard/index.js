import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {
  Card,
  ThumbnailImg,
  ChannelDetails,
  Details,
  Title,
  Para,
} from './styledComponent'

import ThemeContext from '../../context/ThemeContext'

const TrendingCard = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value
      const {
        thumbnailUrl,
        channel,
        title,
        viewCount,
        publishedAt,
        id,
      } = props.videoData
      const date = formatDistanceToNow(new Date(publishedAt))
      return (
        <Link to={`/videos/${id}`}>
          <Card>
            <ThumbnailImg alt="Thumbnail" src={thumbnailUrl} />
            <ChannelDetails>
              <Title $darkTheme={darkTheme}>{title}</Title>
              <Details>
                <Para $darkTheme={darkTheme}>{channel.name}</Para>
                <Para $darkTheme={darkTheme}>{viewCount} Views</Para>
                <Para $darkTheme={darkTheme}>{date}</Para>
              </Details>
            </ChannelDetails>
          </Card>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default TrendingCard
