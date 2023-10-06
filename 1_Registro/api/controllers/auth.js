import { s_loginUsuario } from '../services/auth.js'
import { decodeJWT, buscarGalleta } from '../middlewares/auth.js'

const loginUsuario = async (req, res) => {
    try {
        let token = buscarGalleta(req)
        if (token) {
            const usuario = decodeJWT(token)
            res.status(202).send({ mensaje: 'Ya existe una sesión de usuario', token, usuario })
        } else {
            const results = await s_loginUsuario(req.body)
            token = results.token
            const usuario = decodeJWT(token)
            res.cookie(
                'session_token', token,
                {
                    domain: process.env.DNS,
                    path: '/',
                    httpOnly: true,
                    maxAge: 24 * 3600 * 1000,
                    expires: 24 * 3600 * 1000
                }
            )
            res.status(200).send({ mensaje: 'Inicio de sesión exitoso', token, usuario })
        }
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).send({ mensaje: error.message, error })
    }
}

const logoutUsuario = async (req, res) => {
    try {
        if (buscarGalleta(req)) {
            res.cookie(
                'session_token', '',
                {
                    domain: process.env.DNS,
                    path: '/',
                    httpOnly: true,
                    maxAge: 0
                }
            )
            res.status(200).send({ mensaje: 'Galleta eliminada' })
        } else
            res.status(401).send({ mensaje: 'No hay galletas horneadas' })
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).send({ mensaje: error.message, error })
    }
}

export { loginUsuario, logoutUsuario }