<template>
    <SideBarVet/>

    <main>
        <h2>Editar Paciente</h2>
        <form id="editUserForm" @submit.prevent="actualizarPaciente">
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
            <div class="form-group">
                <label for="userEstado">Estado</label>
                <select v-model="paciente.estado">
                    <option value="Hora reservada">Hora reservada</option>
                    <option value="En atención">En atención</option>
                    <option value="Recuperación">Recuperación</option>
                    <option value="De alta">De alta</option>
                    <option value="Atendido">Atendido</option>
                </select>
            </div>
            <div class="form-buttons">
                <button type="submit" class="save-btn">Guardar</button>
                <router-link to="/PacientesVet"><button type="button" class="cancel-btn">Cancelar</button></router-link>
            </div>
        </form>
    </main>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SideBarVet from '@/components/SideBarVet.vue'


export default {
    components: {
    SideBarVet 
  },
    name: 'EditarPacienteVet',
    props: ['id'],
    setup(props) {
        
        const paciente = ref({});
        const router = useRouter();

        const fetchPaciente = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pacientes/${props.id}`);
            paciente.value = response.data;
        } catch (error) {
            console.error("Error al obtener el paciente:", error);
        }
        };

        const actualizarPaciente = async () => {
        try {
            await axios.put(`http://localhost:3000/pacientes/${paciente.value.id}`, paciente.value);
            alert("Paciente actualizado exitosamente!");
            router.push({ name:'PacientesVet'});
            
        } catch (error) {
            console.error("Error al actualizar el paciente:", error);
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

<style>

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
</style>