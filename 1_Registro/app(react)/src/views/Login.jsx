import { ChangeTheme } from '../components/ChangeTheme.jsx'
import { InputIcon } from '../components/InputIcon.jsx'
import './css/login.css'

export const Login = () => {
  // eslint-disable-next-line no-undef
  const alert = ()=>Swal.fire('SweetAlert2 is working!')
  return (
    <div className='main'>
      <img className='logo' src='/src/assets/logo.png'></img>
      <br></br>
      <div className='form-login'>
        <div>
          <b className='title'>Iniciar Sesión</b>
          <div style={{ float: 'right' }}>
            <ChangeTheme></ChangeTheme>
          </div>
        </div>
        <br></br>
        <InputIcon title='Correo' icon={ 'fa-solid fa-envelope' } type='email'></InputIcon>
        <InputIcon title='Contraseña' icon={ 'fa-solid fa-key' } type='password'></InputIcon>
        <div style={{ float: 'right' }}>
          <a href='/registro'>Registrar usuario</a>
        </div>
        <br></br>
        <div style={{ textAlign:'center' }}>
          <button onClick={alert}>
            <b>Entrar</b>
          </button>
          <br></br>
          <small>DP © David Portador</small>
        </div>
      </div>
    </div>
  )
}