import { ChangeTheme } from '../components/ChangeTheme.jsx'
import { InputIcon } from '../components/InputIcon.jsx'
import './css/login.css'

export const Login = () => {
  // eslint-disable-next-line no-undef
  const alert = () => Swal.fire('SweetAlert2 is working!')
  return (
    <div className='main'>
      <img className='logo' src='/src/assets/logo.png'></img>
      <div className='form-login'>
        <div>
          <b className='titulo'>Iniciar Sesión</b>
          <div style={{ float: 'right' }}>
            <ChangeTheme></ChangeTheme>
          </div>
        </div>
        <InputIcon title='Correo' icon={ 'fa-solid fa-envelope' } type='email'></InputIcon>
        <InputIcon title='Contraseña' icon={ 'fa-solid fa-key' } type='password'></InputIcon>
        <div style={{ textAlign: 'right' }}>
          <a href='/registro'>Registrar usuario</a>
        </div>
        <div style={{ textAlign:'center' }}>
          <button onClick={alert}>
            <b><i className="fa-solid fa-right-to-bracket"></i> Entrar</b>
          </button>
        </div>
        <div style={{ textAlign:'center' }}>
          <small><b>DP © David Portador</b></small>
        </div>
      </div>
    </div>
  )
}