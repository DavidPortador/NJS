import { Router } from 'express'
import { loginUsuario, logoutUsuario } from '../controllers/auth.js'

const router = Router()

router.post('/login', loginUsuario)
router.get('/logout', logoutUsuario)

export { router }