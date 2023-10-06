import { Router } from 'express'
import * as users from '../controllers/users.js'
import { verifyToken } from '../middlewares/auth.js'

const router = Router()

router.post('/registro', users.create_user)
router.get('/perfil', verifyToken, users.read_user)
router.patch('/actualizar', verifyToken, users.update_user)
router.delete('/eliminar', verifyToken, users.delete_user)

// rol: admin
router.get('/lista', verifyToken, users.get_list)

export { router }