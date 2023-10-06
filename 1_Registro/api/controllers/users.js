import * as users from '../services/users.js'

const create_user = async (req, res) => {
    try {
        const usuario = await users.s_create_user(req.body)
        res.status(200).send({ mensaje: 'Usuario registrado', usuario })
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).send({ mensaje: error.message, error })
    }
}

const read_user = async (req, res) => {
    try {
        const usuario = await users.s_read_user(req.user.id)
        res.status(200).send({ mensaje: 'Perfil de usuario', usuario })
    } catch (error) {
        console.error(error)
        res.status(500).send({ mensaje: error.message, error })
    }
}

const update_user = async (req, res) => {
    try {
        const cambios = await users.s_update_user(req.body, req.user)
        res.status(200).send({ mensaje: 'Usuario actualizado', cambios })
    } catch (error) {
        console.error(error)
        res.status(500).send({ mensaje: error.message, error })
    }
}

const delete_user = async (req, res) => {
    try {
        const cambios = await users.s_delete_user(req.body, req.user)
        res.status(200).send({ mensaje: 'Usuario eliminado', cambios })
    } catch (error) {
        console.error(error)
        res.status(500).send({ mensaje: error.message, error })
    }
}

const get_list = async (req, res) => {
    try {
        const usuarios = await users.s_getUsers(req.user.rol)
        res.status(200).send({ mensaje: 'Lista de usuarios registrados', usuarios })
    } catch (error) {
        console.error(error)
        res.status(500).send({ mensaje: error.message, error })
    }
}

export { create_user, read_user, update_user, delete_user, get_list }