import 'dotenv/config'
import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import supertest from 'supertest'
import  app  from '../src/app.js'

const test = suite ('App test')

test('App', async () => {
    const response = await supertest(app)
        .get('/')
        .set('Accept', 'application/json')
    assert.is(response.statusCode, 200)
    assert.is(response.body instanceof Object, true)
    assert.is(response.body.mensaje, 'Servidor funcionando')
})

test.run()