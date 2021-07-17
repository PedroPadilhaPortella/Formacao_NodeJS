const url = 'http://localhost:3000/games';

const lista = document.getElementById('games')

function alertChanges(message, reload = false) {
    alert(message)
    if(reload)
        location.reload()
}

async function getGames() {
    await axios.get(url).then(response => {
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
}

async function createGame() {
    const idInput = document.getElementById('id').value
    const nameInput = document.getElementById('name').value
    const yearInput = document.getElementById('year').value
    const priceInput = document.getElementById('price').value

    const game = {
        id: idInput,
        name: nameInput,
        year: yearInput,
        price: priceInput
    }

    await axios.post(url, game)
        .then(response => {
            if(response.status == 201)
                alertChanges('Jogo Cadastrado', true)
        }).catch((error) => alert(error))
}

async function deleteGame(listItem){
    var id = listItem.getAttribute("data-id");

    await axios.delete(`${url}/${id}`).then(response => {
        alertChanges("Jogo Removido", true)
    }).catch(err => {
        console.log(err);
    });
}

function loadForm(listItem){
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

    var idInput = document.getElementById("idEdit")
    var nameInput = document.getElementById("nameEdit");
    var yearInput = document.getElementById("yearEdit");
    var priceInput = document.getElementById("priceEdit");

    var game = {
        id: idInput,
        name: nameInput.value,
        year: yearInput.value,
        price: priceInput.value
    }

    var id = idInput.value;

    axios.put(`${url}/${id}`, game).then(response => {
        if(response.status == 200){
            alertChanges("Jogo Atualizado", true)
        }
    }).catch(err => {
        console.log(err);
    });

}

getGames()
