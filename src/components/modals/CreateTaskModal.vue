<template>
    <div>
        <div class="modal fade" id="addTaskModal" tabindex="-1" aria-labelledby="addTaskModalLabel" aria-hidden="true">
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
                                <input type="text" class="form-control" id="title" v-model="newTaskLocal.title" required />
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">Descrição</label>
                                <textarea class="form-control" id="description" v-model="newTaskLocal.description"
                                    required></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="status" class="form-label">Status</label>
                                <select class="form-select" id="status" v-model="newTaskLocal.status" required>
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
    </div>
</template>

<script>
import axios from '../../axios';
import { Modal } from 'bootstrap';
export default {
    props: ['newTask'],
    data() {
        return {
            newTaskLocal: { ...this.newTask }  // Cria uma cópia local da prop
        };
    },
    methods: {
        openCreateTaskModal() {
            const addTaskModal = new Modal(document.getElementById('addTaskModal'));
            addTaskModal.show();
        },
        async createTask() {
            try {
                await axios.post('/task', this.newTaskLocal);
                const addModal = new Modal(document.getElementById('addTaskModal'));
                addModal.hide();  // Fecha o modal
            } catch (error) {
                this.responseError = 'Erro ao criar task';
            }
        }
    }
};
</script>
