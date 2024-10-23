<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import PiePagina from '@/components/PiePagina.vue'; 
import BarraCliente from '@/components/BarraCliente.vue';

export default {
    components: {
        PiePagina, 
        BarraCliente
  },
    name: 'EditarMascotaCliente',
    props: ['id'],
    setup(props) {
        
        const paciente = ref({});
        const router = useRouter();

        const fetchPaciente = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pacientes/${props.id}`);
            paciente.value = response.data;
        } catch (error) {
            console.error("Error al obtener tu mascota:", error);
        }
        };

        const actualizarPaciente = async () => {
        try {
            await axios.put(`http://localhost:3000/pacientes/${paciente.value.id}`, paciente.value);
            alert("tu Mascota ha sido actualizada exitosamente!");
            router.push({ name:'MascotaCliente'});
            
        } catch (error) {
            console.error("Error al actualizar tu Mascota:", error);
        }
        };

        onMounted(fetchPaciente);

        return {
        paciente,
        actualizarPaciente,
        };
    },
};
</script>
<template>
    <BarraCliente />
    <main>
        <h2>Editar mi Mascota</h2>
        <form id="editUserForm" @submit.prevent="actualizarPaciente">
            <div class="image-upload">
                <img id="imagePreview" src="img/default-image.png" alt="Imagen del Paciente" class="preview-img">
                <input type="file" id="userImage" name="userImage" accept="image/*">
                <button type="button" id="editImageBtn" class="edit-image-btn">Editar Imagen</button>
            </div>
            <div class="form-group">
                <label for="userName">Nombre</label>
                <input v-model="paciente.nombre" type="text" required />
            </div>
            <div class="form-group">
                <label for="userNacimiento">Fecha de nacimiento</label>
                <input v-model="paciente.fechaNacimiento" type="text" required />
            </div>
            <div class="form-group">
                <label for="userEspecie">Especie</label>
                <select v-model="paciente.especie">
                    <option value="Felino">Felino</option>
                    <option value="Canino">Canino</option>
                    <option value="Otro">Otro</option>
                  </select>
            </div>
            <div class="form-group">
                <label for="userRaza">Raza</label>
                <input v-model="paciente.raza" type="text" required />
            </div>
            <div class="form-group">
                <label for="pacienteSexo">Sexo</label>
                <select v-model="paciente.sexo">
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
            </div>
            <div class="form-buttons">
                <button type="submit" class="save-btn">Guardar</button>
                <router-link to="/MascotaCliente" class="cancel-btn">Cancelar</router-link>
            </div>
        </form>
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

main {
    font-family: 'Poppins', sans-serif;
}
  h2 {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    margin-top: 70px;
    margin-bottom: 10px;
}

form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 65px;
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

select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
}

.image-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    padding: 20px;
    border: 2px solid #ddd;
    border-radius: 10px;
    background-color: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.preview-img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
}

#userImage {
    display: none;
}

.edit-image-btn {
    background-color: #3bce35;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.edit-image-btn:hover {
    background-color: #2a9826;
}
</style>