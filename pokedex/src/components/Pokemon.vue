<template>
<div id="pokemon">
  <div class="card">
  <div class="card-image">
    <figure>
      <img :src="currentImage" :alt="name" @click="changeSprite">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{{index}}) {{ upper(name) }}</p>
        <p class="subtitle is-6">{{ pokemon.type }}</p>
      </div>
    </div>

    <div class="content">
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from "axios";

export default {
    props: {
        index: Number,
        name: String, 
        url: String
    },
    data() {
        return {
            pokemon: { type: '', front: '', back: '' },
            isFront: true,
            currentImage: ''
        }
    },
    created: function() {
        axios.get(this.url).then(response => {
            this.pokemon.type = response.data.types[0].type.name
            this.pokemon.front = response.data.sprites.front_default
            this.pokemon.back = response.data.sprites.back_default
            this.currentImage = this.pokemon.front;
        })
    },
    methods: {
        upper: function(value) {
            return value[0].toUpperCase() + value.slice(1);
        },
        changeSprite: function() {
            if(this.isFront) {
                this.currentImage = this.pokemon.back
                this.isFront = false
            } else {
                this.currentImage = this.pokemon.front
                this.isFront = true
            }
        }
    }
}
</script>

<style>
#pokemon {
    margin-top: 2%;
}
</style>