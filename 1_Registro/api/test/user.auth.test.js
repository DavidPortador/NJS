import 'dotenv/config'
import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import supertest from 'supertest'
import app from '../src/app.js'
import mongoose from 'mongoose'

const test = suite ('User, Auth test')
let token = undefined

test.before(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
});

test.after(async () => {
    token = undefined
    await mongoose.disconnect()
});

test('Usuario registrado', async () => {
    const body = {
        "nombre": "Tester uvu",
        "correo": "tester_uvu@email.com",
        "contrasena": "t3$t",
        "rol": "tester"
    }
    const response = await supertest(app)
        .post('/usuario/registro')
        .set('Accept', 'application/json')
        .send(body)
    assert.is(response.statusCode, 200)
    assert.is(response.body instanceof Object, true)
    assert.is(response.body.mensaje, 'Usuario registrado')
})

test('Inicio de sesión exitoso', async () => {
    const body = {
        "correo": "tester_uvu@email.com",
        "contrasena": "t3$t"
    }
    const response = await supertest(app)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send(body)
    assert.is(response.statusCode, 200)
    assert.is(response.body instanceof Object, true)
    assert.is(response.body.mensaje, 'Inicio de sesión exitoso')
    token = response.body.token
})

test('Perfil de usuario', async () => {
    const response = await supertest(app)
        .get('/usuario/perfil')
        .set('Accept', 'application/json')
        .set('Authorization', token)
    assert.is(response.statusCode, 200)
    assert.is(response.body instanceof Object, true)
    assert.is(response.body.mensaje, 'Perfil de usuario')
})

test('Usuario actualizado', async () => {
    const body = {
        "contrasena_actual": "t3$t",
        "nombre": "Tester uvu Actualizado",
        "contrasena_nueva": "n3wt3$t"
    }
    const response = await supertest(app)
        .patch('/usuario/actualizar')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(body)
    assert.is(response.statusCode, 200)
    assert.is(response.body instanceof Object, true)
    assert.is(response.body.mensaje, 'Usuario actualizado')
})

test('Lista de usuarios registrados', async () => {
    const response = await supertest(app)
        .get('/usuario/lista')
        .set('Accept', 'application/json')
        .set('Authorization', token)
    assert.is(response.statusCode, 200)
    assert.is(response.body.mensaje, 'Lista de usuarios registrados')
})

test('Usuario eliminado', async () => {
    const body = {
        "contrasena": "n3wt3$t"
    }
    const response = await supertest(app)
        .delete('/usuario/eliminar')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(body)
    assert.is(response.statusCode, 200)
    assert.is(response.body instanceof Object, true)
    assert.is(response.body.mensaje, 'Usuario eliminado')
})

test.run()