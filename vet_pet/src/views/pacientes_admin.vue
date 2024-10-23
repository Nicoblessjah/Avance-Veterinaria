<script setup>
import { ref, onMounted } from 'vue';
import SideBar from '../../../../E.T TALLER 2/avance_priv/vet_pet/src/components/SideBarAdmin.vue';

const pacientes = ref([]);
const usuarios = ref([]);

const obtenerPacientes = async () => {
  try {
    const response = await fetch('http://localhost:3000/pacientes');
    pacientes.value = await response.json();
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
  }
};

const obtenerUsuarios = async () => {
  try {
    const response = await fetch('http://localhost:3000/usuarios');
    usuarios.value = await response.json();
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
};

const obtenerNombreDueno = (idDueno) => {
  const dueno = usuarios.value.find(usuario => usuario.id === idDueno.toString());
  return dueno ? dueno.nombre : 'Desconocido';
};

const borrarPaciente = async (id) => {
  if (confirm('¿Estás seguro de que deseas borrar este paciente?')) {
    try {
      const response = await fetch(`http://localhost:3000/pacientes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Paciente borrado con éxito.');
        // volver a cargar la lista de pacientes después de borrar
        obtenerPacientes();
      } else {
        console.error('Error al borrar el paciente:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de borrar:', error);
    }
  }
};

// cargar pacientes y usuarios al montar el componente
onMounted(() => {
  obtenerPacientes();
  obtenerUsuarios();
});
</script>

<script>
export default {
  name: 'PacientesAdmin',
};
</script>

<template>
  <body>
  <SideBar />
  <main>
    <h2>Lista de Pacientes</h2>
    <table class="user-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Fecha de nacimiento</th>
        <th>Especie</th>
        <th>Raza</th>
        <th>Sexo</th>
        <th>Estado</th>
        <th>Dueño</th>
        <th>Acciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="paciente in pacientes" :key="paciente.id">
        <td class="truncate">{{ paciente.id }}</td>
        <td class="truncate">{{ paciente.nombre }}</td>
        <td class="truncate">{{ paciente.fechaNacimiento }}</td>
        <td class="truncate">{{ paciente.especie }}</td>
        <td class="truncate">{{ paciente.raza }}</td>
        <td class="truncate">{{ paciente.sexo }}</td>
        <td class="truncate">{{ paciente.estado }}</td>
        <td class="truncate">{{ obtenerNombreDueno(paciente.clienteid) }}</td>
        <td>
          <router-link :to="{ path: '/editarpaciente', query: { id: paciente.id } }" class="edit-btn">Editar</router-link>
          <button @click="borrarPaciente(paciente.id)" class="delete-btn">Borrar</button>
        </td>
      </tr>
      </tbody>
    </table>
  </main>
  </body>
</template>

<style>
.edit-btn,
.delete-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  font-family: 'Inter', sans-serif;
}

.edit-btn {
  background-color: #4285f4;
  color: white;
  margin-right: 5px;
}

.edit-btn:hover {
  background-color: #3367d6;
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
}

.delete-btn:hover {
  background-color: #ff5252;
}

a {
  text-decoration: none;
}
</style>
