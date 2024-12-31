import Loader from 'react-loader-spinner'
import {LoaderContainer} from './styledComponent'

const Loading = () => (
  <LoaderContainer data-testid="loader">
    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  </LoaderContainer>
)

export default Loading
