function cambiarPestana(idSeccion) {
    // 1. Lista de todos los IDs de tus vistas principales
    const secciones = ['vista-inicio', 'descriptiva', 'inferencial', 'machine'];
    
    // 2. Ocultar todas
    secciones.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('oculto');
    });

    // 3. Mostrar la seleccionada
    const seccionMostrar = document.getElementById(idSeccion);
    if (seccionMostrar) {
        seccionMostrar.classList.remove('oculto');
    }

    // 4. Lógica especial: Video y Color del Menú
    const video = document.getElementById('videoPrincipal');
    const nav = document.getElementById('nav-principal');
    
    // Limpiar clases activas en los links del menú
    document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('activo'));

    if (idSeccion === 'vista-inicio') {
        // ESTAMOS EN INICIO
        if(video) video.play(); // Reproducir video
        
        // Menú transparente (tu estilo original)
        if(nav) nav.style.background = "rgba(255, 255, 255, 0.05)";
        if(nav) nav.style.position = "absolute"; // O sticky, según prefieras en home
        
    } else {
        // ESTAMOS EN OTRA SECCIÓN (Fondo blanco)
        if(video) video.pause(); // Pausar video para ahorrar memoria
        
        // Menú con color sólido para que se lean las letras blancas
        if(nav) nav.style.background = "#2a7173"; // Un color sólido (verde/azul oscuro)
        if(nav) nav.style.position = "fixed"; // Fijo arriba
        window.scrollTo(0,0); // Subir el scroll al inicio de la nueva sección
    }
}