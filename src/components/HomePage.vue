<template>
    <div class="home">
        <section class="vh-100 bg-light" style="padding-bottom: 50px;">
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
                    <div class="col-md-12">
                        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addTaskModal"
                            style="margin-bottom: 10px;">
                            <i class="bi bi-plus-circle text-white"></i> Nova Tarefa
                        </button>
                        <table class="table table-striped table-hover shadow-sm rounded">
                            <thead class="table" style="background-color: #311772;">
                                <tr style="background-color: #311772;">
                                    <th scope="col" style="width: 5%;"></th>
                                    <th scope="col">Título</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" style="width: 15%;">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="task in tasks" :key="task.id">
                                    <th scope="row">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox"
                                                :checked="task.status === 'completed'"
                                                @change="updateTaskStatus(task)" />
                                        </div>
                                    </th>
                                    <td>{{ task.title }}</td>
                                    <td>{{ task.description }}</td>
                                    <td>
                                        <span :class="statusBadgeClass(task.status)">
                                            {{ formatStatus(task.status) }}
                                        </span>
                                    </td>
                                    <td>
                                        <!-- Botão Editar -->
                                        <button class="btn btn-warning btn-sm me-2" @click="openEditModal(task)">
                                            <i class="bi bi-pencil-square"></i>
                                        </button>
                                        <!-- Botão Deletar -->
                                        <button class="btn btn-danger btn-sm" @click="openDeleteModal(task)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Modal para Adicionar Nova Task -->
            <div class="modal fade" id="addTaskModal" tabindex="-1" aria-labelledby="addTaskModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addTaskModalLabel">Adicionar Nova Task</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="createTask">
                                <div class="mb-3">
                                    <label for="title" class="form-label">Título</label>
                                    <input type="text" class="form-control" id="title" v-model="newTask.title"
                                        required />
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">Descrição</label>
                                    <textarea class="form-control" id="description" v-model="newTask.description"
                                        required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="status" class="form-label">Status</label>
                                    <select class="form-select" id="status" v-model="newTask.status" required>
                                        <option value="pending">Pendente</option>
                                        <option value="completed">Concluída</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary">Criar Task</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Modal de Edição -->
            <div class="modal fade" id="editTaskModal" tabindex="-1" aria-labelledby="editTaskModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editTaskModalLabel">Editar Task</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="updateTask">
                                <div class="mb-3">
                                    <label for="taskTitle" class="form-label">Título</label>
                                    <input type="text" class="form-control" id="taskTitle" v-model="taskToEdit.title"
                                        required />
                                </div>
                                <div class="mb-3">
                                    <label for="taskDescription" class="form-label">Descrição</label>
                                    <textarea class="form-control" id="taskDescription" rows="3"
                                        v-model="taskToEdit.description" required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="taskStatus" class="form-label">Status</label>
                                    <select class="form-select" id="taskStatus" v-model="taskToEdit.status" required>
                                        <option value="pending">Pendente</option>
                                        <option value="completed">Concluído</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal de Confirmação de delete -->
            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteModalLabel">Confirmação de Exclusão</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Tem certeza de que deseja excluir esta tarefa?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-danger" @click="confirmDeleteTask">Confirmar</button>
                        </div>
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
import axios from '../axios';
import { Modal } from 'bootstrap';
export default {
    name: 'HomePage',
    data() {
        return {
            tasks: [],
            responseError: '',
            taskToDelete: null,
            newTask: {
                title: '',
                description: '',
                status: 'pending'
            },
            taskToEdit: {
                id: null,
                title: '',
                description: '',
                status: ''
            }
        };
    },
    methods: {
        async listTasks() {
            try {
                const response = await axios.get('/task');
                this.tasks = response.data.data; // Armazena as tarefas na `data`
            } catch (error) {
                this.responseError = 'Erro ao listar tarefas';
            }
        },
        formatStatus(status) {
            // Formata o status para exibição mais amigável
            return status.charAt(0).toUpperCase() + status.slice(1);
        },
        statusBadgeClass(status) {
            // Retorna a classe de badge conforme o status
            switch (status) {
                case 'completed':
                    return 'badge bg-success';
                case 'pending':
                    return 'badge bg-warning';
                case 'delayed':
                    return 'badge bg-danger';
                default:
                    return 'badge bg-secondary';
            }
        },
        openCreateTaskModal() {
            const addTaskModal = new Modal(document.getElementById('addTaskModal'));
            addTaskModal.show();
        },
        async createTask() {
            try {
                await axios.post('/task', this.newTask);
                const addModal = new Modal(document.getElementById('addTaskModal'));
                addModal.hide();  // Fecha o modal
            } catch (error) {
                this.responseError = 'Erro ao criar task';
            }
        },
        openEditModal(task) {
            this.taskToEdit = { ...task }; // Copia os dados da task para o objeto taskToEdit
            const myModal = new Modal(document.getElementById('editTaskModal'));
            myModal.show();
        },
        async updateTaskStatus(task) {
            const newStatus = task.status === 'completed' ? 'pending' : 'completed';
            try {
                await axios.put(`/task/${task.id}`, {
                    title: task.title,
                    description: task.description,
                    status: newStatus 
                });
                task.status = newStatus;
            } catch (error) {
                this.responseError = 'Erro ao atualizar o status da tarefa';
            }
        },
        async updateTask() {
            this.taskToEdit.status === 'completed' ? 'pending' : 'completed';
            try {
                await axios.put(`/task/${this.taskToEdit.id}`, {
                    title: this.taskToEdit.title,
                    description: this.taskToEdit.description,
                    status: this.taskToEdit.status
                });
                const myModal = new Modal(document.getElementById('editTaskModal'));
                myModal.hide();
            } catch (error) {
                this.responseError = 'Erro ao atualizar o status da tarefa';
            }
        },
        openDeleteModal(task) {
            this.taskToDelete = task;  // Define a tarefa a ser deletada
            const deleteModal = new Modal(document.getElementById('deleteModal'));
            deleteModal.show();
        },
        async confirmDeleteTask() {
            if (this.taskToDelete) {
                try {
                    await axios.delete(`/task/${this.taskToDelete.id}`);
                    this.tasks = this.tasks.filter(task => task.id !== this.taskToDelete.id);
                    this.taskToDelete = null;
                    const deleteModal = new Modal(document.getElementById('deleteModal'));
                    deleteModal.hide();
                } catch (error) {
                    this.responseError = 'Erro ao excluir a tarefa';
                }
            }
        }
    },
    mounted() {
        this.listTasks();
    }
};
</script>

<style scoped>
/* Ajustes gerais */
.bg-light {
    background: linear-gradient(to right, #f4f4f4, #ffffff);
}

.container {
    max-width: 80%;
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
    background-size: cover;
    /* Redimensiona a imagem para cobrir todo o contêiner */
    background-position: center;
    /* Centraliza a imagem no contêiner */
    background-repeat: no-repeat;
    /* Evita que a imagem se repita */
    height: 50vh;
    /* Altura total da viewport */
}

.bg-table {
    background-color: #311772 !important;
}

/* .bg-table th{
    color: white;
} */

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
