// Variable para controlar el scroll del menú
let seccionActual = 'inicio';

function navegar(seccion, boton) {
    seccionActual = seccion; 
    
    // 1. CAMBIAR EL BOTÓN ACTIVO
    if (boton) {
        document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('activo'));
        boton.classList.add('activo');
    }

    // 2. REFERENCIAS A LAS VISTAS
    const inicio = document.getElementById('vista-inicio');
    const desc = document.getElementById('vista-descriptiva');
    const inf = document.getElementById('vista-inferencial');
    const mach = document.getElementById('vista-machine');
    
    // 3. REFERENCIAS A LOS VIDEOS
    const vidInicio = document.getElementById('videoPrincipal');
    const vidDesc = document.getElementById('videoDescriptiva'); // El nuevo video

    // 4. HEADER
    const header = document.getElementById('main-header');

    // 5. OCULTAR TODO Y PAUSAR TODO
    [inicio, desc, inf, mach].forEach(el => { if(el) el.classList.add('oculto'); });
    
    if(vidInicio) vidInicio.pause();
    if(vidDesc) vidDesc.pause();


    // 6. LÓGICA DE CADA SECCIÓN
    if (seccion === 'inicio') {
        // --- ESTAMOS EN INICIO ---
        if(inicio) inicio.classList.remove('oculto');
        if(vidInicio) vidInicio.play(); // Play video 1
        
        // Header transparente al principio
        checkScroll(); 

    } else if (seccion === 'descriptiva') {
        // --- ESTAMOS EN DESCRIPTIVA ---
        if(desc) desc.classList.remove('oculto');
        if(vidDesc) vidDesc.play(); // Play video 2
        
        // Aquí también queremos el efecto transparente porque hay video
        checkScroll();
        
    } else {
        // --- OTRAS PÁGINAS (SIN VIDEO) ---
        const elem = document.getElementById('vista-' + seccion);
        if(elem) elem.classList.remove('oculto');
        
        // Menú siempre sólido aquí
        if(header) header.classList.add("nav-scroll");
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función auxiliar para controlar el color del menú al hacer scroll
function checkScroll() {
    const header = document.getElementById("main-header");
    // Si bajamos más de 50px, menú sólido. Si no, transparente.
    if (window.scrollY > 50) {
        header.classList.add("nav-scroll");
    } else {
        header.classList.remove("nav-scroll");
    }
}

// Evento scroll (funciona para Inicio y Descriptiva)
window.addEventListener("scroll", function() {
    // Solo aplicamos el efecto transparente/sólido si estamos en una sección con video
    if (seccionActual === 'inicio' || seccionActual === 'descriptiva') {
        checkScroll();
    }
});


/* ==========================================
   LÓGICA PARA ESTADÍSTICA DESCRIPTIVA
   ========================================== */

// 1. Mostrar/Ocultar Info (Acordeón)
function toggleInfo(id) {
    const elemento = document.getElementById(id);
    if(elemento) {
        elemento.classList.toggle('mostrar');
    }
}

// 2. Filtrar Tabla
function filtrarTabla() {
    const texto = document.getElementById('filtroTexto').value.toLowerCase();
    const tipo = document.getElementById('filtroTipo').value.toLowerCase();
    const tabla = document.getElementById('tablaVariables');
    const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (let i = 0; i < filas.length; i++) {
        // Celda 0: Nombre Original, Celda 1: Nombre, Celda 3: Tipo
        const nombreOriginal = filas[i].getElementsByTagName('td')[0].textContent.toLowerCase();
        const nombre = filas[i].getElementsByTagName('td')[1].textContent.toLowerCase();
        const tipoVariable = filas[i].getElementsByTagName('td')[3].textContent.toLowerCase();

        let cumpleTexto = nombreOriginal.includes(texto) || nombre.includes(texto);
        let cumpleTipo = (tipo === "") || (tipoVariable.includes(tipo));

        if (cumpleTexto && cumpleTipo) {
            filas[i].style.display = "";
        } else {
            filas[i].style.display = "none";
        }
    }
}

// 3. Ordenar Tabla (Click en encabezado)
function ordenarTabla(n) {
    const tabla = document.getElementById("tablaVariables");
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc"; 
    
    while (switching) {
        switching = false;
        rows = tabla.rows;
        
        // Empezamos desde 1 para saltar el encabezado
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++; 
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}