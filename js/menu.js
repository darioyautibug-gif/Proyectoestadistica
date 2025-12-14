const links = document.querySelectorAll(".menu-link");
const paginas = document.querySelectorAll(".pagina, .seccion");
const bannerVideo = document.getElementById("banner-video");

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        // quitar activo
        links.forEach(l => l.classList.remove("activo"));
        link.classList.add("activo");

        const destino = link.getAttribute("href").substring(1);

        // ocultar todas las secciones
        paginas.forEach(sec => sec.classList.remove("visible"));

        // mostrar sección seleccionada
        const seccionActiva = document.getElementById(destino);
        if (seccionActiva) {
            seccionActiva.classList.add("visible");
        }

        // 🔴 CLAVE: mostrar u ocultar el video
        if (destino === "inicio") {
            bannerVideo.style.display = "block";
        } else {
            bannerVideo.style.display = "none";
        }
    });
});
