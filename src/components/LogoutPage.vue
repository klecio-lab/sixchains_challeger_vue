<template>
    <div>
        <h2>Saindo...</h2>
    </div>
</template>

<script>
export default {
    mounted() {
        // Limpando o token do localStorage
        localStorage.removeItem('token');

        // Redirecionando para a página de login
        this.$router.push('/login');
    }
};
</script>