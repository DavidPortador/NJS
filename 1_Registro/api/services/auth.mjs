import { generateAccessToken } from '../middlewares/auth.mjs'
import { HttpError } from '../middlewares/error.handler.mjs'
import { Usuario } from '../models/user.mjs'
import bcrypt from 'bcrypt'

const s_registroUsuario = async (body) => {
    try {
        const user = await Usuario.findOne({ correo: body.correo })
        if (user)
            throw new HttpError('El correo ingresado ya ha sido registrado', 406)
        const usuario = new Usuario({
            nombre: body.nombre,
            correo: body.correo,
            contrasena: body.contrasena,
            rol: (body.rol == 'admin') ? body.rol : 'comun'
        })
        let results = await usuario.save()
        results.contrasena = undefined
        return results
    } catch (error) {
        throw new HttpError(error.message, error.status || 500)
    }
}

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
        throw new HttpError('Contraseña incorrecta', 401)
}

export { s_registroUsuario, s_loginUsuario }