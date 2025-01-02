import {BiListPlus} from 'react-icons/bi'
import RouteHeader from '../RouteHeader/index'
import SavedVideosCard from '../SavedVideosCard/index'
import ThemeContext from '../../context/ThemeContext'
import {
  SavedVideosContainer,
  NoVideosContainer,
  NoVideosImg,
  NoVideosHead,
  NoVideosDes,
  VideosList,
} from './styledComponent'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme, savedVideosList} = value
      const renderNoVideos = () => (
        <NoVideosContainer>
          <NoVideosImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <NoVideosHead $darkTheme={darkTheme}>
            No saved videos found
          </NoVideosHead>
          <NoVideosDes $darkTheme={darkTheme}>
            You can save your videos while watching them
          </NoVideosDes>
        </NoVideosContainer>
      )

      const renderSavedVideos = () => (
        <>
          <RouteHeader icon={<BiListPlus />} name="Saved Videos" />
          <VideosList>
            {savedVideosList.map(eachObj => (
              <SavedVideosCard key={eachObj.id} videoDetails={eachObj} />
            ))}
          </VideosList>
        </>
      )

      return (
        <SavedVideosContainer $darkTheme={darkTheme}>
          {savedVideosList.length > 0 ? renderSavedVideos() : renderNoVideos()}
        </SavedVideosContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideos
