const express = require('express')
const mercadoPago = require('mercadopago')

const app = express()

mercadoPago.configure({
    sandbox: true,
    // publicKey: 'TEST-f2170141-a08b-459b-a6fc-0fb5bede6f2b',
    access_token: 'TEST-3993415663078835-070220-e99d214d1e516314e8799f972afb77a4-278084779',
});

app.get('/', (req, res) => {
    res.send('mercado pago')
})

// Dados que precisam ser salvos => id, email e status
app.get('/pay', async (req, res) => {
    const id = `${Date.now()}`; // pode ser uuid, timestamp
    email = 'payer@gmail.com'; // email do cliente

    const dados = {
        items: [
            item = {
                id: id,
                title: 'Camisas Slim',
                quantity: 2,
                currency_id: 'BRL',
                unit_price: parseFloat(19.99),
            },
        ],
        payer: {
            email: email,
        },
        externalReference: id,
    };
    try {
        const pagamento = await mercadoPago.preferences.create(dados);
        console.log(pagamento);
        // Salvar pagamento { id, email }
        return res.redirect(pagamento.body.init_point);
    } catch(error) {
        return res.json(error);
    }
});

app.post('/notify', (req, res) => {
    const id = req.query.id;

    setTimeout(() => {
        const filtro = { 'order.id': id }
        
        mercadoPago.payment.search({ qs: filtro })
            .then((data) => {
                const pagamento = data.body.results[0];
                if(pagamento != undefined) {
                    console.log(pagamento)
                } else {
                    console.log('Pagamento não encontrado')
                }
            }).catch((error) => {
                console.log(error)
            })
    }, 20000);

    res.send('ok')
});

const port = 3000;
app.listen(port, () => `Server running at http://localhost:${port}`)