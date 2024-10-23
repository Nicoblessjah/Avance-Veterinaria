<script setup>
import BarraCliente from '@/components/BarraCliente.vue';
import PiePagina from '@/components/PiePagina.vue';
import { ref, onMounted,computed } from 'vue';
import axios from 'axios';
import Datepicker from '@vuepic/vue-datepicker'; 
import '@vuepic/vue-datepicker/dist/main.css'; 

const pacientes = ref([]);
const usuarioLogueado = ref(null); // Almacena el usuario logueado

// Objeto de reserva
const nuevaReserva = ref({
  clienteid: null, // Se llenará con el ID del usuario logueado
  pacienteid: null,
  fecha: '',
  hora: '',
});

const obtenerUsuarioLogueado = () => {
  const usuario = JSON.parse(localStorage.getItem('user'));
  if (usuario) {
    usuarioLogueado.value = usuario;
    nuevaReserva.value.clienteid = usuario.id;
  }
};
const fetchPacientes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/pacientes');
    const usuario = JSON.parse(localStorage.getItem('user'));
    pacientes.value = response.data.filter(paciente => paciente.clienteid === usuario.id);
  } catch (error) {
    console.error('Error al obtener los pacientes:', error);
  }
};
const horasDisponibles = computed(() => {
  const horas = [];
  for (let i = 8; i < 17; i++) {
    const horaInicio = `${String(i).padStart(2, '0')}:00`;
    const horaFin = `${String(i + 1).padStart(2, '0')}:00`;
    horas.push(`${horaInicio} - ${horaFin}`);
  }
  return horas;
});

// Registrar la reserva
const registrarReserva = async () => {
  const [horaInicio] = nuevaReserva.value.hora.split(' - '); 
  const reserva = {
    ...nuevaReserva.value,
    hora: horaInicio,
  };
  try {
    await axios.post('http://localhost:3000/citas', reserva);
    alert('Reserva creada exitosamente!');
    limpiarFormulario();
  } catch (error) {
    console.error('Error al registrar la reserva:', error);
  }
};

const limpiarFormulario = () => {
  nuevaReserva.value = {
    clienteid: usuarioLogueado.value.id, 
    pacienteid: null,
    fecha: '',
    hora: '',
  };
};

onMounted(() => {
  obtenerUsuarioLogueado(); 
  fetchPacientes();
});
</script>

<template>
  <div class="container">
    <BarraCliente />
    <main>
      <h1>Reserva de Atención</h1>
      <form @submit.prevent="registrarReserva">
        <div class="form-section">
          <h2>Selecciona un paciente</h2>
          <div class="form-group">
            <label for="paciente">Paciente</label>
            <select v-model="nuevaReserva.pacienteid" required>
              <option disabled value="">Selecciona un paciente</option>
              <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.id">
                {{ paciente.nombre }}
              </option>
            </select>
          </div>

          <h2>Selecciona Fecha y Hora</h2>
          <div class="form-fecha">
            <label for="fecha">Fecha</label>
            <Datepicker v-model="nuevaReserva.fecha" :format="'yyyy-MM-dd'" />
          </div>

          <div class="form-group">
            <label for="hora">Hora</label>
            <select v-model="nuevaReserva.hora" required>
              <option disabled value="">Selecciona una hora</option>
              <option v-for="hora in horasDisponibles" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn-registrar">Registrar Reserva</button>
        </div>
      </form>
    </main>
    <PiePagina />
  </div>
</template>


<script>
export default {
  name: 'reservacion_hora_cliente',
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Hace que el contenedor ocupe al menos toda la altura de la ventana */
}


header {
  height: 80px;
  padding: 1px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #AECBFA;
}
footer {
  background-color: #AECBFA;
  position: relative; /* Cambiar a relativo o eliminar la propiedad */
  text-align: center;
  width: 100%;
  height: 60px;
  margin-top: auto; /* Esto asegura que el footer esté al final */
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.veterinaria-nombre {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2em;
  color: #333;
}

.veterinaria-nombre strong {
  color: #4285f4;
}

.cerrar-sesion {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.cerrar-sesion:hover {
  background-color: #ff5252;
}

nav {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

nav ul {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin: 0 10px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #e9ecef;
}


/* Estilos del contenido principal */
main {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 20px;
}

h2 {
  font-family: 'Poppins', sans-serif;
  margin-bottom: 20px;
}

/* Estilos del formulario */
form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}
.form-fecha{
  align-content: left;
}

.form-section {
  margin-bottom: 30px;

}

.form-columns {
  display: flex;
  gap: 60px;
}

.form-column {
  flex: 1;
}

.form-group {
  margin-bottom: 15px;
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
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
}

.form-group:has(input[type="number"]) {
  position: relative;
}

.form-group input[type="number"] {
  padding-right: 30px;
}

.unit {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
  font-size: 0.9em;
  pointer-events: none;
}

.submit-btn {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin: 0 auto;
  font-weight: bold;
  transition: background-color 0.3s ease;
  font-family: 'Inter', sans-serif;
}

.submit-btn:hover {
  background-color: #3367d6;
}

/* Responsive design */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: flex-start;
  }

  nav {
    margin-top: 10px;
    justify-content: flex-start;
  }

  .cerrar-sesion {
    margin-top: 10px;
    align-self: flex-start;
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
  }

  input, select {
    width: 100%;
  }
}

.link {
  font-family: 'Poppins', sans-serif;
  font-size: small;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 40px;
  border-radius: 99em;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transform-origin: center left;
  transition: width 0.2s ease-in;
  text-decoration: none;
  color: inherit;
}
.link:before {
  position: absolute;
  z-index: -1;
  content: "";
  display: block;
  border-radius: 99em;
  width: 100%;
  height: 100%;
  top: 0;
  transform: translateX(100%);
  transition: transform 0.2s ease-in;
  transform-origin: center right;
  background-color: #eee;
}
.link:hover, .link:focus {
  outline: 0;
  width: 130px;
}
.link:hover:before,
.link:hover .link-title, .link:focus:before,
.link:focus .link-title {
  transform: translateX(0);
  opacity: 1;
}

.link-icon {
  width: 28px;
  height: 28px;
  display: block;
  flex-shrink: 0;
  left: 18px;
  position: absolute;
}
.link-icon svg {
  width: 28px;
  height: 28px;
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

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.btn-registrar {
  background-color: #4285f4;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
  max-width: 200px;
  width: 100%;
}

.btn-registrar:hover {
  background-color: #3367d6;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>