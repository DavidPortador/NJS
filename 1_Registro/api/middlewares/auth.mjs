import jwt from 'jsonwebtoken'

const generateAccessToken = (json) => {
    const firmado = jwt.sign(json, process.env.TOKEN_SECRET, { expiresIn: '1w' })
    const token = { token: firmado }
    return token
}

const decodeJWT = (token) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const verifyToken = (req, res, next) => {
    let token = req.headers['Authorization'] || req.headers['authorization']
    if (!token) {
        return res.status(403).send({ mensaje: 'Se necesita un token para la autenticacion' });
    } else {
        if (token.indexOf('Bearer ') != -1)
            token = token.split(' ')[1]
        if (token.indexOf('bearer ') != -1)
            token = token.split(' ')[1]
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = decoded
    } catch (error) {
        console.error(error)
        return res.status(401).send({ mensaje: 'Token no valido', error })
    }
    return next()
}

const buscarGalleta = (req) => {
    if (req.rawHeaders.length > 1) {
        const headers = req.rawHeaders
        let cont = 0
        while ((headers.length > cont) && (headers[cont].indexOf('Cookie') === -1))
            cont++
        if (headers.length > cont) { // Encontro la galleta
            let token = headers[cont + 1].split('session_token=')[1]
            return token
        } else
            return false
    } else
        return false
}

export { generateAccessToken, decodeJWT, verifyToken, buscarGalleta }