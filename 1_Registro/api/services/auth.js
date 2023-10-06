import { generateAccessToken } from '../middlewares/auth.js'
import { HttpError } from '../middlewares/error.handler.js'
import { Usuario } from '../models/user.js'
import bcrypt from 'bcrypt'

const s_loginUsuario = async (body) => {
    try {
        const user = await Usuario.findOne({ correo: body.correo })
        if (user === null)
            throw new HttpError('No existe registro del correo', 401)
        await compararContrasenaBD(body.contrasena, user.contrasena)
        const token = generateAccessToken({
            id: user._id,
            nombre: user.nombre,
            correo: user.correo,
            rol: user.rol
        })
        return token
    } catch (error) {
        throw new HttpError(error.message, error.status || 500)
    }
}

const compararContrasenaBD = async (contrasenaInput, contrasenaBD) => {
    const match = await bcrypt.compare(contrasenaInput, contrasenaBD)
    if (!match)
        throw new HttpError('Campo contrasena incorrecto', 401)
}

export { s_loginUsuario }