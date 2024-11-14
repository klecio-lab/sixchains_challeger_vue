<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email</label>
                <input type="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Senha</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Entrar</button>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script>
import axios from '../axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('auth/login', {
                    email: this.email,
                    password: this.password
                });

                // Armazenando o token no localStorage
                localStorage.setItem('token', response.data.token);

                // Redirecionando para a página inicial após o login
                this.$router.push('/');
            } catch (error) {
                // Mostrando erro, caso o login falhe
                this.error = 'Email ou senha incorretos!';
            }
        }
    }
};
</script>

<style scoped>
.error {
    color: red;
}
</style>