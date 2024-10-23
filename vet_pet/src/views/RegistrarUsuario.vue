<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import PiePagina from '@/components/PiePagina.vue';

// Variables reactivas para el formulario
const nombre = ref('');
const apellido = ref('');
const telefono = ref('');
const direccion = ref('');
const email = ref('');
const run = ref('');
const password = ref('');
const confirmPassword = ref('');
const errores = ref([]);
const router = useRouter();

// Función para obtener el conteo de usuarios y asignar el ID
const usuariosCount = ref(0);
const veterinariosCount = ref(0);
const adminsCount = ref(0);
const clientesCount = ref(0);

// Función para obtener el conteo de usuarios
async function fetchCounts() {
  try {
    const usuariosResponse = await fetch('http://localhost:3000/usuarios');
    const usuariosData = await usuariosResponse.json();
    console.log('Usuarios Data:', usuariosData);

    // Contar todos los usuarios
    usuariosCount.value = usuariosData.length;
    console.log('Total Usuarios:', usuariosCount.value);

    // Contar veterinarios
    veterinariosCount.value = usuariosData.filter(usuario => usuario.rol === 2).length;
    console.log('Total Veterinarios:', veterinariosCount.value);

    // Contar admins y clientes
    adminsCount.value = usuariosData.filter(usuario => usuario.rol === 1).length;
    clientesCount.value = usuariosData.filter(usuario => usuario.rol === 3).length;
    console.log('Total Admins:', adminsCount.value);
    console.log('Total Clientes:', clientesCount.value);

    // Si necesitas devolver los conteos
    return {
      totalUsuarios: usuariosCount.value,
    };
  } catch (error) {
    console.error('Error fetching counts:', error);// Retornar 0s en caso de error
  }
}


const registrarUsuario = async () => {
  errores.value = [];

  // Validaciones
  if (password.value !== confirmPassword.value) {
    errores.value.push('Las contraseñas no coinciden.');
  }

  if (!/^\d{9}$/.test(telefono.value)) {
    errores.value.push('El Número de Teléfono debe tener 9 dígitos (ej: 9XXXXXXXX).');
  }

  if (!/^.+-.+$/.test(run.value)) {
    errores.value.push('RUN inválido, ingrese sin puntos y con guion (ej: XXXXXXXX-X).');
  }

  // Verificar si el email ya existe
  try {
    const response = await axios.get(`http://localhost:3000/usuarios?email=${email.value}`);
    if (response.data.length > 0) {
      errores.value.push('El correo electrónico ya está registrado.');
    }
  } catch (error) {
    console.error('Error al verificar el email:', error);
    errores.value.push('Ocurrió un error al verificar el correo electrónico.');
  }

  if (errores.value.length > 0) {
    return;
  }

  // Obtener el conteo de usuarios y asignar el ID
  const conteoUsuarios = await fetchCounts();
  
  const nuevoUsuario = {
    id: `${conteoUsuarios ? conteoUsuarios.totalUsuarios + 1 : 1}`,
    nombre: nombre.value,
    apellido: apellido.value,
    telefono: telefono.value,
    email: email.value,
    direccion: direccion.value,
    run: run.value,
    contrasena: password.value,
    rol: 1
  };

  try {
    const response = await axios.post('http://localhost:3000/usuarios', nuevoUsuario);

    if (response.status === 201) {
      alert('Registro exitoso. Redirigiendo al inicio de sesión...');
      router.push('/');
    }
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    alert('Ocurrió un error al intentar registrar el usuario.');
  }
};

</script>


<template>
    <header>
        <div class="header-wrapper">
            <img src="@/assets/logo%20vet.png" alt="Logo PetVida" class="logo-image">
            <span class="clinic-title">Veterinaria <strong>PetVida</strong></span>
        </div>
    </header>

    <div class="registration-wrapper">
        <img :src="require('@/assets/perroregistro.png')" alt="Foto" class="photo-registration">
        <main>
            <form @submit.prevent="registrarUsuario" class="form-registration">
                <div class="form-container">
                    <h1>Registro</h1>
                    <br>
                    <div class="form-layout">
                        <div class="form-section">
                            <div class="input-group">
                                <label for="nombre">Nombre</label>
                                <input type="text" id="nombre" v-model="nombre" required>
                            </div>
                            <div class="input-group">
                                <label for="telefono">Teléfono</label>
                                <input type="tel" id="telefono" v-model="telefono" required>
                            </div>
                            <div class="input-group">
                                <label for="direccion">Dirección</label>
                                <input type="text" id="direccion" v-model="direccion" required>
                            </div>
                            <div class="input-group">
                                <label for="password">Contraseña</label>
                                <input type="password" placeholder="******" id="password" v-model="password" required>
                            </div>
                        </div>
                        <div class="form-section">
                            <div class="input-group">
                                <label for="apellido">Apellido</label>
                                <input type="text" id="apellido" v-model="apellido" required>
                            </div>
                            <div class="input-group">
                                <label for="correo">Email</label>
                                <input type="email" id="correo" v-model="email" required>
                            </div>
                            <div class="input-group">
                                <label for="run">RUN</label>
                                <input type="text" id="run" v-model="run" required>
                            </div>
                            <div class="input-group">
                                <label for="confirmPassword">Confirmar Contraseña</label>
                                <input type="password" placeholder="******" id="confirmPassword" v-model="confirmPassword" required>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Errores -->
                <div v-if="errores.length" class="error-list">
                    <ul>
                        <li v-for="(error, index) in errores" :key="index" style="color:red;">{{ error }}</li>
                    </ul>
                </div>

                <button type="submit" class="submit-button">Crear Cuenta</button>
                <br><br>
                <div class="login-prompt">
                    ¿Ya tienes cuenta? <router-link to="/">Ingresa Aquí</router-link>
                </div>
            </form>
        </main>
    </div>
    <PiePagina />
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

form[data-v-698ee93b] {
    border: none; 
    box-shadow: none; 
    margin: 0; 
    padding: 0;
    margin-left: 80px;
    height: 500px;
}


.error-list {
    color: red;
}

header {
    height: 80px;
    padding: 1px 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #AECBFA;
}

.header-wrapper {
    display: flex;
    align-items: center;
}

.logo-image {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.clinic-title {
    font-family: 'Poppins', sans-serif;
    font-size: 1.2em;
    color: #333;
}

.clinic-title strong {
    color: #4285f4;
}

.registration-wrapper {
    display: flex;
    height: 80vh;
    align-items: center; 
    justify-content: center; 
}

.photo-registration {
    position: relative;
    width: 20%;
    height: 500px;
    object-fit: cover;
    left: 5%;
    border-radius: 10px; 
}

.form-registration {
    font-family: 'Poppins', sans-serif;
    flex: 1; 
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    margin-bottom: 15px;
    margin-top: -15px;
}

.form-container {
    margin: 0;
    background-color: #f9f9f9;
    padding: 80px;
    border-radius: 5px;
    height: 500px;
}

.form-layout {
    display: flex;
    gap: 60px;
}

.form-section {
    flex: 1;
}

.input-group {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
}

label {
    width: 140px;
    margin-right: 10px;
    text-align: left;
    font-weight: bold;
}

input, select {
    flex: 1;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 40px;
    font-family: 'Poppins', sans-serif;
}

.submit-button {
    background-color: #4285f4;
    color: white;
    border: none;
    padding: 10px 300px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    display: block;
    margin: 0 auto;
    font-weight: bold;
    transition: background-color 0.3s ease;
    font-family: 'Poppins', sans-serif;
    margin-top: -125px;
}

.submit-button:hover {
    background-color: #3367d6;
}

.login-prompt {
    text-align: center;
    font-size: 1em;
    color: #333;
}

.login-prompt a {
    color: #4285f4;
    text-decoration: none; 
    font-weight: bold;
}

.login-prompt a:hover {
    text-decoration: underline; 
}

footer {
    background-color: #AECBFA;
    position: absolute;
    text-align: center;
    bottom: 0;
    width: 100%;
    height: 60px;
}
</style>
