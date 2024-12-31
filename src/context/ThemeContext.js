import React from 'react'

const ThemeContext = React.createContext({
  darkTheme: true,
  onClickThemeChange: () => {},
  savedVideosList: [],
  onClickSaveVideoButton: () => {},
  activeNavId: 'HOME',
  setActiveNavId: () => {},
})

export default ThemeContext
