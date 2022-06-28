const supertest = require('supertest');
const app = require('../src/app')

describe('App', () => {

    describe('Conectividade com Google usando Supertest', () => {
        const request = supertest('www.google.com');

        test('O servidor Google deve estar online', async () => {
            const response = await request.get('/')
            expect(response.statusCode).toBe(200);
        });
        test('O servidor Google deve estar online', async () => {
            request.get('/').then((response) => {
                expect(response.statusCode).toBe(200);
            });
        });
    })

    describe('Connectividade com a Aplicação', () => {
        const request = supertest(app);

        test('A aplicação deve escutar na porta 3000', async () => {
            const response = await request.get('/')
            expect(response.statusCode).toBe(200);
        });

        test('deve retornar laranja como cor favorita do usuário Pedro', async () => {
            request.get('/cor/pedro').then((response) => {
                expect(response.body).toStrictEqual({"cor": "laranja"});
                expect(response.body.cor).toBe("laranja");
                expect(response.statusCode).toBe(200);
            });

            const response = await request.get('/cor/victor');
            expect(response.body).toStrictEqual({"cor": "azul"});
            expect(response.body.cor).toBe("azul");
        })
    });
});