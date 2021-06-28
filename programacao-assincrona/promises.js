function sendEmail(para, corpo, erro) {
    console.log('EMAIL: sending email...');
    const time = 5000;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(erro) {
                reject('ERRO: the email failed.')
            } else {
                console.log(`
                    Para: ${para}
                    ---------------------------------------
                    ${corpo}
                    ---------------------------------------
                `);
                resolve('EMAIL: your email has been sended, it will reach you in a few minutes...')
            }
        }, time);
    });
}

sendEmail('pedro.kadjin.sg@gmail.com', 'email de teste...', false)
    .then(console.log)
    .catch(console.log)