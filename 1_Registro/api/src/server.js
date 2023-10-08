import 'dotenv/config'
import app from './app.js'
import connectMongoDB from '../config/database.js'

const uri = process.env.MONGODB_URI
const dns = process.env.DNS
const port = process.env.PORT

await connectMongoDB(uri).then((db)=>{
    if(db.includes('Error'))
        console.error(db)
    else
        app.listen(port, () => console.log(`Servidor funcionando\n url: http://${dns}:${port}\n db: ${db}`))
})