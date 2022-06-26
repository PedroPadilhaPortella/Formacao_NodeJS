class AppointmentFactory {

    build(simpleAppointment) {

        const startDate = this.formatDate(simpleAppointment.date, simpleAppointment.time);

        const appointment = {
            id: simpleAppointment.id,
            title: `${simpleAppointment.name}-${simpleAppointment.description}`,
            name: simpleAppointment.name,
            email: simpleAppointment.email,
            start: startDate,
            end: startDate,
            notified: simpleAppointment.notified,
        }

        return appointment;
    }

    formatDate(date, time) {
        const day = date.getDate() + 1;
        const month = date.getMonth();
        const year = date.getFullYear();
        const hour = Number.parseInt(time.split(':')[0]);
        const minutes = Number.parseInt(time.split(':')[1]);

        return new Date(year, month, day, hour, minutes);
    }
}

module.exports = new AppointmentFactory();