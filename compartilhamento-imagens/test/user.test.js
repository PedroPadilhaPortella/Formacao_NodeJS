const app = require('../src/app')
const supertest = require('supertest');
const request = supertest(app);

describe('User', () => {
    const admin = { name: 'admin', email: 'admin@gmail.com', password: 'admin123' }

    beforeAll(async() => {
        return request.post('/users').send(admin)
            .then(() => {})
            .catch((error) => console.error(error))
    });

    afterAll(async() => {
        return request.delete(`/users/${admin.name}`)
            .then(async() => {
                return request.delete('/users/user')
                .then(() => {})
                .catch((error) => fail(error))
            })
            .catch((error) => fail(error))
    });

    describe('Cadastro de Usuário', () => {
        test('deve cadastrar um usuário', async () => {
            const email = `user${Date.now()}@gmail.com`
            const user = { name: 'user', email, password: 'user123' }

            return request.post('/users').send(user)
                .then((response) => {
                    expect(response.statusCode).toBe(200)
                    expect(response.body.email).toBe(email)
                })
                .catch((error) => fail(error))
        });

        test('deve rejeitar o cadastro de um usuário com os dados vazios', async () => {
            const user = { name: '', email: '', password: '' }

            return request.post('/users').send(user)
                .then((response) => {
                    expect(response.statusCode).toBe(400)
                })
                .catch((error) => fail(error))
        });

        test('deve rejeitar o cadastro de um usuário com email que já existe', async () => {
            const email = `user${Date.now()}@gmail.com`
            const user = { name: 'user', email, password: 'user123' }

            return request.post('/users').send(user)
                .then(async(response) => {
                    expect(response.statusCode).toBe(200)
                    expect(response.body.email).toBe(email)

                    return request.post('/users').send(user)
                        .then((res) => {
                            expect(res.statusCode).toBe(400);
                            expect(res.body.error).toBe('Este email já está em uso por outro usuário.');
                        }).catch((error) => fail(error));
                })
                .catch((error) => fail(error))
        });
    });

    describe('Autenticação de Usuário', () => {
        test('deve gerar um token Jwt quando efetuar o login', async() => {
            return request.post('/login').send(admin)
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response.body.token).toBeDefined();
                })
                .catch((error) => fail(error))
        });

        test('deve rejeitar o login de um usuário não cadastrado', async() => {
            return request.post('/login').send({ email: 'fakeemail', password: '12345' })
                .then((response) => {
                    expect(response.statusCode).toBe(403);
                    expect(response.body.errors.email).toBe('Email não cadastrado.');
                })
                .catch((error) => fail(error));
        });

        test('deve rejeitar o login de um usuário com uma senha incorreta', async() => {
            return request.post('/login').send({ email: admin.email, password: '12345' })
                .then((response) => {
                    expect(response.statusCode).toBe(403);
                    expect(response.body.errors.password).toBe('Senha incorreta.');
                })
                .catch((error) => fail(error))
        });
    })
});