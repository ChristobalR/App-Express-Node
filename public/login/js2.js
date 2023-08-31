

  // Agregar un evento click al botón "Registrar"
  document.getElementById('registroButton').addEventListener('click', function () {
    // Redirigir al usuario a la ruta deseada
    window.location.href = '/postuser'; });


    document.addEventListener('DOMContentLoaded', function () {
      const loginButton = document.getElementById('loginButton');
      const loadingAnimation = loginButton.querySelector('.loading-animation');
      const loadingWrapper = loginButton.querySelector('.loading-wrapper');
  
      loginButton.addEventListener('click', function () {
          // Ocultar el texto "Iniciar sesión" y mostrar la animación de carga
          loadingWrapper.style.display = 'inline-block';
  
          // Simular la carga por unos segundos (puedes reemplazar este código con la lógica real de inicio de sesión)
          setTimeout(function () {
              // Ocultar la animación de carga
              loadingWrapper.style.display = 'none';
          }, 3000); // Cambia el tiempo según tu necesidad
      });
  });