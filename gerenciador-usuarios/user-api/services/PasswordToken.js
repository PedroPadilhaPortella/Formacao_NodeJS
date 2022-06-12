const nodemailer = require('nodemailer')
const knex = require('../database/connection')
const User = require('./User')

class PasswordToken {

    async create(email) {
        const user = await User.findByEmail(email);

        if(user != undefined) {
            try {
                const token = Date.now();
                await knex.insert({ token: token, userId: user.id, used: 0}).table('password_tokens');            
                return { status: true, token: token, user: user }
            } catch (error) {
                console.warn(error);
                return { status: false, error: error }
            }
        }
        return { status: false, error: "Email não encontrado" }
    }

    async validate(token) {
        try {
            const result_token = await knex.select('*').where({ token: token }).table('password_tokens'); 
            const passwordToken = result_token[0]
            const result_user = await knex.select('*').where({ id: passwordToken.userId }).table('users'); 
            const user = result_user[0];

            if(passwordToken.length == 0) return { status: false };
            if(passwordToken.used) return { status: false };

            return { status: true, passwordToken, user };
        } catch (error) {
            console.warn(error);
            return { status: false };
        }
    }

    async setUsedToken(token) {
        await knex.update({ used: 1 }).where({ token: token }).table('password_tokens');
    }

    async sendEmail(email, subject, text, html) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'pedro.fullstack.kadjin@gmail.com',
                pass: 'phpp.overflow'
            }
        });

        transporter.sendMail({
            from: 'Pedro Padilha Portella <pedro.fullstack.kadjin@gmail.com>',
            to: email,
            subject: subject,
            text: text,
            html: html
        }).then(message => {
            console.warn(message);
        }).catch(error => {
            console.warn(error);
        });
    }
}

module.exports = new PasswordToken();