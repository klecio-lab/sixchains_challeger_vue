<template>
    <div>
        <h2>Saindo...</h2>
    </div>
</template>

<script>
import axios from '../axios';

export default {
    methods: {
        async logout() {
            try {
                const token = localStorage.getItem('token');
                await axios.post('auth/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error('Erro ao fazer logout:', error);
            } finally {
                localStorage.removeItem('token');
                this.$router.push('/login');
            }
        }
    },
    mounted() {
        this.logout();
    }
};
</script>
