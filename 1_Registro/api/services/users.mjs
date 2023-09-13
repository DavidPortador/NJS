import { HttpError } from '../middlewares/error.handler.mjs'
import { Usuario } from '../models/user.mjs'

const s_getUsuarios = async (rol) => {
    try {
        if (rol === 'admin') {
            const usuarios = await Usuario.find().select('_id nombre correo rol')
            return usuarios
        } else
            throw new HttpError('Solo los administradores pueden ver la lista de usuarios', 403)
    } catch (error) {
        throw new HttpError(error.message, error.status || 500)
    }
}

export { s_getUsuarios }