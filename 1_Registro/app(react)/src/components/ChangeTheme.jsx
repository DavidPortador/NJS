import { useTheme } from '../contexts/theme.jsx'
import './css/ChangeTheme.css'

export const ChangeTheme = () => {
  const { theme, toggleTheme } = useTheme()
  const icon = theme === 'dark' ? 'fa-regular fa-sun' : 'fa-solid fa-moon'
  return (
    <>
      <i className={ icon } onClick={ toggleTheme }></i>
    </>
  )
}