import { createRouter, createWebHistory } from 'vue-router';
import InicioAdmin from '@/views/InicioAdmin.vue';
import RegistroVet from '@/views/RegistroVetAdmin.vue';
import PacientedAdmin from '@/views/PacientesAdmin.vue';
import UsuariosAdmin from '@/views/UsuariosAdmin.vue';
import CerrarSesion from '@/views/VentLogin.vue';
import EditarPaciente from '@/views/EditarPacienteAdmin.vue';

import VentLogin from '@/views/VentLogin.vue';
import VentNosotros from '@/views/VentNosotros.vue'; 
import InicioCliente from '@/views/InicioCliente.vue';
import RegistrarUsuario from '@/views/RegistrarUsuario.vue';
import EditarMascotaCliente from '@/views/EditarMascotaCliente.vue';
import EditarPerfilCliente from '@/views/EditarPerfilCliente.vue';
import PerfilCliente from '@/views/PerfilCliente.vue';
import MascotaCliente from '@/views/MascotaCliente.vue';
import EditarUsuario from '@/views/EditarUsuarioAdmin.vue';
import reservacion_hora_cliente from '@/views/reservacion_hora_cliente.vue';

import Inicio_Vet from '@/views/Inicio_Vet.vue';
import Pacientes_vet from '@/views/pacientes_vet.vue';
import AgendaVet from '@/views/AgendaVet.vue';
import EditarPacienteVet from '@/views/EditarPacienteVet.vue';


const routes = [
    { path: '/InicioAdmin', name: 'Inicio', component: InicioAdmin },
    { path: '/registro', name: 'Registro', component: RegistroVet },
    { path: '/pacientes', name: 'Pacientes', component: PacientedAdmin },
    { path: '/usuarios', name: 'Usuarios', component: UsuariosAdmin },
    { path: '/cerrar', name: 'Cerrar', component: CerrarSesion },
    { path: '/editarusuario', name: 'EditarUsuario', component: EditarUsuario },
    { path: '/editarpaciente', name: 'EditarPaciente', component: EditarPaciente },

    { path: '/InicioCliente', name: 'InicioCliente', component: InicioCliente },
    { path: '/', name: 'Login', component: VentLogin },
    { path: '/Nosotros', name: 'Nosotros', component: VentNosotros },
    { path: '/Registrarse', name: 'Registrar', component: RegistrarUsuario },
    { path: '/EditarMascota', name: 'EditarMascota', component: EditarMascotaCliente },
    { path: '/EditarPerfil', name: 'EditarPerfil', component: EditarPerfilCliente },
    { path: '/Perfil', name: 'Perfil', component: PerfilCliente },
    { path: '/MascotaCliente', name: 'MascotaCliente', component: MascotaCliente },
    { path: '/reservacion_hora_cliente', name: 'reservacion_hora_cliente', component: reservacion_hora_cliente },

    { path: '/InicioVet', name: 'InicioVet', component: Inicio_Vet},
    { path: '/PacientesVet', name: 'PacientesVet' , component: Pacientes_vet},
    { path: '/AgendaVet', name: 'AgendaVet' , component: AgendaVet},
    { path: '/EditarPacienteVet/:id', name: 'EditarPacienteVet', component:EditarPacienteVet, props: true},


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
