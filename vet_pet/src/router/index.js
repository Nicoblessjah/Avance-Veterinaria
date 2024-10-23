import { createRouter, createWebHistory } from 'vue-router';
import InicioAdmin from '@/views/inicio_admin.vue';
import RegistroVet from '@/views/registro_vet_admin.vue';
import PacientedAdmin from '@/views/pacientes_admin.vue';
import UsuariosAdmin from '@/views/usuarios_admin.vue';
import CerrarSesion from '@/views/VentLogin.vue';

import VentLogin from '@/views/VentLogin.vue';
import VentNosotros from '@/views/VentNosotros.vue'; 
import InicioCliente from '@/views/InicioCliente.vue';
import RegistrarUsuario from '@/views/RegistrarUsuario.vue';
import EditarMascotaCliente from '@/views/EditarMascotaCliente.vue';
import EditarPerfilCliente from '@/views/EditarPerfilCliente.vue';
import PerfilCliente from '@/views/PerfilCliente.vue';
import MascotaCliente from '@/views/MascotaCliente.vue';
import EditarUsuario from '@/views/editar_usuario_admin.vue';
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
    { path: '/editar', name: 'Editar', component: EditarUsuario },

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
