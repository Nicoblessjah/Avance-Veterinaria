<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SideBar from '@/components/SideBarAdmin.vue';

const route = useRoute();
const router = useRouter();
const idPaciente = route.query.id; // Obtener el ID del paciente

const paciente = ref({
  id: '',
  nombre: '',
  fechaNacimiento: '',
  especie: '',
  raza: '',
  sexo: '',
  estado: '',
  dueñoId: ''
});

// Cargar los datos del paciente
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/pacientes');
    const pacientes = await response.json();
    const pacienteEncontrado = pacientes.find(p => p.id === idPaciente);
    if (pacienteEncontrado) {
      paciente.value = pacienteEncontrado;
    }
  } catch (error) {
    console.error('Error al cargar los pacientes:', error);
  }
});

// Función para guardar los cambios
const guardarCambios = async () => {
  try {
    const response = await fetch(`http://localhost:3000/pacientes/${idPaciente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paciente.value)
    });

    if (response.ok) {
      router.push('/pacientes_admin.html');
    } else {
      console.error('Error al guardar los cambios:', response.statusText);
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
};
</script>

<script>
export default {
  name: 'EditarPaciente',
};
</script>

<template>
  <body>
  <SideBar />
  <main>
    <h2>Editar Paciente</h2>
    <form id="editPatientForm" @submit.prevent="guardarCambios">
      <div class="form-group">
        <label for="userName">Nombre</label>
        <input type="text" id="userName" v-model="paciente.nombre" required />
      </div>
      <div class="form-group">
        <label for="userNacimiento">Fecha de nacimiento</label>
        <input type="text" id="userNacimiento" v-model="paciente.fechaNacimiento" required />
      </div>
      <div class="form-group">
        <label for="userEspecie">Especie</label>
        <input type="text" id="userEspecie" v-model="paciente.especie" required />
      </div>
      <div class="form-group">
        <label for="userRaza">Raza</label>
        <input type="text" id="userRaza" v-model="paciente.raza" required />
      </div>
      <div class="form-group">
        <label for="userSexo">Sexo</label>
        <input type="text" id="userSexo" v-model="paciente.sexo" required />
      </div>
      <div class="form-group">
        <label for="userEstado">Estado</label>
        <select id="userEstado" v-model="paciente.estado" required>
          <option value="en_reserva">Hora reservada</option>
          <option value="en_atencion">En atención</option>
          <option value="recuperacion">Recuperación</option>
          <option value="de_alta">De alta</option>
          <option value="atendido">Atendido</option>
        </select>
      </div>
      <div class="form-group">
        <label for="userDueño">ID Dueño</label>
        <input type="text" id="userDueño" v-model="paciente.dueñoId" required />
      </div>
      <div class="form-buttons">
        <router-link :to="{ path: '/pacientes'}" class="save-btn">Guardar</router-link>
        <router-link :to="{ path: '/pacientes'}" class="cancel-btn">Cancelar</router-link>
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

h2 {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-bottom: 30px;
}

.user-table th,
.user-table td {
  padding: 5px;
  border: 1px solid #ddd;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.user-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.user-table td:hover .truncate {
  display: inline-block;
  white-space: normal;
  word-break: break-all;
  background-color: #f1f1f1;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
}

.user-table td {
  padding: 5px;
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

  h2 {
    text-align: center;
  }
}
/* Estilos para la página de editar usuario */
form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.save-btn {
  background-color: #4285f4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.save-btn:hover {
  background-color: #3367d6;
}

.cancel-btn {
  background-color: #ff6b6b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.cancel-btn:hover {
  background-color: #ff5252;
}

a { /* Elimina el subrayado de todos los enlaces */
  text-decoration: none;
  color: inherit;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.preview-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

#userImage {
  display: none;
}

.edit-image-btn {
  background-color: #3bce35;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.edit-image-btn:hover {
  background-color: #2a9826;
}

</style>