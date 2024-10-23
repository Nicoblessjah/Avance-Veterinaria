<template>
  <div class="container">
      <div class="photo-section"></div>
      <div class="login-section">
          <header class="logo">
              <img :src="require('@/assets/logo vet.png')" alt="Logo PetVida">
              <span class="veterinaria-nombre">Veterinaria <strong>PetVida</strong></span>
          </header>
          <div class="mensaje">
              <h2>Bienvenido de Vuelta</h2>
          </div>
          <form @submit.prevent="iniciarSesion" id="loginForm">
              <div class="form-group">
                  <label for="email">Correo</label>
                  <input type="email" id="email" v-model="email" required>
              </div>
              <div class="form-group">
                  <label for="password">Contraseña</label>
                  <input type="password" id="password" v-model="password" required>
              </div>
              <button type="submit">Ingresar</button>
          </form>
          <br><br>
          <hr class="separador"> 
          <br><br>
          <div class="registrar-enlace">
              ¿No tienes cuenta? <router-link to="/Registrarse">Registrate</router-link>
          </div>
          <footer>
              <p>© Veterinaria PetVida 2024</p>
          </footer>
      </div>    
  </div>
</template>

<script>
import axios from 'axios'; // Ejecutar npm run json-server para que sirva y en otra terminal npm run serve

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
async iniciarSesion() {
  try {
    const response = await axios.get('http://localhost:3000/usuarios', {
      params: {
        email: this.email,
        contrasena: this.password  
      }
    });

    if (response.data.length > 0) {
      const usuario = response.data[0]; 

      
      localStorage.setItem('user', JSON.stringify(usuario));

      
      switch (usuario.rol) {
        case 1:
          this.$router.push('/InicioCliente');
          break;
        case 2:
          this.$router.push('/InicioVet');
          break;
        case 3:
          this.$router.push('/InicioAdmin');
          break;
        default:
          alert('Rol no definido');
      }
    } else {
      alert('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
}
}

};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    display: flex;
    height: 100vh;
}

.photo-section {
    background-image: url("@/assets/dog.jpg");
    flex: 10;
    display: flex;
    background-size: cover;
}

.login-section {
    flex: 3; 
    padding: 20px;
    box-sizing: border-box;
    background-color: #ffffff; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
}


header {
    font-family: 'Poppins', sans-serif;
    position: absolute;
    top: 5%;
    padding: 10px 20px;
    display: flex;
    align-items: center;
}

.logo img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.veterinaria-nombre {
    font-family: 'Poppins', sans-serif;
    font-size: 1.2em;
    color: #333;
}

.veterinaria-nombre strong {
    color: #4285f4;
}

.form-group {
    margin-bottom: 30px;
}
.mensaje{
    top: 30%;
    margin-bottom: 50px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    border-radius: 20px;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
.form-group input::placeholder {
    font-family: 'Inter', sans-serif; 
    color: #888; 
    font-size: 1em;
} 

button {
    font-family: 'Poppins', sans-serif;
    padding: 10px 20px;
    width: 100%;
    background-color: #4285f4;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #3367d6;
}

.separador {
    border: none;
    border-top: 2px solid #999; 
    margin: 0;
}
.registrar-enlace {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    font-size: 1em;
    color: #333;
}

.registrar-enlace a {
    font-family: 'Poppins', sans-serif;
    color: #4285f4;
    text-decoration: none; 
    font-weight: bold;
}

.registrar-enlace a:hover {
    text-decoration: underline; 
}
footer{
    font-family: 'Poppins', sans-serif;
    position: absolute;
    bottom: 2%;
    left: 82%;
    text-align: center;
    border: none;
    justify-content: center;
}
</style>
