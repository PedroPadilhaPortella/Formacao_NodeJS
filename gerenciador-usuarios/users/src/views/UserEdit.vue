<template>
    <div>
        <h1>Edição de Usuário</h1>
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
                <p>Cargo</p>
                <div class="select">
                <select name="role" v-model="role">
                    <option value="1">Administrador</option>
                    <option value="2">Funcionário</option>
                    <option value="0">Cliente</option>
                </select>
                </div>
                <hr />
                <button class="button is-success" @click="update()">Salvar Alterações</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            id: 0,
            name: "",
            email: "",
            role: "",
            erro: undefined,
        };
    },
    created() {
        const request = this.getToken()
        this.id = this.$route.params.id;
        axios.get(`http://localhost:8686/users/${this.id}`, request)
                .then((response) => {
                    this.name = response.data.name;
                    this.email = response.data.email;
                    this.role = response.data.role;
                })
                .catch(() => {
                    this.$router.push({name: 'Users'})
                });
    },
    methods: {
        update() {
            const request = this.getToken()
            const user = { name: this.name, email: this.email, role: this.role };
            axios.put(`http://localhost:8686/users/${this.id}`, user, request)
                .then(() => {
                    this.$router.push({name: "Users"});
                })
                .catch((error) => {
                    this.erro = error.response.data;
                });
        },
        getToken() {
            const token = localStorage.getItem("token");
            return { headers: { Authorization: `Bearer ${token}` } };
        },
    },
};
</script>

<style>
</style>