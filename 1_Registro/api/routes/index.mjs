import { fileURLToPath } from 'node:url'
import { Router } from 'express'
import path from 'node:path'
import fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PATH_ROUTER = `${__dirname}`
const router = Router()

router.get('/', (req, res) => {
    res.send({
        mensaje: 'API REST hecha con Express, MongoDB y JWT',
        autor: 'David Portador'
    })
})

const cleanFileName = (fileName) => {
    const file = fileName.split('.').shift()
    return file
}

fs.readdirSync(PATH_ROUTER).filter((FileName) => {
    const cleanName = cleanFileName(FileName)
    if (cleanName !== 'index')
        import(`./${cleanName}.mjs`).then((moduleRouter) => {
            router.use(`/${cleanName}`, moduleRouter.router)
        })

})

export { router }