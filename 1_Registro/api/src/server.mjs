import 'dotenv/config'
import express from 'express'
import { router } from '../routes/index.mjs'
import connectDB from '../config/database.mjs'

const port = process.env.PORT || 3000
const dns = process.env.DNS || 'localhost'
const app = express()

app.use(express.json())
app.use(router)

connectDB()

app.listen(port, () => console.log(`Servidor funcionando en: http://${dns}:${port}`))