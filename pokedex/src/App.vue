<template>
    <div id="app">
    <div class="column is-half is-offset-one-quarter">
        <div v-for="(pokemon, index) in pokemons" :key="index">
            <Pokemon :index="index" :name="pokemon.name" :url="pokemon.url"/>
        </div>
    </div>
    </div>
</template>

<script>
import Pokemon from './components/Pokemon.vue';

import axios from "axios";
export default {
    name: "App",
    components: {
        Pokemon
    },
    data() {
        return {
            pokemons: [],
        };
    },
    created: function () {
        axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
            .then((response) => {
                this.pokemons = response.data.results;
            });
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
</style>
