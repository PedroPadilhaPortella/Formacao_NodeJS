const url = 'http://localhost:3000/games';
var headers = {}

function addTokenToHeaders() {
    headers = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
}

function saveToken(token) {
    localStorage.setItem('token', token)
}

function getToken() {
    return localStorage.getItem('token')
}

function removeToken() {
    localStorage.removeItem('token')
}

function alertChanges(message, reload = false) {
    alert(message)
    if(reload)  reloadPage()
}

function reloadPage() {
    location.reload()
}

async function login() {
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    if(email != '' && password != '') {
        await axios.post(`http://localhost:3000/auth`, { email, password })
            .then(response => {
                saveToken(response.data.token)
                addTokenToHeaders()
                reloadPage()
            })
            .catch(error => alert('Erro ao fazer Login, revise seus dados'))
    } else {
        alertChanges('Preencha os campos corretamente para fazer o Login')
    }
    
}

async function getGames() {
    const lista = document.getElementById('games')

    if(getToken()) {
        await axios.get(url, headers).then(response => {
            games = response.data
            games.forEach(game => {
                var item = document.createElement('li')

                item.setAttribute('data-id', game.id)
                item.setAttribute('data-name', game.name)
                item.setAttribute('data-year', game.year)
                item.setAttribute('data-price', game.price)

                item.textContent = `${game.id}) ${game.name} - R$ ${game.price}`

                var deleteBtn = document.createElement("button");
                deleteBtn.innerHTML = "Deletar";
                deleteBtn.addEventListener("click", () => deleteGame(item))

                var editBtn = document.createElement("button");
                editBtn.innerHTML = "Editar";
                editBtn.addEventListener("click", () => loadForm(item))

                item.appendChild(deleteBtn);
                item.appendChild(editBtn);

                lista.appendChild(item)
            });
        }).catch((error) => alert(error))
    } else {
        alertChanges('Faça Login para acessar os dados!')
    }
}

async function createGame() {
    const id = document.getElementById('id').value
    const name = document.getElementById('name').value
    const year = document.getElementById('year').value
    const price = document.getElementById('price').value

    if(id && name && year && price) {
        const game = { id, name, year, price }

        await axios.post(url, game, headers)
        .then(response => {
            if(response.status == 201) alertChanges('Jogo Cadastrado', true)
        }).catch(() => alert('Erro ao Salvar Jogo, tente novamente.'))
    } else {
        alertChanges('Preencha os campos para poder Criar Jogo')
    }
}

async function deleteGame(listItem){
    var id = listItem.getAttribute("data-id");

    await axios.delete(`${url}/${id}`, headers).then(response => {
        alertChanges("Jogo Removido", true)
    }).catch(err => {
        console.log(err);
    });
}

function loadForm(listItem){
    toggleEditGameDiv()
    var id = listItem.getAttribute("data-id");
    var name = listItem.getAttribute("data-name");
    var year = listItem.getAttribute("data-year");
    var price = listItem.getAttribute("data-price");

    document.getElementById("idEdit").value = id;
    document.getElementById("nameEdit").value = name;
    document.getElementById("yearEdit").value = year;
    document.getElementById("priceEdit").value = price;
}

function updateGame(){
    var id = document.getElementById("idEdit").value;
    var name = document.getElementById("nameEdit").value;
    var year = document.getElementById("yearEdit").value;
    var price = document.getElementById("priceEdit").value;
    
    var game = { id, name, year, price }

    if(id != '' && name != '' && year != '' && price != '') {
        axios.put(`${url}/${id}`, game, headers).then(response => {
            if(response.status == 200){
                alertChanges("Jogo Atualizado", true)
                reloadPage()
            }
        }).catch(() => alert('Erro ao Salvar Jogo, tente novamente.'))
    } else {
        alertChanges('Preencha os campos para poder Editar Jogo')
    }
    
}


addTokenToHeaders()
getGames()


/* Style Functions */
function hide(what) {
    const div = document.getElementById(what)
    div.style.display = 'none'
}

function toggleNewGameDiv() {
    hide('editarGameDiv')
    const div = document.getElementById('novoGameDiv')
    if(div.style.display == 'none') {
        div.style.display = 'block'
    } else {
        div.style.display = 'none'
    }
}

function toggleEditGameDiv() {
    hide('novoGameDiv')
    const div = document.getElementById('editarGameDiv')
    if(div.style.display == 'none') {
        div.style.display = 'block'
    } else {
        div.style.display = 'none'
    }
}