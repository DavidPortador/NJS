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
        return res.status(403).send({ mensaje: 'Se necesita un token para la autenticación' });
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
    const headers = req.rawHeaders || req.headers || req.header || undefined
    if (headers.length > 1) {
        let cont = 0
        while (headers.length > cont){
            if(headers[cont].includes('session_token=')){
                const token = headers[cont].split('session_token=')[1] || undefined
                if(token)
                    return token
            }
            cont++
        } 
    }
    return false
}

export { generateAccessToken, decodeJWT, verifyToken, buscarGalleta }