<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SideBar from '@/components/SideBarAdmin.vue';

const route = useRoute();
const router = useRouter();
const userId = route.query.id; // obtener el ID del usuario de la URL

const usuario = ref({
  id: '',
  nombre: '',
  apellido: '',
  run: '',
  email: '',
  telefono: ''
});

// cargar los datos del usuario desde db.json
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/usuarios');
    const usuarios = await response.json();
    const usuarioEncontrado = usuarios.find(user => user.id === userId);
    if (usuarioEncontrado) {
      usuario.value = usuarioEncontrado;
    }
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
  }
});

const guardarCambios = async () => {
  try {
    const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario.value)
    });

    if (response.ok) {
      // redirigir a la lista de usuarios después de guardar
      router.push('/usuarios_admin.html');
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
  name: 'EditarUsuario',
};
</script>

<template>
  <body>
  <SideBar />
  <main>
    <h2>Editar Usuario</h2>
    <form id="editUserForm" @submit.prevent="guardarCambios">
      <div class="form-group">
        <label for="userName">Nombre</label>
        <input type="text" id="userName" v-model="usuario.nombre" required />
      </div>
      <div class="form-group">
        <label for="userLastName">Apellido</label>
        <input type="text" id="userLastName" v-model="usuario.Apellido" required />
      </div>
      <div class="form-group">
        <label for="userRun">RUN</label>
        <input type="text" id="userRun" v-model="usuario.run" required />
      </div>
      <div class="form-group">
        <label for="userEmail">Correo</label>
        <input type="email" id="userEmail" v-model="usuario.email" required />
      </div>
      <div class="form-group">
        <label for="userPhone">Teléfono</label>
        <input type="text" id="userPhone" v-model="usuario.telefono" required />
      </div>
      <div class="form-buttons">
        <router-link :to="{ path: '/usuarios'}" class="save-btn">Guardar</router-link>
        <router-link :to="{ path: '/usuarios'}" class="cancel-btn">Cancelar</router-link>
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

a {
  text-decoration: none;
  color: inherit;
}

</style>