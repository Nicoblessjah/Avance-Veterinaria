<script setup>
import PiePagina from '@/components/PiePagina.vue'; 
import BarraCliente from '@/components/BarraCliente.vue'; 


function confirmDelete() {
    if (confirm("¿Estás seguro de que deseas borrar este usuario?")) {
      
        const usuario = JSON.parse(localStorage.getItem('user'));

       
        fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                
                window.location.href = '/';
            } else {
                alert('Error al borrar el usuario.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al borrar el usuario.');
        });
    }
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
        <div class="container">
            <table>
                <tbody>
                    <tr>
                        <td><strong>Nombre:</strong></td>
                        <td> {{ usuario.nombre }}</td>
                    </tr>
                    <tr>
                        <td><strong>Apellido:</strong></td>
                        <td> {{ usuario.apellido }}</td>
                    </tr>
                    <tr>
                        <td><strong>RUN:</strong></td>
                        <td> {{ usuario.run }}</td>
                    </tr>
                    <tr>
                        <td><strong>Correo:</strong></td>
                        <td>{{ usuario.email }}</td>
                    </tr>
                    <tr>
                        <td><strong>Teléfono:</strong></td>
                        <td>{{ usuario.telefono }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="form-buttons">
    <router-link 
        to="/" 
        class="delete-btn" 
        @click.prevent="if(confirmDelete()) { $router.push('/'); }">
        Borrar Usuario
    </router-link>

    <router-link 
        to="/EditarPerfil" 
        class="edit-btn"
    >
        Editar Perfil
    </router-link>
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

table[data-v-29e5a7c4]{
    border-collapse: collapse;
    border: none;
}

main {
    display:flex;
    align-content: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 900px;
    padding: 20px;
}
h2 {
    margin-top: 50px;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    text-align: center;
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

  form {
    max-width: 600px;
    margin: 0 auto;
    padding: 18px;
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

a { /* Elimina el subrayado de todos los enlaces */
    text-decoration: none;
    color: inherit;
}

.container {
    align-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 100%;
    height: 100%;
    margin-top: 150px;
    max-width: 800px;
}
table {
    width: 100%;
    border-collapse: collapse;
}
td, th {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}
.form-buttons {
    font-family: 'Poppins', sans-serif; 
    text-align: center;
    margin-top: 20px;
}
.form-buttons button, .form-buttons a {
    margin-top: 6%;
    padding: 10px 20px;
    text-decoration: none;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.delete-btn {
    background-color: #ff5252;
}
.edit-btn {
    background-color: #4c90fd;
}
.edit-btn:hover, .delete-btn:hover {
    opacity: 0.8;
}
</style>