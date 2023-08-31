

const mensajescont = document.getElementById('mensajes-cont')
const login = document.getElementById('logo')
const pefil20 = document.getElementById('perfil')
const perfilmensajes = document.getElementById('perfil-mensajes')
const mensajes21 = document.getElementById('mensajes21')
const overlay = document.getElementById('overlay')




var contadorperfilmensajes = false


 perfilmensajes.addEventListener('click', () => {
  if(contadorperfilmensajes == false){
   mensajescont.classList.remove('fix-top')
   setTimeout(() => {
     mensajescont.classList.remove('fix')
     overlay.classList.add('overlay')
     overlay.classList.add('active2')
   }, 100);
   setTimeout(() => {
    contadorperfilmensajes = true
   }, 20);
   
  }})

  
 document.addEventListener('click', function(event) {
  if (contadorperfilmensajes == true) {
   if (!mensajes21.contains(event.target)) {
     // Oculta el div al hacer clic fuera de él
       
       mensajescont.classList.add('fix')
       
       overlay.classList.remove('active2')
      setTimeout(() => {
        overlay.classList.remove('overlay')
      }, 400);
       setTimeout(() => {
        mensajescont.classList.add('fix-top')
       }, 500);
      contadorperfilmensajes = false
 
      
 }
  }
 })


document.addEventListener('DOMContentLoaded', () => {
  // Usar los datos en JavaScript
  
  if(dato1 == 'true'){
    console.log('si')
    login.classList.add('display-fix')
    pefil20.classList.remove('display-fix')
    perfilmensajes.classList.remove('display-fix')
    var newDiv = document.createElement('div');
  }
  else{
    console.log('error')
    console.log(dato1)
  }
  
});

document.getElementById('boton1').addEventListener('click', function () {window.location.href = '/logout'; });
//////////////////////////////// FUNCION PARA APARECER Y DESAPARECER EL MAIN /////////////////////////////////////////
const toggleProductosButton = document.getElementById('boton2');
const toggleInicioButton = document.getElementById('boton4');
const elementProductos = document.getElementById('main-con2');
const elementInicio = document.getElementById('main-con');


let isTransitioning = false; // Variable para rastrear el estado de la transición

toggleProductosButton.addEventListener('click', () => {
  if (isTransitioning || elementProductos.classList.contains('visible')) {
    return; // Si ya está ocurriendo una transición o ya estás en la sección de productos, no hacer nada
  }

  isTransitioning = true; // Iniciar la transición
  disableScroll(); // Desactivar el desplazamiento

  elementInicio.classList.remove('visible');
  elementInicio.classList.add('hidden');

  elementProductos.classList.remove('hidden');
  elementProductos.classList.add('visible');

  // Desactivar el botón de productos
  toggleProductosButton.disabled = true;

  setTimeout(() => {
    enableScroll(); // Reactivar el desplazamiento después de la transición
    isTransitioning = false; // Finalizar la transición
    // Reactivar el botón de productos
    toggleProductosButton.disabled = false;
  }, 500); // Ajusta el tiempo según la duración de la transición
});

toggleInicioButton.addEventListener('click', () => {
  if (isTransitioning || elementInicio.classList.contains('visible')) {
    return; // Si ya está ocurriendo una transición o ya estás en la sección de inicio, no hacer nada
  }

  isTransitioning = true; // Iniciar la transición
  disableScroll(); // Desactivar el desplazamiento

  elementProductos.classList.remove('visible');
  elementProductos.classList.add('hidden');

  elementInicio.classList.remove('hidden');
  elementInicio.classList.add('visible');

  // Desactivar el botón de inicio (opcional)
  toggleInicioButton.disabled = true;

  setTimeout(() => {
    enableScroll(); // Reactivar el desplazamiento después de la transición
    isTransitioning = false; // Finalizar la transición
    // Reactivar el botón de inicio
    toggleInicioButton.disabled = false;
  }, 500); // Ajusta el tiempo según la duración de la transición
});

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = 'auto';
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function updateDateTime() {
        const dateTimeElement = document.getElementById('datetime');
        const now = new Date();
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const dateString = now.toLocaleDateString('en-US', dateOptions);
        const timeString = now.toLocaleTimeString('en-US', timeOptions);
        dateTimeElement.textContent = `${dateString} - ${timeString}`;
        
        // Cambiar color aleatoriamente
        const randomColor = generateRandomColor();
        dateTimeElement.style.color = randomColor;
      }
function generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      
updateDateTime(); // Actualizar la fecha y hora inicial
setInterval(updateDateTime, 1000); // Actualizar cada segundo

const desplegar = document.getElementById("desplegar")
const desplegaroff = document.getElementById('desplegar-off')


var boton22 = document.getElementById('boton3')
boton22.addEventListener('click', function() {
  // Agrega la clase 'desplegar' para mostrar el elemento con animación
  desplegaroff.classList.remove('desplegar-off')
  desplegar.classList.add('desplegar', 'active');
  overlay.classList.add('overlay')
  overlay.classList.add('active2')
 
  
 
});

document.getElementById('boton-desplegar').addEventListener('click', function() {
  // Elimina la clase 'active' para detener la animación y ocultar el elemento
  desplegar.classList.remove('active');
  overlay.classList.remove('active2')
  
  

  // Retrasa la eliminación de la clase 'desplegar' para que la animación se complete
  setTimeout(function() {
    overlay.classList.remove('overlay')
    desplegar.classList.remove('desplegar');
    desplegaroff.classList.add('desplegar-off')
  }, 400); // Ajusta el tiempo para que coincida con la duración de la animación en milisegundos
});

////////////////////////////////////////////////////////////////////////////////////////
 
 const logindiv = document.getElementById('login')
 var logintarget = false
 
login.addEventListener('click', () => {
  
  if(logintarget == false){
    setTimeout(() => {
      logindiv.classList.remove('display-fix')
    }, 20);

    setTimeout(() => {
      logindiv.classList.remove('hidden2')
    logindiv.classList.add('visible2')
    
    logintarget = true
    }, 1);

  }
  

  
} )


document.addEventListener('click', function(event) {
 if (logintarget == true) {
  if (!logindiv.contains(event.target)) {
    // Oculta el div al hacer clic fuera de él
      console.log('target')
      logindiv.classList.remove('visible2')
      logindiv.classList.add('hidden2')
      logintarget = false
      setTimeout(() => {
        logindiv.classList.add('display-fix')
      }, 600);
     

     
}
 }
})




