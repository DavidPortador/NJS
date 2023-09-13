import { Router } from 'express'
import { loginUsuario, registroUsuario, logoutUsuario } from '../controllers/auth.mjs'

const router = Router()

router.post('/registro', registroUsuario)
router.post('/login', loginUsuario)
router.post('/logout', logoutUsuario)

export { router }