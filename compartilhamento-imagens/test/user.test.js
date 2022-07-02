const app = require('../src/app')
const supertest = require('supertest');
const request = supertest(app);

describe('User', () => {

    describe('Cadastro de Usuário', () => {
        test('deve cadastrar um usuário', async () => {
            const email = `user${Date.now()}@gmail.com`
            const user = { name: 'user', email, senha: 'user123' }

            return request.post('/users').send(user)
                .then((response) => {
                    expect(response.statusCode).toBe(200)
                    expect(response.body.email).toBe(email)
                }).catch((error) => fail(error));
        });

        test('deve rejeitar o cadastro de um usuário com os dados vazios', async () => {
            const user = { name: '', email: '', senha: '' }

            return request.post('/users').send(user)
                .then((response) => {
                    expect(response.statusCode).toBe(400)
                }).catch((error) => fail(error));
        });

        test('deve rejeitar o cadastro de um usuário com email que já existe', async () => {
            const email = `user${Date.now()}@gmail.com`
            const user = { name: 'user', email, senha: 'user123' }

            return request.post('/users').send(user)
                .then((response) => {
                    expect(response.statusCode).toBe(200)
                    expect(response.body.email).toBe(email)

                    return request.post('/users').send(user)
                        .then((response) => {
                            expect(response.statusCode).toBe(400);
                            expect(response.body.error).toBe('Este email já está em uso por outro usuário.');
                        }).catch((error) => fail(error));
                }).catch((error) => fail(error));
        });
    });
});