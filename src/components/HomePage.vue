<template>
    <div>
        <h2>Bem-vindo à sua página inicial!</h2>
        <p>Você está autenticado.</p>
        <router-link to="/logout">Sair</router-link>
    </div>
</template>

<script>
export default {
    name: 'HomePage'
};
</script>