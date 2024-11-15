<template>
    <div class="home">
        <section class="vh-100 bg-light">
            <nav class="navbar navbar-expand-lg navbar-dark bg-custom">
                <div class="container-fluid">
                    <!-- Botão de Menu Responsivo -->
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <!-- Links da Navbar -->
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <router-link to="/logout" class="nav-link">Sair</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container h-custom py-5">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-8 text-center">
                        <h2 class="mb-3">Bem-vindo à sua página inicial!</h2>
                        <h6 class="mb-4">Logo abaixo sua listagem de tarefas:</h6>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-10">
                        <table class="table table-striped table-hover shadow-sm rounded">
                            <thead class="table-dark">
                                <tr>
                                    <th scope="col" style="width: 5%;"></th>
                                    <th scope="col">Título</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="flexCheckDefault1" />
                                        </div>
                                    </th>
                                    <td>Sit</td>
                                    <td>Amet</td>
                                    <td><span class="badge bg-success">Concluído</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="flexCheckDefault2" />
                                        </div>
                                    </th>
                                    <td>Adipisicing</td>
                                    <td>Elit</td>
                                    <td><span class="badge bg-warning">Pendente</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="flexCheckDefault3" />
                                        </div>
                                    </th>
                                    <td>Hic</td>
                                    <td>Fugiat</td>
                                    <td><span class="badge bg-danger">Atrasado</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="footer bg-dark text-center text-white py-3 mt-5">
                Copyright © 2024. All rights reserved.
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'HomePage'
};
</script>

<style scoped>
/* Ajustes gerais */
.bg-light {
    background: linear-gradient(to right, #f4f4f4, #ffffff);
}

.container {
    max-width: 900px;
}

/* Título */
h2 {
    font-weight: 600;
    color: #311772;
}

/* Estilo do botão de logout */
.btn-outline-primary {
    border-radius: 20px;
    font-weight: 500;
    padding: 0.5rem 1.5rem;
}

/* Estilo da Tabela */
.table {
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
}

.table thead.table-dark {
    background-color: #311772;
    color: #fff;
}

.table-hover tbody tr:hover {
    background-color: rgba(49, 23, 114, 0.05);
}

/* Estilo para os badges */
.badge {
    font-size: 0.85rem;
    padding: 0.5em 0.75em;
    border-radius: 10px;
}

.bg-success {
    background-color: #28a745 !important;
}

.bg-warning {
    background-color: #ffc107 !important;
}

.bg-danger {
    background-color: #dc3545 !important;
}

/* Estilo dos checkboxes */
.form-check-input {
    width: 1.25em;
    height: 1.25em;
    border-radius: 5px;
}

.form-check-input:checked {
    background-color: #F2570A;
    border-color: #F2570A;
}

/* Responsividade */
@media (max-width: 768px) {
    .table {
        font-size: 0.9rem;
    }

    .container {
        padding: 1rem;
    }
}

/* Footer */
.footer {
    background-color: #311772 !important;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #311772;
    /* Exemplo de cor */
    color: white;
    padding: 10px 0;
}

/* navbar */
/* Cor de fundo personalizada para a navbar */
.bg-custom {
    background-image: url('https://blog.sixchains.com.br/content/images/2023/04/Wallpaper-roxo---Sixchains.png');
    background-size: cover;      /* Redimensiona a imagem para cobrir todo o contêiner */
    background-position: center; /* Centraliza a imagem no contêiner */
    background-repeat: no-repeat; /* Evita que a imagem se repita */
    height: 50vh;               /* Altura total da viewport */
}

/* Cor para os links da navbar */
.navbar-dark .navbar-nav .nav-link {
    color: #ffffff !important;
    font-weight: 500;
}

/* Hover para os links */
.navbar-dark .navbar-nav .nav-link:hover {
    color: #f4f4f4 !important;
    text-decoration: underline;
}

/* Estilo para o botão de menu em dispositivos móveis */
.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.75)' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
}

/* Ajustes de espaçamento */
.navbar-brand {
    font-size: 1.25rem;
    font-weight: bold;
}

.navbar-nav .nav-link {
    padding: 0.5rem 1rem;
}

/* Responsividade */
@media (max-width: 768px) {
    .navbar-nav .nav-link {
        padding: 0.5rem;
        font-size: 1rem;
    }
}
</style>
