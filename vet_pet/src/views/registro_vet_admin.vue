<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import SideBar from '../../../../E.T TALLER 2/avance_priv/vet_pet/src/components/SideBarAdmin.vue';

const nombre = ref('');
const apellido = ref('');
const direccion = ref('');
const telefono = ref('');
const correo = ref('');
const run = ref('');
const contrasena = ref('');
const confirmContrasena = ref('');
const errores = ref([]);

const router = useRouter();

const registrarVeterinario = async () => {
  errores.value = [];

  // validaciones
  if (contrasena.value !== confirmContrasena.value) {
    errores.value.push('Las contraseñas no coinciden.');
  }

  if (!/^\d{9}$/.test(telefono.value)) {
    errores.value.push('El Número de Teléfono debe tener 9 dígitos (ej: 9XXXXXXXX).');
  }

  if (!/^.+-.+$/.test(run.value)) {
    errores.value.push('RUN inválido, ingrese sin puntos y con guion (ej: XXXXXXXX-X).');
  }

  if (errores.value.length > 0) {
    return;
  }

  const nuevoVeterinario = {
    nombre: nombre.value,
    apellido: apellido.value,
    direccion: direccion.value,
    telefono: telefono.value,
    email: correo.value,
    run: run.value,
    contrasena: contrasena.value,
    rol: 2 // rol 2 para que se registre como vet
  };

  try {
    const response = await axios.post('http://localhost:3000/usuarios', nuevoVeterinario);

    if (response.status === 201) {
      alert('Veterinario registrado exitosamente');
      router.push('/usuarios');
    }
  } catch (error) {
    console.error('Error al registrar el veterinario:', error);
    alert('Error al registrar el veterinario');
  }
};
</script>

<template>
  <body>
  <SideBar/>
  <main>
    <div class="avatar-container">
      <img src="../../../../E.T%20TALLER%202/avance_priv/vet_pet/src/assets/avatar.png" alt="Avatar" class="avatar">
    </div>
    <h2>Registro Veterinario</h2>
    <form @submit.prevent="registrarVeterinario">
      <div class="form-section">
        <h2>Datos del veterinario</h2>
        <div class="form-columns">
          <div class="form-column">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input type="text" id="nombre" v-model="nombre" required>
            </div>
            <div class="form-group">
              <label for="apellido">Apellido</label>
              <input type="text" id="apellido" v-model="apellido" required>
            </div>
            <div class="form-group">
              <label for="direccion">Dirección</label>
              <input type="text" id="direccion" v-model="direccion" required>
            </div>
            <div class="form-group">
              <label for="contraseña">Contraseña</label>
              <input type="password" id="contraseña" v-model="contrasena" required>
            </div>
            <div class="form-group">
              <label for="confirmar_contraseña">Confirmar Contraseña</label>
              <input type="password" id="confirmar_contraseña" v-model="confirmContrasena" required>
            </div>
          </div>
          <div class="form-column">
            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input type="tel" id="telefono" v-model="telefono" required>
            </div>
            <div class="form-group">
              <label for="correo">Correo electrónico</label>
              <input type="email" id="correo" v-model="correo" required>
            </div>
            <div class="form-group">
              <label for="run">RUN</label>
              <input type="text" id="run" v-model="run" required>
            </div>
          </div>
        </div>
        <div v-if="errores.length" class="errores">
          <ul>
            <li v-for="error in errores" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="button-group">
        <button type="submit" class="button guardar-btn">Guardar</button>
        <router-link to="/usuarios" class="button cancelar-btn">Cancelar</router-link>
      </div>
    </form>
  </main>
  </body>
</template>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
  color: #333;
  display: flex;
}

.errores {
  color: red;
  margin-top: 10px;
}

.logo img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}


.veterinaria-nombre strong {
  color: #4285f4;
}


.sidebar nav ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.sidebar nav ul li {
  margin-bottom: 20px;
  width: 100%;
}

main {
  margin-left: 220px;
  padding: 20px;
  width: calc(100% - 220px);
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

h1 {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-bottom: 10px;
}

h2 {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-bottom: 30px;
}

form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
}

.form-section {
  margin-bottom: 30px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.form-columns {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.form-column {
  flex: 1;
  min-width: 0;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

label {
  width: 120px;
  margin-right: 10px;
  text-align: left;
  font-weight: bold;
}

input, select {
  flex: 1;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
}

.form-group:has(input[type="number"]) {
  position: relative;
}

.form-group input[type="number"] {
  padding-right: 30px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  font-family: 'Inter', sans-serif;
}

.guardar-btn {
  background-color: #4285f4;
  color: white;
}

.guardar-btn:hover {
  background-color: #3367d6;
}

.cancelar-btn {
  background-color: #ff6b6b;
  color: white;
}

.cancelar-btn:hover {
  background-color: #ff5252;
}


@media (max-width: 768px) {
  main {
    margin-left: 0;
    width: 100%;
  }

  .sidebar nav ul {
    display: flex;
    justify-content: space-around;
  }

  .avatar-container, h1, h2 {
    text-align: center;
  }

  .form-columns {
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    flex-direction: column;
    align-items: flex-start;
  }

  label {
    width: 100%;
    margin-bottom: 5px;
    text-align: left;
  }
}
a {
  text-decoration: none;
  color: inherit;
}

</style>