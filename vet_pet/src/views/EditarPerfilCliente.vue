<script setup>
import PiePagina from '@/components/PiePagina.vue'; 
import BarraCliente from '@/components/BarraCliente.vue'; 

function saveUser() {
    const usuario = JSON.parse(localStorage.getItem('user'));
    // Obtener los nuevos valores del formulario
    usuario.nombre = document.getElementById('userName').value;
    usuario.apellido = document.getElementById('userLastName').value;
    usuario.run = document.getElementById('userRun').value;
    usuario.email = document.getElementById('userEmail').value;
    usuario.telefono = document.getElementById('userPhone').value;

    // Actualizar en el localStorage
    localStorage.setItem('user', JSON.stringify(usuario));

    // Hacer una solicitud PUT a JSON Server para actualizar el usuario
    fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
    .then(response => {
        if (response.ok) {
            // Redirigir a la página de perfil
            window.location.href = '/Perfil';
        } else {
            alert('Error al guardar los cambios.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al guardar los cambios.');
    });
}

</script>
<script>
export default {
  data() {
    return {
      usuario: null
    };
  },
  created() {
    const usuario = JSON.parse(localStorage.getItem('user'));
    this.usuario = usuario; 
  }
};
</script>

<template>
    <BarraCliente />
    <main>
        <h2>Editar mi Perfil</h2>
        <form id="editUserForm">
            <div class="form-group">
                <label for="userName">Nombre</label>
                <input type="text" id="userName" name="userName" v-model="usuario.nombre">
            </div>
            <div class="form-group">
                <label for="userLastName">Apellido</label>
                <input type="text" id="userLastName" name="userLastName"  v-model="usuario.apellido">
            </div>
            <div class="form-group">
                <label for="userRun">RUN</label>
                <input type="text" id="userRun" name="userRun" v-model="usuario.run">
            </div>
            <div class="form-group">
                <label for="userEmail">Correo</label>
                <input type="email" id="userEmail" name="userEmail" v-model="usuario.email">
            </div>
            <div class="form-group">
                <label for="userPhone">Teléfono</label>
                <input type="text" id="userPhone" name="userPhone" v-model="usuario.telefono">
            </div>
            <div class="form-buttons">
                <button 
                    type="button" 
                    class="save-btn" 
                    @click="saveUser">
                    Guardar
                </button>
            <button 
            type="button" 
            class="cancel-btn" 
                @click="$router.push('/Perfil')"
                >
            Cancelar
    </button>
</div>

        </form>
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

h2 {
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 80px;
}
form {
    max-width: 600px;
    margin: 0 auto;
    padding: 18px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.form-group {
    margin-bottom: 10px;
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
a { /* Elimina el subrayado de todos los enlaces */
    text-decoration: none;
    color: inherit;
}
</style>
