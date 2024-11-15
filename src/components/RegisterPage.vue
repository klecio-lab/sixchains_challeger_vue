<template>
    <div class="register">
        <section class="vh-100">
            <div class="container-fluid h-custom">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-9 col-lg-6 col-xl-5">
                        <img src="@/assets/logo_sixchains_roxo.png" class="img-fluid" alt="Sample image">
                    </div>
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form @submit.prevent="register">
                            <div class="divider d-flex align-items-center my-4">
                                <p class="text-center fw-bold mx-3 mb-0">register</p>
                            </div>

                            <!-- Nome input -->
                            <div data-mdb-input-init class="form-outline mb-4">
                                <input v-model="name" type="text" id="form3Example3"
                                    class="form-control form-control-lg" placeholder="Seu Nome" @input="validateName" />
                                <div v-if="error.name" class="text-danger">{{ error.name }}</div>
                            </div>

                            <!-- E-mail input -->
                            <div data-mdb-input-init class="form-outline mb-4">
                                <input v-model="email" type="email" id="form3Example3"
                                    class="form-control form-control-lg" placeholder="Adicione um endereço de E-mail"
                                    @input="validateEmail" />
                                <div v-if="error.email" class="text-danger">{{ error.email }}</div>
                            </div>

                            <!-- Senha input -->
                            <div data-mdb-input-init class="form-outline mb-3">
                                <input v-model="password" type="password" id="form3Example4"
                                    class="form-control form-control-lg" placeholder="Sua Senha"
                                    @input="validatePassword" />
                                <div v-if="error.password" class="text-danger">{{ error.password }}</div>
                            </div>

                            <!-- Confirmar Senha input -->
                            <div data-mdb-input-init class="form-outline mb-3">
                                <input v-model="password_confirmation" type="password" id="form3Example4"
                                    class="form-control form-control-lg" placeholder="Confirme Sua Senha"
                                    @input="validatePasswordConfirmation" />
                                <div v-if="error.password_confirmation" class="text-danger">{{
                                    error.password_confirmation }}</div>
                            </div>

                            <!-- Mensagem de erro geral -->
                            <p v-if="formError" class="error text-danger">{{ formError }}</p>

                            <div class="text-center text-lg-start mt-4 pt-2">
                                <button :disabled="isFormInvalid" type="submit" data-mdb-button-init data-mdb-ripple-init
                                    class="btn btn-primary btn-lg bg-custom bg-custom-button"
                                    :class="{'bg-custom': isFormInvalid}" 
                                    style="padding-left: 2.5rem; padding-right: 2.5rem;">Enviar</button>
                                <p class="small fw-bold mt-2 pt-1 mb-0">Já tem conta?
                                    <router-link to="/login" class="link-danger">Login</router-link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div
                class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-custom">
                <!-- Copyright -->
                <div class="text-white mb-3 mb-md-0">
                    Copyright © 2024. All rights reserved.
                </div>
                <!-- Copyright -->
            </div>
        </section>
    </div>
</template>

<script>
import axios from '../axios';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            error: {
                name: ' ',
                email: ' ',
                password: ' ',
                password_confirmation: ' '
            }
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post('auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                });

                // Armazenando o token no localStorage
                localStorage.setItem('token', response.data.token);

                // Redirecionando para a página inicial após o login
                this.$router.push('/');
            } catch (error) {
                // Mostrando erro, caso o login falhe
                this.error = 'Email ou senha incorretos!';
            }
        },
        validateName() {
            if (this.name.length < 3) {
                this.error.name = 'O nome deve ter pelo menos 3 caracteres';
            } else {
                this.error.name = '';
            }
        },
        validateEmail() {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(this.email)) {
                this.error.email = 'Digite um email válido';
            } else {
                this.error.email = '';
            }
        },
        validatePassword() {
            if (this.password.length < 6) {
                this.error.password = 'A senha deve ter pelo menos 6 caracteres';
            } else {
                this.error.password = '';
            }
        },
        validatePasswordConfirmation() {
            if (this.password !== this.password_confirmation) {
                this.error.password_confirmation = 'As senhas não coincidem';
            } else {
                this.error.password_confirmation = '';
            }
        }
    },
    computed: {
        isFormInvalid() {
            // Desabilita o botão de submit se houver algum erro
            return Object.values(this.error).some(err => err !== '');
        }
    }
};
</script>

<style scoped>
.error {
    color: red;
}

.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}

.h-custom {
    height: calc(100% - 73px);
}

@media (max-width: 450px) {
    .h-custom {
        height: 100%;
    }
}

.bg-custom {
    background-color: #311772 !important;
}

.bg-custom-button:hover {
    background-color: #F2570A !important;
}

.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 0.875rem;
}
</style>