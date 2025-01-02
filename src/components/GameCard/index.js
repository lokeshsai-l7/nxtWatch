import {Link} from 'react-router-dom'
import {ThumbnailImg, Card, Title, ViewCount} from './styledComponent'
import ThemeContext from '../../context/ThemeContext'

const GameCard = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value
      const {videoData} = props
      const {thumbnailUrl, title, viewCount, id} = videoData
      return (
        <Link to={`/videos/${id}`}>
          <Card>
            <ThumbnailImg alt="video thumbnail" src={thumbnailUrl} />
            <Title $darkTheme={darkTheme}>{title}</Title>
            <ViewCount $darkTheme={darkTheme}>
              {viewCount} Watching Worldwide
            </ViewCount>
          </Card>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default GameCard
