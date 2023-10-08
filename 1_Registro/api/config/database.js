import mongoose from 'mongoose'

const connectMongoDB = async (uri) => {
    let response = 'Error al conectar con MongoDB.\xa0'
    try {
        await mongoose
            .connect(uri)
            .then((conn) => {
                response = conn.connections[0].name
            })
            .catch((error) => {
                response += error.message
            })
        return response 
    } catch (e) {
        return response + e.message
    }
}

export default connectMongoDB