import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './views/Home.jsx'
import { Login } from './views/Login.jsx'
import { Registro } from './views/Registro.jsx'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home></Home> } ></Route>
      <Route path='/login' element={ <Login></Login> } ></Route>
      <Route path='/registro' element={ <Registro></Registro> } ></Route>
      <Route path='/*' element={ <Navigate to='/'></Navigate> } ></Route>
    </Routes>
  )
}