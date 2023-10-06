import { HttpError } from '../middlewares/error.handler.js'
import { Usuario } from '../models/user.js'
import bcrypt from 'bcrypt'

const s_create_user = async (body) => {
    try {
        const user = await Usuario.findOne({ correo: body.correo })
        if (user)
            throw new HttpError('El correo ingresado ya ha sido registrado', 406)
        let rol = body.rol
        if(!(rol === 'admin' || rol === 'tester' || rol === 'comun')){
            rol = 'comun'
        }
        const usuario = new Usuario({
            nombre: body.nombre,
            correo: body.correo,
            contrasena: body.contrasena,
            rol
        })
        let results = await usuario.save()
        results.contrasena = undefined
        return results
    } catch (error) {
        throw new HttpError(error.message, error.status || 500)
    }
}

const s_read_user = async (id) => {
    try{
        let usuario = await Usuario.findById(id)
        usuario.contrasena = undefined
        return usuario
    } catch (error) {
        throw new HttpError(error.message, error.status || 500)
    }
}

const s_update_user = async (body, user) => {
    try{
        const contrasena_actual = body.contrasena_actual || undefined
        if(contrasena_actual){
            const id = user.id || undefined
            if(id){
                const { contrasena } = await Usuario.findById(id).select('contrasena')
                if (await bcrypt.compare(contrasena_actual, contrasena)){
                    const nombre = body.nombre || undefined
                    let contrasena_nueva = body.contrasena_nueva || undefined
                    if(nombre || contrasena_nueva){
                        let body = {}
                        if(nombre)
                            body.nombre = nombre
                        if(contrasena_nueva){
                            const salt = await bcrypt.genSalt(10)
                            contrasena_nueva = await bcrypt.hash(contrasena_nueva, salt)
                            body.contrasena = contrasena_nueva  
                        }
                        let usuario_anterior = await Usuario.findByIdAndUpdate(id, body)
                        usuario_anterior.contrasena = undefined
                        let usuario_nuevo = await Usuario.findById(id)
                        usuario_nuevo.contrasena = undefined
                        return { usuario_anterior, usuario_nuevo }
                    }else
                        throw new HttpError('No existen campos a modificar', 400) 
                }else
                    throw new HttpError('Campo contrasena_actual incorrecto', 401)
            }else
                throw new HttpError('No se pudo identificar el usuario', 401)
        }else
            throw new HttpError('Campo contrasena_actual necesario', 401)
    } catch (error) {
        throw new HttpError(error.message, error.status || 500)
    }
}

const s_delete_user = async (body, user) => {
    let contrasena_actual = body.contrasena || undefined
    if(contrasena_actual){
        const id = user.id || undefined
        if(id){
            const { contrasena } = await Usuario.findById(id).select('contrasena')
            if (await bcrypt.compare(contrasena_actual, contrasena)){
                const results = await Usuario.findByIdAndDelete(id)
                return results
            }else
                throw new HttpError('Campo contrasena incorrecto', 401)
        }else
            throw new HttpError('No se pudo identificar el usuario', 401)
    }else
        throw new HttpError('Campo contrasena necesario', 401)
}

const s_getUsers = async (rol) => {
    try {
        if (rol === 'admin' || rol === 'tester') {
            const usuarios = await Usuario.find().select('_id nombre correo rol')
            return usuarios
        } else
            throw new HttpError('Solo los administradores pueden ver la lista de usuarios', 403)
    } catch (error) {
        throw new HttpError(error.message, error.status || 500)
    }
}

export { s_create_user, s_read_user, s_update_user, s_delete_user, s_getUsers }