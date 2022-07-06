const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // secure:true for port 465, secure:false for port 587
  secure: true, //SSL Criptography
  auth: {
      user: '<seu email>',
      pass: '< sua senha >'
  }
});

transporter.sendMail({
    from: '< seu email >',
    to: '< email de destino >',
    subject: 'Email de Teste Nodemailer',
    text: '',
    html: ``
}).then(message => {
    console.warn(message);
}).catch(err => {
    console.warn(err);
});