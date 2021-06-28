function enviarEmail(para, corpo, erro, callback) {
    console.log('EMAIL: sending email...');
    setTimeout(() => {
        if(erro) {
            callback('ERRO: the email failed.');
        } else {
            console.log(`
                Para: ${para}
                ---------------------------------------
                ${corpo}
                ---------------------------------------
            `);
            callback('EMAIL: your email has been sended, it will reach you in a few minutes...');
        }
    }, 5000);
}


enviarEmail('pedro.kadjin.sg@gmail.com', 'email de teste...', false, (message) => {
    if(message) {
        console.log(message);
    }
});
