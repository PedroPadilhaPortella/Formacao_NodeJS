# API de Games
API de Cadastro de Jogos de uma Locadora de Jogos.
<br>Conta também com um sistema de registro e login de usuários, autenticação e autorização de usuários.

## Pacotes NPM Usados
* express
* body-parser
* sequelize
* mysql2
* cors
* axios
* jsonwebtoken

## [Endpoints da API](http://localhost:3000 "http://localhost:3000")

### POST /auth
Autentica usuários com base na senha e email, gerando um token.
#### Parametros
```
{
    "email": "admin@admin123",
    "password": "admin1234"
}
```
#### Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBhZG1pbjEyMyIsImlhdCI6MTYyODEzNTU5NywiZXhwIjoxNjI4MTU3MTk3fQ.66AXWPbx2WpfX1wmj2BfsQC16IrUd_mWL1hctJXY9FM"
}
```

### GET /games
Retorna todos os jogos cadastrados
#### Headers -> Bearer Token Authorization
#### Response
200 OK
```
[
    {
        "id": 1,
        "name": "Call of Duty Mobile",
        "year": 2010,
        "price": 23.12,
        "createdAt": "2021-07-24T23:41:46.000Z",
        "updatedAt": "2021-07-24T23:41:46.000Z"
    },
    {
        "id": 2,
        "name": "Call of Duty Modern Warfare",
        "year": 2009,
        "price": 96,
        "createdAt": "2021-07-24T23:52:05.000Z",
        "updatedAt": "2021-07-30T16:35:50.000Z"
    },
    {
        "id": 3,
        "name": "Resident Evil 4",
        "year": 2006,
        "price": 50,
        "createdAt": "2021-07-24T23:52:47.000Z",
        "updatedAt": "2021-07-24T23:52:47.000Z"
    },
    {
        "id": 4,
        "name": "Minecraft 1.16",
        "year": 2019,
        "price": 12,
        "createdAt": "2021-07-24T23:52:55.000Z",
        "updatedAt": "2021-07-24T23:52:55.000Z"
    },
]
```
401 Não Autenticado / Token Inválido
```
{
    "message": "Token não enviado"
}
```

### GET /games/:id
Retorna um jogos cadastrados pelo id
#### Headers -> Bearer Token Authorization
#### Response
200 OK
```
{
    "id": 1,
    "name": "Call of Duty Mobile",
    "year": 2010,
    "price": 23.12,
    "createdAt": "2021-07-24T23:41:46.000Z",
    "updatedAt": "2021-07-24T23:41:46.000Z"
}
```
401 Não Autenticado / Token Inválido
```
{
    "message": "Token não enviado"
}
```

### POST /games
cadastra um novo jogo na API
#### Headers -> Bearer Token Authorization
#### Parametros
```
{
    "name": "Call of Duty Modern Warfare",
    "year": 2009,
    "price": 96
}
```
#### Response
201 Created
```
{
    "id": 11,
    "name": "Call of Duty Modern Warfare",
    "year": 2009,
    "price": 96,
    "updatedAt": "2021-08-05T03:42:16.731Z",
    "createdAt": "2021-08-05T03:42:16.731Z"
}
```
401 Não Autenticado / Token Inválido
```
{
    "message": "Token não enviado"
}
```
500 Campos Inválidos / Nulos ou Não Passados
```
{
    "message": "notNull Violation: games.price cannot be null"
}
```



### PUT /games/:id
atualiza um jogo da API
#### Headers -> Bearer Token Authorization
#### Parametros
```
{
    "name": "Call of Duty Modern Warfare",
    "year": 2009,
    "price": 96
}
```
#### Response
200 OK
```
{
    "id": 11,
    "name": "Call of Duty Modern Warfare",
    "year": 2009,
    "price": 96,
    "updatedAt": "2021-08-05T03:42:16.731Z",
    "createdAt": "2021-08-05T03:42:16.731Z"
}
```
401 Não Autenticado / Token Inválido
```
{
    "message": "Token não enviado"
}
```
500 Campos Inválidos / Nulos ou Não Passados
```
{
    "message": "notNull Violation: games.price cannot be null"
}
```

### DELETE /games/:id
Remove um jogo da API
#### Headers -> Bearer Token Authorization
#### Response
200 OK

401 Não Autenticado / Token Inválido
```
{
    "message": "Token não enviado"
}
```



### GET /users
Retorna todos os usuarios registrados
#### Headers -> Bearer Token Authorization
#### Response
200 OK
```
[
    {
        "id": 1,
        "name": "pedro padilha portella",
        "email": "pedro.dev@gmail.com",
        "password": "pedro.node@123",
        "createdAt": "2021-07-25T01:24:42.000Z",
        "updatedAt": "2021-07-25T01:24:42.000Z"
    }
]
```
401 Não Autenticado / Token Inválido
```
{
    "message": "Token não enviado"
}
```

### GET /users/:id
Retorna um usuário registrado pelo id
#### Headers -> Bearer Token Authorization
#### Response
200 OK
```
{
    "id": 1,
    "name": "pedro padilha portella",
    "email": "pedro.dev@gmail.com",
    "password": "pedro.node@123",
    "createdAt": "2021-07-25T01:24:42.000Z",
    "updatedAt": "2021-07-25T01:24:42.000Z"
}
```
401 Não Autenticado / Token Inválido
```
{
    "message": "Token não enviado"
}
```

### POST /users
Registra um usuário na API
#### Headers -> Bearer Token Authorization
#### Parametros
```
{
    "name": "admin",
    "email": "admin@admin",
    "password": "admin123"
}
```
#### Response
201 Created
```
{
    "id": 3,
    "name": "admin",
    "email": "admin@admin",
    "password": "admin123",
    "updatedAt": "2021-08-05T03:50:01.488Z",
    "createdAt": "2021-08-05T03:50:01.488Z"
}
```
401 Não Autenticado / Token Inválido
```
{
    "message": "Token não enviado"
}
```
500 Campos Inválidos / Nulos ou Não Passados
```
{
    "message": "notNull Violation: users.name cannot be null"
}
```

### PUT /users/:id
atualiza um registro de usuário da API
#### Headers -> Bearer Token Authorization
#### Parametros
```
{
    "name": "admin",
    "email": "admin@admin",
    "password": "admin123",
}
```
#### Response
200 OK

401 Não Autenticado / Token Inválido
```
{
    "message": "Token não enviado"
}
```
500 Campos Inválidos / Nulos ou Não Passados
```
{
    "message": "notNull Violation: users.name cannot be null"
}
```

### DELETE /users/:id
Remove um registro de usuário da API
#### Headers -> Bearer Token Authorization
#### Response
200 OK

401 Não Autenticado / Token Inválido
```
{
    "message": "Token não enviado"
}
```