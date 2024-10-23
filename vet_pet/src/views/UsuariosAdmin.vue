<script setup>
import { ref, onMounted } from 'vue';
import SideBar from '@/components/SideBarAdmin.vue';

const usuarios = ref([]);

const cargarUsuarios = async () => {
  try {
    const response = await fetch('http://localhost:3000/usuarios');
    usuarios.value = await response.json();
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
  }
};

const borrarUsuario = async (id) => {
  if (confirm('¿Estás seguro de que deseas borrar este usuario?')) {
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // actualiza la lista de usuarios después de borrar
        usuarios.value = usuarios.value.filter(usuario => usuario.id !== id);
        alert('Usuario borrado con éxito.');
      } else {
        console.error('Error al borrar el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al borrar el usuario:', error);
    }
  }
};

// cargar usuarios al montar el componente
onMounted(() => {
  cargarUsuarios();
});
</script>

<template>
  <div>
    <SideBar />
    <main>
      <div class="table-container">
        <h2 class="table-title">Lista de Usuarios</h2>
        <table class="user-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>RUN</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td class="truncate">{{ usuario.id }}</td>
            <td class="truncate">{{ usuario.nombre }}</td>
            <td class="truncate">{{ usuario.apellido }}</td>
            <td class="truncate">{{ usuario.run }}</td>
            <td class="truncate">{{ usuario.email }}</td>
            <td class="truncate">{{ usuario.telefono }}</td>
            <td class="truncate">{{ usuario.rol }}</td>
            <td>
              <router-link :to="{ path: '/editarusuario', query: { id: usuario.id } }" class="edit-btn">Editar</router-link>
              <button @click="borrarUsuario(usuario.id)" class="delete-btn">Borrar</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
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
  color: inherit;
}
</style>
