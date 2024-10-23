<script setup>
import SideBarVet from '@/components/SideBarVet.vue'
</script>
<template>
    <SideBarVet/>

    <main>
        <h2>Horas agendadas</h2>
            <table class="user-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre Dueño</th>
                    <th>Fecha de cita</th>
                    <th>Hora cita</th>
                    <th>ID Paciente</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="cita in citas" :key="cita.id">
                        <td>{{cita.id}}</td>
                        <td>{{getNombreCliente(cita.clienteid)}}</td>
                        <td>{{cita.fecha}}</td>
                        <td>{{cita.hora}}</td>
                        <td>{{getNombrePaciente(cita.pacienteid)}}</td>
                        <td>
                            <button class="delete-btn" @click="eliminarCita(cita.id)">Cancelar cita</button>
                        </td>
                    </tr>
                </tbody>
                
            </table>
    </main>
</template>
<script>
import axios from 'axios';
export default {
    name:'AgendaVet',
    data(){
        return{
            citas:[],
            pacientes:[],
            usuarios:[]
        }
    },

    methods: {
    async fetchData() {
      try {
        const [usuariosResponse, pacientesResponse, citasResponse] = await Promise.all([
          axios.get("http://localhost:3000/usuarios"),
          axios.get("http://localhost:3000/pacientes"),
          axios.get("http://localhost:3000/citas"),
        ]);
        this.usuarios = usuariosResponse.data;
        this.pacientes = pacientesResponse.data;
        this.citas = citasResponse.data
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    getNombreCliente(clienteid) {
      const usuario = this.usuarios.find((u) => u.id == clienteid);
      return usuario ? `${usuario.nombre} ${usuario.Apellido}` : "Desconocido";
    },
    getNombrePaciente(pacienteid) {
      const paciente = this.pacientes.find((u) => u.id == pacienteid);
      return paciente ? `${paciente.nombre} ` : "Desconocido";
    },
    async eliminarCita(id) {
            const confirmar = confirm('¿Estás seguro de que deseas cancelar esta cita?');
            if (!confirmar) return;

            try {
                await axios.delete(`http://localhost:3000/citas/${id}`);
                this.citas = this.citas.filter(cita => cita.id !== id);
                alert('Cita cancelad con éxito');
            } catch (error) {
                console.error("Error al cancelar la cita:", error);
            }
        },
  },
  mounted() {
    this.fetchData();
  },
};
</script>