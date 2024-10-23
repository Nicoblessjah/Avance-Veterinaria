<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BarraCliente from '@/components/BarraCliente.vue';

const nombre = ref('');
const fechaNacimiento = ref('');
const especie = ref('');
const raza = ref('');
const peso = ref('');
const sexo = ref('');
const alergias = ref('');
const errores = ref([]);


const router = useRouter();

const fetchCounts = async () => {
  try {
    const pacientesResponse = await fetch('http://localhost:3000/pacientes');
    const pacientesData = await pacientesResponse.json();
    return pacientesData.length; 
  } catch (error) {
    console.error('Error fetching counts:', error);
    return 0; 
  }
};

const registrarPacientes = async () => {
  errores.value = [];
  const conteoPacientes = await fetchCounts();
  const nuevoID = conteoPacientes ? conteoPacientes + 1 : 1;

  const usuario = JSON.parse(localStorage.getItem('user'));
  

  const nuevoPacientes = {
    id: `${nuevoID}`,
    clienteid: usuario.id, 
    nombre: nombre.value,
    fechaNacimiento: fechaNacimiento.value,
    especie: especie.value,
    raza: raza.value,
    peso: peso.value,
    sexo: sexo.value,
    alergias: alergias.value,
    estado: 'Atendido'
  };

  try {
    const response = await axios.post('http://localhost:3000/pacientes', nuevoPacientes);

    if (response.status === 201) {
      alert('Mascota registrada exitosamente');
      router.push('/MascotaCliente');
    }
  } catch (error) {
    console.error('Error al registrar la mascota:', error);
    alert('Error al registrar la mascota');
  }
};
</script>


<template>
  <BarraCliente/>
  <main>
    <form @submit.prevent="registrarPacientes">
      <div class="form-section">
        <h2>Datos de la mascota</h2>
        <div class="form-columns">
          <div class="form-column">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input type="text" id="nombre" v-model="nombre" required>
            </div>
            <div class="form-group">
              <label for="fechaNacimiento">Fecha Nacimiento</label>
              <input type="text" id="fechaNacimiento" v-model="fechaNacimiento" required>
            </div>
            <div class="form-group">
                <label for="userEspecie">Especie</label>
                <select v-model="especie">
                    <option value="Felino">Felino</option>
                    <option value="Canino">Canino</option>
                    <option value="Otro">Otro</option>
                  </select>
            </div>
            <div class="form-group">
              <label for="raza">Raza</label>
              <input type="text" id="raza" v-model="raza" required>
            </div>
            <div class="form-group">
              <label for="peso">Peso </label>
              <input type="number" id="peso" v-model="peso" required>
            </div>
          </div>
          <div class="form-column">
            <div class="form-group">
                <label for="pacienteSexo">Sexo</label>
                <select v-model="sexo">
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
            </div>
            <div class="form-group">
              <label for="alergias">Alergias</label>
              <input type="text" id="alergias" v-model="alergias" required>
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
        <router-link to="/MascotaCliente" class="button cancelar-btn">Cancelar</router-link>
      </div>
    </form>
  </main>

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
    margin-top: 80px;
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
