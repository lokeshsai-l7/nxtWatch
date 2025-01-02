import {Link} from 'react-router-dom'

import {
  Card,
  ThumbnailImg,
  DetailsContainer,
  ChannelImg,
  ChannelDetails,
  Details,
  Title,
  Para,
  SubCon,
} from './styledComponent'
import ThemeContext from '../../context/ThemeContext'

const SavedVideosCard = props => (
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
      return (
        <Link to={`/videos/${id}`}>
          <Card>
            <ThumbnailImg alt="Thumbnail" src={thumbnailUrl} />
            <DetailsContainer>
              <ChannelImg alt="channel" src={channel.profileImageUrl} />
              <ChannelDetails>
                <Title $darkTheme={darkTheme}>{title}</Title>
                <Details $darkTheme={darkTheme}>
                  <Para $name>{channel.name}</Para>
                  <SubCon>
                    <Para>{viewCount} Views</Para>
                    <Para>{publishedAt}</Para>
                  </SubCon>
                </Details>
              </ChannelDetails>
            </DetailsContainer>
          </Card>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideosCard
