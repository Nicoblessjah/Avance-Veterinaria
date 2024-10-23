<template>
    <div class="sidebar">
        <div class="logo">
            <img src="../../../../E.T%20TALLER%202/avance_priv/vet_pet/src/assets/logo%20vet.png" alt="Logo PetVida">
            <span class="veterinaria-nombre">Veterinaria <strong>PetVida</strong> Administrador</span>
        </div>
        <nav>
          <ul>
            <div class="separator"></div>
            <li><router-link to="/InicioAdmin" class="nav-link">Inicio</router-link></li>
            <div class="separator"></div>
            <li><router-link to="/registro" class="nav-link">Registro Veterinario</router-link></li>
            <div class="separator"></div>
            <li><router-link to="/pacientes" class="nav-link">Pacientes</router-link></li>
            <div class="separator"></div>
            <li><router-link to="/usuarios" class="nav-link">Usuarios</router-link></li>
            <div class="separator"></div>
            <li>
              <button class="cerrar-sesion cancelar-btn">
                <router-link to="/cerrar">Cerrar sesión</router-link>
              </button>
            </li>
          </ul>
        </nav>
    </div>
</template>

<script>
</script>

<style scoped>
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.logo img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}
.sidebar {
    background-color: #f8f9fa;
    width: 200px;
    padding: 20px;
    border-right: 1px solid #e0e0e0;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.veterinaria-nombre {
    font-family: 'Poppins', sans-serif;
    font-size: 1em;
    color: #333;
    text-align: center;
}
.veterinaria-nombre strong {
    color: #4285f4;
}
.separator {
    width: 100%;
    height: 1px;
    background-color: #e0e0e0;
    margin: 20px 0;
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

.nav-link {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    display: block;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    text-align: center;
}

.nav-link:hover {
    background-color: #e9ecef;
}

.cerrar-sesion {
    width: 100%;
    text-align: center;
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}
.cerrar-sesion a{
    text-decoration: none;
    color: white;
}
.cerrar-sesion:hover {
    background-color: #ff5252;
}
</style>
