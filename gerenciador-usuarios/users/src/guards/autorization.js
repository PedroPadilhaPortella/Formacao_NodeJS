import axios from 'axios';

export default function (to, from, next) {
    if (localStorage.getItem('token') != undefined) {

        const token = localStorage.getItem('token');
        const request = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.post('http://localhost:8686/validate', {}, request)
            .then((response) => next())
            .catch((error) => next('/login'))
    } else {
        next('/login')
    }
}