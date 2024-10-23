<script setup>
import PiePagina from '@/components/PiePagina.vue'; 
import BarraCliente from '@/components/BarraCliente.vue'; 
</script>
<script>
import axios from 'axios';

export default {
  name: 'MascotaCiente',
  data() {
    return {
      usuario: null, // Para almacenar el usuario del localStorage
      pacientes: [],
      usuarios: [],
    };
  },

  created() {
    const usuario = JSON.parse(localStorage.getItem('user'));
    this.usuario = usuario;
  },

  methods: {
  async fetchData() {
    try {
      const [usuariosResponse, pacientesResponse] = await Promise.all([
        axios.get("http://localhost:3000/usuarios"),
        axios.get("http://localhost:3000/pacientes"),
      ]);
      this.usuarios = usuariosResponse.data;

      // Convertir ambos valores a cadenas para asegurar una comparación correcta
      this.pacientes = pacientesResponse.data.filter(paciente => String(paciente.clienteid) === String(this.usuario.id));
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  },

    async eliminarMascota(id) {
      const confirmar = confirm('¿Estás seguro de que deseas eliminar este tu Mascota?');
      if (!confirmar) return;

      try {
        await axios.delete(`http://localhost:3000/pacientes/${id}`);
        this.pacientes = this.pacientes.filter(paciente => paciente.id !== id);
        alert('Mascota eliminada con éxito');
      } catch (error) {
        console.error("Error al eliminar la Mascota:", error);
      }
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>


<template>
    <BarraCliente />
    <main>
        <div class="table-container">
            <h2>Lista de tus Mascotas</h2>
            <table class="user-table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Fecha de nacimiento</th>
                    <th>Especie</th>
                    <th>Raza</th>
                    <th>Sexo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="paciente in pacientes" :key="paciente.id">
                        <td>{{paciente.nombre}}</td>
                        <td>{{paciente.fechaNacimiento}}</td>
                        <td>{{paciente.especie}}</td>
                        <td>{{paciente.raza}}</td>
                        <td>{{paciente.sexo}}</td>
                        <td>{{paciente.estado}}</td>
                        <td>
                          <router-link :to="{ path: '/EditarMascota/' + paciente.id }" class="edit-btn">Editar</router-link>
                            <button class="delete-btn" @click="eliminarMascota(paciente.id)">Borrar</button>
                        </td>
                    </tr>
                </tbody>
              </table>
              <div class="form-buttons">
                <br><br>
   <router-link 
        to="/addMascota" 
        class="create-btn"
    >
        Añadir Mascota
    </router-link>
</div>
        </div>
    </main>
    <PiePagina />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    color: #333;
}

main {
    display: flex;
    justify-content: center;
    height: 80vh;
    margin: 0 auto;
    padding: 20px;
}

h2 {
    text-align: center;
    margin-bottom: 50px; /* Reduce el margen inferior */
    margin-top: 180px;
}

.table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 150px;
}

.user-table {
    width: 90%;
    border-collapse: collapse;
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
    font-weight: bold;
}

.edit-btn,
.delete-btn {
    text-decoration: none;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease;
}
.create-btn {
  margin-top: 30px;
  background-color: rgb(11, 201, 11);
    text-decoration: none;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    color: white;
}
.create-btn:hover {
    background-color: rgb(54, 213, 54);
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
</style>
