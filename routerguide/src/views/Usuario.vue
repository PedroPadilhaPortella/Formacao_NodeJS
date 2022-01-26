<template>
    <div>
        <h2>Bem Vindo</h2>
        <h1>{{nome}}</h1>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'Usuario',
    data() {
        return {
            nome: ''
        }
    },
    created() {
        console.log(this.$route.params.nome);
        this.nome = this.$route.params.nome
    }
 }
</script>

<style>

</style>