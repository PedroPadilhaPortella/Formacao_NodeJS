const app = require('../src/app')
const supertest = require('supertest');
const request = supertest(app);

describe('Server', () => {
    test('A aplicação deve responder na porta 3030', () => {
        return request.get('/').then(response => {
            expect(response.statusCode).toBe(200);
        }).catch((error) => fail(error))
    });    
})