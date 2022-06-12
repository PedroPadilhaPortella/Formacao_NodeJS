<template>
<div>
    <h1 class="title">Painel Administrativo</h1>
    <div class="columns is-centered">
        <div class="is-half">
            <table class="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role | processRole }}</td>
                        <td>
                            <router-link :to='{name: "UserEdit", params: {id: user.id}}'>
                                <button class="button is-warning">Editar</button>
                            </router-link>
                            <button class="button is-danger" @click="openModal(user.id)">Deletar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div :class="{ 'modal': true, 'is-active': showModal }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Você deseja deletar este usuários?</p>
                <button class="delete" aria-label="close" @click="closeModal()"></button>
            </header>
            <section class="modal-card-body">
                <p>A deleção deste usuário não pode ser desfeita.</p>
            </section>
            <footer class="modal-card-foot is-centered">
                <button class="button is-info" @click="closeModal()">Cancelar</button>
                <button class="button is-danger" @click="deleteUser()">Sim, quero deletar</button>
            </footer>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            users: [],
            showModal: false,
            deleteId: null
        };
    },
    created() {
        const request  = this.getToken();
        axios.get("http://localhost:8686/users", request)
            .then((response) => {
                this.users = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        getToken() {
            const token = localStorage.getItem("token");
            return { headers: { Authorization: `Bearer ${token}` } };
        },
        openModal(id) {
            this.deleteId = id
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
        },
        deleteUser() {
            const request = this.getToken()
            axios.delete(`http://localhost:8686/users/${this.deleteId}`, request)
                .then(() => {
                    this.users = this.users.filter(user => user.id !== this.deleteId)
                    this.closeModal()
                })
                .catch(() => {
                    this.closeModal()
                })
        }
    },
    filters: {
        processRole: (value) => {
            switch(value) {
                case 0: return "Cliente";
                case 1: return "Administrador";
                case 2: return "Funcionário";
                default: return "Outros";
            }
        }
    }
};
</script>

<style scoped>
h1.title {
    margin: 30px auto;
}

button.is-danger {
    margin-left: 5px;
}
</style>