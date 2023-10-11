import { createContext, useContext, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const initialTheme = () => localStorage.getItem('theme') || 'dark'
  const [theme, setTheme] = useState(initialTheme)
  const toggleTheme = () =>
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
  useLayoutEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'light') {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.classList.add('light-mode')
    } else {
      document.documentElement.classList.remove('light-mode')
      document.documentElement.classList.add('dark-mode')
    }
  }, [theme])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.object.isRequired
}

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) 
    throw new Error('useTheme must be used within a ThemeProvider')
  return context
}

export { ThemeProvider, useTheme }