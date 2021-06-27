function enviarEmail(para, corpo, erro, callback) {
    setTimeout(() => {
        console.log(`
        Para: ${para}
        ---------------------------------------
        ${corpo}
        ---------------------------------------
        `);

        if(erro) {
            callback('ERRO: the email failed.');
        } else {
            callback('EMAIL: your email has been sended, it will reach you in a few minutes...');
        }
    }, 5000);
}

console.log('EMAIL: sending email...');

enviarEmail('pedro.kadjin.sg@gmail.com', 'email de teste...', true, (message) => {
    if(message) {
        console.log(message);
    }
});
