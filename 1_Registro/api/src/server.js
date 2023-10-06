import  app  from './app.js'
import connectDB from '../config/database.js'

const port = process.env.PORT || 3000
const dns = process.env.DNS || 'localhost'
await connectDB()

app.listen(port, () => console.log(`Servidor funcionando en: http://${dns}:${port}`))