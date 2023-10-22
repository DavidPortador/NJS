import PropTypes from 'prop-types'
import { useState } from 'react'
import './css/InputIcon.css'

const defalutType = 'text'
const defaultIconEye = 'fa-solid fa-eye-slash'

export const InputIcon = ({ title, icon, type }) => {
  const [tipo, setType] = useState(type === 'password' ? type : defalutType)
  const [iconEye, setIconEye] = useState(defaultIconEye)
  const changeType = () => {
    setType(tipo==='password' ? defalutType : 'password')
    setIconEye(tipo==='password' ? 'fa-solid fa-eye' : defaultIconEye)
  }
  return (
    <div className="input-container">
      <input type={tipo} className="input-text" placeholder="a" required />
      <label className="labelform">
        <i className={icon}></i> {title}:
      </label>
      { type === 'password' &&
        <i className={`eye ${iconEye}`} onClick={changeType}></i>
      }
    </div>
  )
}

InputIcon.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string
}

InputIcon.defaultProps = {
  icon: 'fa-brands fa-react',
  type: defalutType
}