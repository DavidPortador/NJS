import { Router } from 'express'
import { profile, list } from '../controllers/users.mjs'
import { verifyToken } from '../middlewares/auth.mjs'

const router = Router()

router.get('/profile', verifyToken, profile)
router.get('/list', verifyToken, list)

export { router }