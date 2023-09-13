import { s_getUsuarios } from '../services/users.mjs'

const profile = async (req, res) => {
    try {
        res.status(200).send({ mensaje: 'Perfil de usuario', usuario: req.user })
    } catch (error) {
        console.error(error)
        res.status(500).send({ mensaje: error.message, error })
    }
}

const list = async (req, res) => {
    try {
        const usuarios = await s_getUsuarios(req.user.rol)
        res.status(200).send({ mensaje: 'Lista de usuarios registrados', usuarios })
    } catch (error) {
        console.error(error)
        res.status(500).send({ mensaje: error.message, error })
    }
}

export { profile, list }