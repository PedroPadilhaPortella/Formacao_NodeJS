<template>
    <div>
        <h2>Registro de Usuário</h2>
        <hr />
        <div class="columns is-centered">
            <div class="column is-half">
                <div v-if="erro != undefined" class="notification is-danger">{{ erro }}</div>
                
                <p>Nome</p>
                <input
                    type="text"
                    placeholder="Nome"
                    class="input"
                    v-model="name"
                />
                <p>Email</p>
                <input
                    type="email"
                    placeholder="Email"
                    class="input"
                    v-model="email"
                />
                <p>Senha</p>
                <input
                    type="password"
                    placeholder="Senha"
                    class="input"
                    v-model="password"
                />
                <hr />
                <button class="button is-success" @click="register()">Cadastrar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            erro: undefined,
        };
    },
    methods: {
        register() {
            const user = { name: this.name, email: this.email, password: this.password };
            axios.post("http://localhost:8686/users", user)
                .then(() => {
                    this.$router.push({name: "Home"});
                })
                .catch((error) => {
                    this.erro = error.response.data;
                });
        },
    },
};
</script>

<style>
</style>