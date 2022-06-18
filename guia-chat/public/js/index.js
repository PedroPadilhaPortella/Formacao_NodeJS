const messageEl = document.getElementById('message');
    const usernameEl = document.getElementById('username');
    const chatEl = document.getElementById('chat');

    const socket = io('http://localhost:3000');

    function enviarMensagem() {
        var message = messageEl.value;
        var username = usernameEl.value;
        socket.emit('sendMessage', { message, username });
    }

    socket.on('disconnect', () => {
        console.log('disconnecting')
    });

    socket.on('showMessage', (data) => {
        console.log(data)
        const p = document.createElement('p');
        p.innerHTML = `${data.username}: ${data.message}`;
        if(data.username === usernameEl.value) {
            p.classList.add('user');
        }
        chatEl.append(p);
    });