<script setup>
import SideBarVet from '@/components/SideBarVet.vue'
</script>
<template>
    <SideBarVet/>

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
                    <td>{{paciente.id}}</td>
                    <td>{{paciente.nombre}}</td>
                    <td>{{paciente.fechaNacimiento}}</td>
                    <td>{{paciente.especie}}</td>
                    <td>{{paciente.raza}}</td>
                    <td>{{paciente.sexo}}</td>
                    <td>{{paciente.estado}}</td>
                    <td>{{getNombreCliente(paciente.clienteid)}}</td>
                    <td>
                      <router-link :to="{ path: '/EditarPacienteVet/' + paciente.id }" class="edit-btn">Editar</router-link>
                        <button class="delete-btn" @click="eliminarPaciente(paciente.id)">Borrar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>

</template>

<script>
import axios from 'axios';
export default {
    name:'PacientesVet',
    data(){
        return{
            pacientes:[],
            usuarios:[]
        }
    },

    methods: {
    async fetchData() {
      try {
        const [usuariosResponse, pacientesResponse] = await Promise.all([
          axios.get("http://localhost:3000/usuarios"),
          axios.get("http://localhost:3000/pacientes"),
        ]);
        this.usuarios = usuariosResponse.data;
        this.pacientes = pacientesResponse.data;
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    getNombreCliente(clienteid) {
      const usuario = this.usuarios.find((u) => u.id == clienteid);
      return usuario ? `${usuario.nombre} ${usuario.apellido}` : "Desconocido";
    },
    async eliminarPaciente(id) {
            const confirmar = confirm('¿Estás seguro de que deseas eliminar este paciente?');
            if (!confirmar) return;

            try {
                await axios.delete(`http://localhost:3000/pacientes/${id}`);
                this.pacientes = this.pacientes.filter(paciente => paciente.id !== id);
                alert('Paciente eliminado con éxito');
            } catch (error) {
                console.error("Error al eliminar el paciente:", error);
            }
        },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
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
</style>