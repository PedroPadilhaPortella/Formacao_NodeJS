// Configuração do Calendar
const calendarEl = document.getElementById('calendar');

// const 

const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    events: 'calendar',
    eventClick: function(info) {
        window.location.href = `/event/${info.event.id}`
    }
});

calendar.render();