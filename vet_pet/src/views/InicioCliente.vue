<script setup>
import PiePagina from '@/components/PiePagina.vue'; 
import BarraCliente from '@/components/BarraCliente.vue'; 
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Variables reactivas
const usuario = ref(null);
const mascotas = ref([]);      // Guardará los datos de las mascotas
const citas = ref([]);         // Guardará los datos de las citas

// Obtener usuario de localStorage
const obtenerUsuario = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  usuario.value = user;
};

// Función para obtener mascotas y citas del usuario
const obtenerDatosDelUsuario = async () => {
  if (usuario.value && usuario.value.id) {
    try {
      // Ajustar las peticiones para usar "clienteid" en lugar de "usuarioId"
      const [mascotasResponse, citasResponse] = await Promise.all([
        axios.get(`http://localhost:3000/pacientes?clienteid=${usuario.value.id}`), 
        axios.get(`http://localhost:3000/citas?clienteid=${usuario.value.id}`),     
      ]);

      // Asignar los datos obtenidos
      mascotas.value = mascotasResponse.data;
      citas.value = citasResponse.data;
    } catch (error) {
      console.error('Error al obtener las mascotas o citas:', error);
    }
  }
};

// Función para obtener el nombre de la mascota basado en el id
const getPaciente = (pacienteId) => {
  const paciente = mascotas.value.find((m) => m.id == pacienteId);
  return paciente ? paciente.nombre : 'Desconocido';
};

// Función para obtener la especie de la mascota basado en el id
const getEspecie = (pacienteId) => {
  const paciente = mascotas.value.find((m) => m.id == pacienteId);
  return paciente ? paciente.especie : 'Desconocido';
};

// Llamadas al montar el componente
onMounted(() => {
  obtenerUsuario();            
  obtenerDatosDelUsuario();     
});
</script>

<template>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <BarraCliente />
    <main>
        <div class="dashboard">
            <div class="summary">
                <div class="summary-card">
                    <div class="card-icon">
                        <i class="fas fa-paw"></i>
                    </div>
                    <div class="card-info">
                        <h3>Mascotas</h3>
                        <p>{{ mascotas.length }}</p>
                    </div>
                </div>  
                <div class="summary-card">
                    <div class="card-icon">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="card-info">
                        <h3>Citas Reservadas</h3>
                        <p>{{ citas.length }}</p>
                    </div>
                </div>
            </div>
            <div class="appointments-today">
                <h3>Reservaciones Realizadas</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Nombre Mascota</th>
                            <th>Especie</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cita in citas" :key="cita.id">
                            <td>{{ cita.fecha }}</td>
                            <td>{{ cita.hora }}</td>
                            <td>{{ getPaciente(cita.pacienteid) }}</td> <!-- Mostrar el nombre de la mascota -->
                            <td>{{ getEspecie(cita.pacienteid) }}</td> <!-- Mostrar la especie de la mascota -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    <PiePagina />
</template>



<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

*{
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
    align-items: center;
    height: 80vh;
    margin: 0;
}

.image-container {
    display: flex;
    gap: 50px;
}

.image-item {
    text-align: center; 
}

.image-container img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border: 2px solid #ddd;
    border-radius: 8px;
    transition: transform 0.3s ease;
    opacity: .5;
}

.image-container img:hover {
    transform: scale(1.08);
    opacity: 1;
}

.image-item h2 {
    margin: 10px 0 0; 
    font-family: 'Poppins', sans-serif;
    font-size: 1em;
    color: #333;
}
  
  .link-title {
    transform: translateX(100%);
    transition: transform 0.2s ease-in;
    transform-origin: center right;
    display: block;
    text-align: center;
    text-indent: 28px;
    width: 100%;
  }
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
    width: 800px;
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
</style>