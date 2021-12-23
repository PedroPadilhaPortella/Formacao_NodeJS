<template>
    <div id="app">
        <div class="column is-half is-offset-one-quarter">
            <h2 class="is-size-2">Pokedex</h2>
            <input
                type="text"
                class="input is-rounded"
                placeholder="Busque um pokemon por nome"
                v-model="busca"
            />
            <button class="button is-offset-one-quarter is-success botaoBusca" @click="buscar">
                Buscar
            </button>
            <div v-for="(pokemon, index) in filteredPokemons" :key="pokemon.url">
                <Pokemon
                    :index="index + 1"
                    :name="pokemon.name"
                    :url="pokemon.url"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Pokemon from "./components/Pokemon.vue";

import axios from "axios";
export default {
    name: "App",
    components: {
        Pokemon,
    },
    data() {
        return {
            pokemons: [],
            filteredPokemons: [],
            busca: "",
        };
    },
    created: function () {
        axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
            .then((response) => {
                this.pokemons = response.data.results;
                this.filteredPokemons = response.data.results;
            });
    },
    methods: {
        buscar: function () {
            this.filteredPokemons = this.pokemons;
            if (this.busca == "" || this.busca == " ") {
                this.filteredPokemons = this.pokemons;
            } else {
                this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name == this.busca);
            }
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.botaoBusca {
    margin-top: 2%;
}
</style>
