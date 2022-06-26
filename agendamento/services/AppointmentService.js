const mongoose = require('mongoose');
const Appointment = require('../models/appointment');
const nodemailer = require('nodemailer');
const AppointmentFactory = require('../factories/AppointmentFactory');

class AppointmentService {

    async create(name, email, cpf, description, date, time) {
        try {
            const appointment = new Appointment({
                name,
                email,
                cpf,
                description,
                date,
                time,
                finished: false,
                notified: false
            });
            await appointment.save();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async getAll(showFinished) {
        try {
            if (showFinished) {
                return await Appointment.find();
            } else {
                const appts = await Appointment.find({
                    'finished': false
                });
                const appointments = [];

                appts.forEach((appt) => {
                    if (appt.date) {
                        appointments.push(AppointmentFactory.build(appt));
                    }
                });

                return appointments;
            }
        } catch (err) {
            console.error(err);
        }
    }

    async getById(id) {
        try {
            return await Appointment.findOne({
                '_id': id
            });
        } catch (err) {
            console.error(err)
        }
    }

    async search(query) {
        try {
            return await Appointment.find().or([{
                email: query
            }, {
                cpf: query
            }, {
                name: query
            }])
        } catch (err) {
            console.error(err)
            return [];
        }
    }

    async finish(id) {
        try {
            await Appointment.findByIdAndUpdate(id, {
                finished: true
            });
            return true;
        } catch (err) {
            console.error(err)
            return false;
        }
    }

    async sendNotification() {
        const hour = 1000 * 60 * 60
        const transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: '465',
            auth: { user: '450b42026b1193', pass: '9bb2b2d9aa8f71' },
        });
        try {
            let appointments = await this.getAll(false)
            appointments.forEach(async (appointment) => {
                const date = appointment.start.getTime()
                const gap = date - Date.now()

                if (gap <= hour && !appointment.notified) {
                    await Appointment.findByIdAndUpdate(appointment.id, {notified: true});
                    await transporter.sendMail({
                        from: 'Agendamento Consultas <agendamentoconsulta@gmail.com.br>',
                        to: appointment.email,
                        subject: appointment.title,
                        text: `${appointment.name}, sua consulta vai acontecer em uma hora, fique atento.`
                    });
                }
            });
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new AppointmentService();