<script setup>
import PiePagina from '@/components/PiePagina.vue'; 
import BarraCliente from '@/components/BarraCliente.vue'; 
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
        <h2>NOSOTROS</h2>
        <p>En nuestra clínica veterinaria, ubicada en el corazón de Temuco en la calle Francisco Salazar 1145, nos dedicamos con pasión al cuidado de tus mascotas desde el 20 de junio de 2022. Atendemos tanto a perros como a gatos, ofreciendo una amplia gama de servicios que incluyen cirugías, vacunaciones, y todo lo esencial para asegurar su bienestar. Nos enorgullecemos de brindar una atención cálida y personalizada, en un entorno seguro y acogedor, donde tratamos a cada mascota como si fuera parte de nuestra propia familia. Nuestro equipo de profesionales está comprometido con la salud y felicidad de tus compañeros, asegurando que reciban el mejor cuidado posible. Ven a visitarnos y descubre un lugar donde la salud de tu mascota es nuestra prioridad.</p>
        <br><br>
        <div class="iconoscontacto">
            <span class="link-icon-contacto">
                <!-- icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>                  
                <!-- /icon -->
            </span>
            <span class="datos">+569 56413578</span>  
            <span class="link-icon-contacto">
                <!-- icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>                                
                <!-- /icon -->
            </span>
            <span class="datos">vet.petvida@gmail.com</span>
        </div>

        <section class="contacto">
            <h1>Contacto</h1>
            <p>Puedes ponerte en contacto con nosotros mediante el siguiente formulario.</p>
            <form action="#" method="POST" class="formulario-contacto">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
    
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
    
                <label for="mensaje">Mensaje:</label>
                <textarea id="mensaje" name="mensaje" rows="5" required></textarea>
    
                <button 
            type="Summit" 
            class="cancel-btn" 
                @click="$router.push('/Nosotros')"
                >
            Enviar
    </button>
            </form>
        </section>
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

.formulario-contacto{
    background-color: #ffffff; /* Fondo blanco */
    border: none;              /* Sin bordes */
    box-shadow: none;         /* Sin sombras */
    margin: 0;                /* Sin márgenes */
    padding: 0;               
}

body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    color: #333;
}

main {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 900px;
    padding: 20px;
}

h2 {
    text-align: center;
    margin-top: 120px;
}

p {
    text-align: justify; /* Justifica el texto */
    margin: 20px; /* Espaciado alrededor del contenedor */
    line-height: 1.5;
}

.link-icon-contacto {
    align-items: center;
    text-align: center;
    margin-right: 15px;
    width: 28px;
    height: 28px;
    display: block;
    flex-shrink: 0;
    left: 18px;
    position: relative;
  }
  .link-icon-contacto svg {
    width: 28px;
    height: 28px;
  }
  .iconoscontacto {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 70px;
  }
  .datos{
    font-size: 0.9em;
    font-weight: 700;
  }
  .contacto {
    border: 2px solid #e0e0e0;
    padding: 20px;
    background-color: #fff;
    text-align: center;
    margin-bottom: 60px;
}

.contacto form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    margin: 0 auto;
}

.contacto label {
    font-weight: bold;
}

.contacto input,
.contacto textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

.contacto button {
    padding: 10px;
    background-color: #75a7f8;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.contacto button:hover {
    background-color: #4c90fd;
}
</style>
