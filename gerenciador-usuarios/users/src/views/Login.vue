<template>
    <div>
        <h2>Login de Usuário</h2>
        <hr />
        <div class="columns is-centered">
            <div class="column is-half">
                <div v-if="erro != undefined" class="notification is-danger">{{ erro }}</div>

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
                <button class="button is-success" @click="login()">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            email: "",
            password: "",
            erro: undefined,
        };
    },
    methods: {
        login() {
            const user = { email: this.email, password: this.password }
            axios.post("http://localhost:8686/login", user)
                .then((response) => {
                    localStorage.setItem('token', response.data.token)
                    this.$router.push({name: "Home"})
                })
                .catch((error) => {
                    this.erro = error.response.data
                });
        },
    },
};
</script>

<style>
</style>