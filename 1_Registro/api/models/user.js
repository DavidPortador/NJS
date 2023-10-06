import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: 'Campo nombre necesario'
    },
    correo: {
        type: String,
        required: 'Campo correo necesario',
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El correo no cumple con el patrón adecuado']
    },
    contrasena: {
        type: String,
        required: 'Campo contrasena necesario'
    },
    rol: {
        type: String,
        default: 'comun'
    }
}, { timestamps: true })

schema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const npass = await bcrypt.hash(this.contrasena, salt)
        this.contrasena = npass
        next()
    } catch (error) {
        console.error(error)
        next(error)
    }
})

const Usuario = mongoose.model('Usuario', schema)

export { Usuario }