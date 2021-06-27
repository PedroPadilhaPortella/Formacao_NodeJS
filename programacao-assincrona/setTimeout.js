function enviarEmail(para, corpo) {
    setTimeout(() => {
        console.log(`
        Para: ${para}\n
        ---------------------------------------
        ${corpo}
        ---------------------------------------
        `);
    }, 5000);
}

console.log('EMAIL: sending email...');

enviarEmail('pedro.kadjin.sg@gmail.com', 'email de teste...');

console.log('EMAIL: your email has been sended, it will reach you in a few minutes...');
console.log('EMAIL: Email Recebido.');