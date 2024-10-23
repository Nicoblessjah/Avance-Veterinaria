<script setup>
import { ref, onMounted } from 'vue';
import SideBar from '@/components/SideBarAdmin.vue';

const usuariosCount = ref(0);
const veterinariosCount = ref(0);
const pacientesCount = ref(0);

async function fetchCounts() {
  try {
    const usuariosResponse = await fetch('http://localhost:3000/usuarios');
    const usuariosData = await usuariosResponse.json();
    console.log('Usuarios Data:', usuariosData);

    usuariosCount.value = usuariosData.length;
    console.log('Total Usuarios:', usuariosCount.value);

    veterinariosCount.value = usuariosData.filter(usuario => usuario.rol === 2).length;
    console.log('Total Veterinarios:', veterinariosCount.value);

    const adminsYClientesCount = usuariosData.filter(usuario => usuario.rol === 1 || usuario.rol === 3).length;

    usuariosCount.value += adminsYClientesCount;
    console.log('Total Usuarios después de agregar admins y clientes:', usuariosCount.value);

    const pacientesResponse = await fetch('http://localhost:3000/pacientes');
    const pacientesData = await pacientesResponse.json();
    console.log('Pacientes Data:', pacientesData);

    pacientesCount.value = pacientesData.length;
    console.log('Total Pacientes:', pacientesCount.value);

  } catch (error) {
    console.error('Error fetching counts:', error);
  }
}

onMounted(fetchCounts);
</script>

<template>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
  </head>
  <body>
  <SideBar/>
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
            <p>{{ veterinariosCount }}</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon">
            <i class="fas fa-paw"></i>
          </div>
          <div class="card-info">
            <h3>Pacientes</h3>
            <p>{{ pacientesCount }}</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon">
            <i class="fas fa-user"></i>
          </div>
          <div class="card-info">
            <h3>Usuarios</h3>
            <p>{{ usuariosCount }}</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon">
            <i class="fas fa-calendar-check"></i>
          </div>
          <div class="card-info">
            <h3>Citas Mañana</h3>
            <p>20</p>
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
          <tr>
            <td>10:00 AM</td>
            <td>Fido</td>
            <td class="estado-pendiente">Pendiente <i class="fas fa-clock"></i></td>
          </tr>
          <tr>
            <td>11:30 AM</td>
            <td>Whiskers</td>
            <td class="estado-pendiente">Pendiente <i class="fas fa-clock"></i></td>
          </tr>
          <tr>
            <td>02:00 PM</td>
            <td>Rex</td>
            <td class="estado-atendido">Atendido <i class="fas fa-check-circle"></i></td>
          </tr>
          <tr>
            <td>02:00 PM</td>
            <td>Rex</td>
            <td class="estado-atendido">Atendido <i class="fas fa-check-circle"></i></td>
          </tr>
          <tr>
            <td>02:00 PM</td>
            <td>Rex</td>
            <td class="estado-atendido">Atendido <i class="fas fa-check-circle"></i></td>
          </tr>
          <tr>
            <td>02:00 PM</td>
            <td>Rex</td>
            <td class="estado-atendido">Atendido <i class="fas fa-check-circle"></i></td>
          </tr>
          <tr>
            <td>02:00 PM</td>
            <td>Rex</td>
            <td class="estado-atendido">Atendido <i class="fas fa-check-circle"></i></td>
          </tr>
          <tr>
            <td>02:00 PM</td>
            <td>Rex</td>
            <td class="estado-atendido">Atendido <i class="fas fa-check-circle"></i></td>
          </tr>
          <tr>
            <td>02:00 PM</td>
            <td>Rex</td>
            <td class="estado-atendido">Atendido <i class="fas fa-check-circle"></i></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
  </body>
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