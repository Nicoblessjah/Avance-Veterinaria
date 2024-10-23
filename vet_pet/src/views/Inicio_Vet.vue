<script setup>
import SideBarVet from '@/components/SideBarVet.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const pacientes = ref([]);
const citas = ref([]);
const usuarios = ref([]);


const totalVeterinarios = ref(0);

const fetchData = async () => {
  try {
    // Obtener citas, pacientes y usuarios simultáneamente
    const [citasResponse, pacientesResponse, usuariosResponse] = await Promise.all([
      axios.get('http://localhost:3000/citas'),
      axios.get('http://localhost:3000/pacientes'),
      axios.get('http://localhost:3000/usuarios'),
    ]);

    citas.value = citasResponse.data;
    pacientes.value = pacientesResponse.data;
    usuarios.value = usuariosResponse.data;

    contarUsuariosPorRol();
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};


const contarUsuariosPorRol = () => {
  totalVeterinarios.value = usuarios.value.filter((u) => u.rol === 2).length;
};

const getPaciente =(pacienteid) =>{
    const paciente = pacientes.value.find((u)=>u.id == pacienteid);
    return  paciente ? `${paciente.nombre}`: 'Desconocido';
}
const getPacienteEstado =(pacienteid) =>{
    const paciente = pacientes.value.find((u)=>u.id == pacienteid);
    return  paciente ? `${paciente.estado}`: 'Desconocido';
}

onMounted(fetchData);
</script>

<template>
  <SideBarVet />

  <main>
    <h2>Inicio</h2>
    <div class="dashboard">
      <div class="summary">
        <div class="summary-card">
          <div class="card-icon">
            <i class="fas fa-user-md"></i>
          </div>
          <div class="card-info">
            <h3>Veterinarios</h3>
            <p>{{ totalVeterinarios }}</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon">
            <i class="fas fa-user"></i>
          </div>
          <div class="card-info">
            <h3>Pacientes</h3>
            <p>{{ pacientes.length }}</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon">
            <i class="fas fa-paw"></i>
          </div>
          <div class="card-info">
            <h3>Citas</h3>
            <p>{{ citas.length }}</p>
          </div>
        </div>
      </div>

      <div class="appointments-today">
        <h3>Citas Hoy</h3>
        <table>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cita in citas" :key="cita.id">
              <td>{{ cita.hora }}</td>
              <td>{{ getPaciente(cita.pacienteid) }}</td>
              <td>{{ getPacienteEstado(cita.pacienteid) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<style>
.summary {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
}

.card {
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 150px;
    text-align: center;
    padding: 20px;
}

.card-icon {
    font-size: 2em;
    margin-bottom: 10px;
    color: #4285f4;
}

.card-info h3 {
    font-size: 1.2em;
    margin: 0;
    font-weight: bold;
}

.card-info p {
    font-size: 1.5em;
    margin: 5px 0 0;
    font-weight: bold;
    color: #333;
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

.dashboard {
    margin-top: 30px;
}

.summary {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
}

.summary-card {
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 200px;
    text-align: center;
    padding: 20px;
    flex: 1;
    min-width: 150px;
}

.card-icon {
    font-size: 2.5em;
    margin-bottom: 10px;
    color: #4285f4;
}

.card-info h3 {
    font-size: 1.2em;
    margin: 0;
    font-weight: bold;
}

.card-info p {
    font-size: 1.5em;
    margin: 5px 0 0;
    font-weight: bold;
    color: #333;
}

.appointments-today {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.appointments-today h3 {
    font-family: 'Poppins', sans-serif;
    margin-bottom: 20px;
    text-align: center;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table th,
table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
}

table th {
    background-color: #4285f4;
    color: white;
    font-weight: bold;
}

table td {
    background-color: #fff;
}

table tr:nth-child(even) {
    background-color: #f2f2f2;
}

.estado-pendiente {
    background-color: #ffffff;
    color: #333;
    border-radius: 5px;
    padding: 5px;
}

.estado-atendido {
    background-color: #ffffff;
    color: #333333;
    border-radius: 5px;
    padding: 5px;
}

.estado-pendiente i {
    color: #ffcd16;
    margin-left: 5px;
}

.estado-atendido i {
    color: #2ecc71;
    margin-left: 5px;
}
</style>