import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        mongoose
            .connect(process.env.MONGODB_URI)
            .then((conn) => console.log(`Conexion establecida en: ${conn.connections[0].name}`))
            .catch((error) => console.error(`Error al conectar con MongoDB: ${error.message}`))
    } catch (error) {
        console.error(`Error al conectar con MongoDB: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB