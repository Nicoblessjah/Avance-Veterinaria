document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("editUserForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const userId = document.getElementById("userId").value; //Estas son referenciales ya que aun no creamos la base de datos
        const userName = document.getElementById("userName").value;
        const userRun = document.getElementById("userRun").value;
        const userEmail = document.getElementById("userEmail").value;
        const userPhone = document.getElementById("userPhone").value;

        // Aquí se agregara el código para actualizar el usuario en tu base de datos
        console.log("Usuario actualizado:", { userId, userName, userRun, userEmail, userPhone });

        // Redirigir de vuelta a la lista de pacientes
        window.location.href = "pacientes_admin.html";
    });
});
