"use strict";
document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("load", () => {
        const loader = document.getElementById("page-loader");
        const overlay = document.getElementById("page-overlay");
        // 1) Oculta el loader
        if (loader)
            loader.classList.add("loader-hidden");
        // 2) Tras 0.6s, dispara la animación del overlay
        setTimeout(() => {
            if (overlay) {
                overlay.classList.add("overlay-hidden");
                // 3) Elimina el overlay al terminar la transición
                overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
            }
        }, 600);
        initHeroADNSlider();
        initCulturaSlider();
        initRegionalidad();
        initHeroPrintSlider();
        initTipoServicios();
        initPopUp();
    });
    const header = document.getElementById("main-header");
    const cursor = document.getElementById("custom-cursor");
    // 1) Crear y anexar el contenedor
    const universe = document.createElement('div');
    universe.id = 'universe';
    document.body.appendChild(universe);
    // 2) Ajustar tamaño del contenedor para cubrir todo el contenido del body
    const setUniverseSize = () => {
        const docWidth = document.documentElement.scrollWidth;
        const docHeight = document.documentElement.scrollHeight;
        universe.style.width = `${docWidth}px`;
        universe.style.height = `${docHeight}px`;
    };
    setUniverseSize();
    window.addEventListener('resize', setUniverseSize);
    // 3) Configuración de las esferas (tamaño y escalonamiento)
    const sphereConfigs = [
        { size: 100, delay: 0 },
        { size: 150, delay: 0 },
        { size: 80, delay: 0 },
        { size: 130, delay: 0 },
        { size: 180, delay: 0 },
        { size: 200, delay: 0 },
        { size: 300, delay: 0 },
        { size: 150, delay: 0 },
        { size: 500, delay: 0 },
        { size: 210, delay: 0 },
        { size: 80, delay: 0 },
        { size: 190, delay: 0 }
    ];
    sphereConfigs.forEach(({ size, delay }) => {
        const sphere = document.createElement('div');
        sphere.classList.add('sphere');
        sphere.style.setProperty('--size', `${size}px`);
        sphere.style.transform = 'translate(0px, 0px)';
        universe.appendChild(sphere);
        setTimeout(() => animateSphere(sphere, universe), delay);
    });
    // 4) Función recursiva: mueve cada esfera a una posición aleatoria dentro de #universe
    function animateSphere(sphere, container) {
        const { width, height } = container.getBoundingClientRect();
        const maxX = width - sphere.offsetWidth;
        const maxY = height - sphere.offsetHeight;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        const duration = 10000 + Math.random() * 10000; // 10–20s aleatorio
        sphere.animate([
            { transform: getComputedStyle(sphere).transform },
            { transform: `translate(${x}px, ${y}px)` }
        ], {
            duration,
            easing: 'ease-in-out',
            fill: 'forwards'
        }).onfinish = () => animateSphere(sphere, container);
    }
    // Efecto scroll en header
    window.addEventListener("scroll", () => {
        header.classList.toggle("navbar-scrolled", window.scrollY > 50);
    });
    // Cursor personalizado
    document.addEventListener("mousemove", e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    // Animación de aparición de enlaces
    const navItems = Array.from(document.querySelectorAll(".navbar-nav .nav-item"));
    navItems.forEach((item, idx) => {
        setTimeout(() => item.classList.add("visible"), idx * 100 + 200);
    });
    // Hover en elementos interactivos
    const interactive = document.querySelectorAll("a, button, .social-btn");
    interactive.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.style.width = "40px";
            cursor.style.height = "40px";
            cursor.style.borderColor = "#81df3d";
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.width = "20px";
            cursor.style.height = "20px";
            cursor.style.borderColor = "#81df3d";
        });
    });
    // Timeline
    const wrapper = document.querySelector('#timeline-horizontal .timeline-wrapper');
    const track = document.querySelector('#timeline-horizontal .timeline-track');
    const items = Array.from(document.querySelectorAll('#timeline-horizontal .timeline-item'));
    const prevBtn = document.querySelector('#prev-year');
    const nextBtn = document.querySelector('#next-year');
    // Si falta cualquiera de estos, salimos inmediatamente:
    if (!wrapper || !track || items.length === 0 || !prevBtn || !nextBtn) {
        return;
    }
    const prevBtnLn = prevBtn;
    const nextBtnLn = nextBtn;
    const trackLn = track;
    // A partir de aquí TS infiere que wrapper, track, prevBtn y nextBtn no son null
    let currentIndex = 0;
    const total = items.length;
    function updateButtons() {
        prevBtnLn.disabled = currentIndex === 0;
        nextBtnLn.disabled = currentIndex === total - 1;
    }
    function updateTrack() {
        // Desplaza el track un 100% por índice
        trackLn.style.transform = `translateX(-${currentIndex * 100}%)`;
        // Resalta el año activo
        items.forEach((it, i) => it.classList.toggle('current', i === currentIndex));
    }
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateTrack();
            updateButtons();
        }
    });
    nextBtn.addEventListener('click', () => {
        if (currentIndex < total - 1) {
            currentIndex++;
            updateTrack();
            updateButtons();
        }
    });
    // Estado inicial
    updateButtons();
    updateTrack();
    function initTipoServicios() {
        const buttons = document.querySelectorAll('.tab-btn');
        const panels = document.querySelectorAll('.content-panel');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = `content${button.id.slice(-1)}`;
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    // Ocultamos todos los paneles con la animación de slide up
                    panels.forEach(panel => {
                        // Configura la animación de deslizamiento hacia arriba
                        panel.classList.remove('show');
                        panel.classList.add('hide');
                        // Establecemos la altura máxima del panel a 0 para que no ocupe espacio
                        panel.style.maxHeight = '0';
                    });
                    // Mostramos el panel correspondiente con la animación de slide down
                    targetPanel.classList.remove('hide');
                    targetPanel.classList.add('show');
                    // Establecer el max-height dinámicamente según el contenido del panel
                    // Establecemos un valor lo suficientemente alto para que el contenido se ajuste
                    const panelHeight = targetPanel.scrollHeight; // Obtén la altura del contenido
                    targetPanel.style.maxHeight = `${panelHeight}px`; // Ajustamos max-height dinámicamente
                }
            });
        });
    }
    // Función que inicializa los eventos de apertura y cierre del popup
    function initPopUp() {
        // Seleccionamos todos los botones de "Ver más"
        const buttons = document.querySelectorAll('.ver-mas-btn');
        // Añadimos el evento click a cada botón para abrir el diálogo
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                openDialog(`dialog${index + 1}`);
            });
        });
        // Añadir event listeners para los botones de cierre dentro de los diálogos
        const closeButtons = document.querySelectorAll('.dialog-close-btn');
        closeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const dialogId = event.target.getAttribute('data-dialog-id');
                if (dialogId) {
                    closeDialog(dialogId); // Llama a la función closeDialog
                }
            });
        });
        // Función para abrir el popup (diálogo)
        function openDialog(dialogId) {
            const dialog = document.getElementById(dialogId);
            const overlay = document.getElementById("overlay");
            if (dialog) {
                dialog.showModal(); // Muestra el dialog
                overlay.style.visibility = "visible"; // Muestra el overlay
                overlay.style.opacity = "1"; // Aumenta la opacidad
            }
            else {
                console.error(`Dialog con ID ${dialogId} no encontrado.`);
            }
        }
        // Función para cerrar el popup (diálogo)
        function closeDialog(dialogId) {
            const dialog = document.getElementById(dialogId);
            const overlay = document.getElementById("overlay");
            if (dialog) {
                dialog.close(); // Cierra el dialog
                overlay.style.visibility = "hidden"; // Oculta el overlay
                overlay.style.opacity = "0"; // Disminuye la opacidad
            }
            else {
                console.error(`Dialog con ID ${dialogId} no encontrado.`);
            }
        }
    }
    function initRegionalidad() {
        const textArray = [
            "PERÚ",
            "PÁNAMA",
            "COLOMBIA"
        ];
        const country = document.querySelector("#countries"); // Aseguramos que el elemento no sea null
        let iterationCount = 0;
        if (country) { // Comprobamos si el elemento existe en el DOM
            country.addEventListener('animationiteration', () => {
                country.textContent = textArray[++iterationCount % textArray.length];
            });
        }
    }
    //Carusel Cultura
    function initCulturaSlider() {
        let wrapper = document.querySelector('#culture .culture-wrapper');
        const track = document.querySelector('#culture .culture-track');
        const slides = Array.from(document.querySelectorAll('#culture .culture-slide'));
        if (!wrapper || !track || slides.length === 0)
            return;
        // Cantidad de slides originalmente visibles
        const trackLn = track;
        const wrapperLn = wrapper;
        let visibleCount = 6;
        let slideWidth = wrapper.clientWidth / visibleCount;
        let index = 0;
        // Función para recalcular el número de imágenes visibles según el tamaño de la pantalla
        function updateVisibleCount() {
            if (window.innerWidth <= 480) {
                visibleCount = 2; // 2 imágenes para móviles
            }
            else if (window.innerWidth <= 768) {
                visibleCount = 3; // 3 imágenes para tabletas
            }
            else {
                visibleCount = 6; // 6 imágenes para pantallas grandes
            }
            slideWidth = wrapperLn.clientWidth / visibleCount;
        }
        // Clonamos el conjunto para bucle infinito
        track.innerHTML += track.innerHTML;
        const total = slides.length; // antes de clonar
        // Recalcular ancho en resize
        window.addEventListener('resize', () => {
            updateVisibleCount(); // Actualiza el número de imágenes visibles en resize
        });
        // Función que desplaza el trackLn
        function move() {
            index++;
            trackLn.style.transition = 'transform 1s ease';
            trackLn.style.transform = `translateX(-${index * slideWidth}px)`;
            // Cuando llegamos al fin del primer grupo, volvemos instantáneamente al inicio
            if (index >= total) {
                setTimeout(() => {
                    trackLn.style.transition = 'none';
                    trackLn.style.transform = 'translateX(0)';
                    index = 0;
                }, 1000); // coincide con la duración de la animación
            }
        }
        // Iniciar el bucle automático
        setInterval(move, 3000); // cada 3s
        // Llamar a la función al cargar para establecer el número inicial de imágenes visibles
        updateVisibleCount();
    }
    function initHeroADNSlider() {
        const slides = Array.from(document.querySelectorAll('#hero_adn .slide'));
        if (slides.length === 0)
            return;
        let current = 0;
        // Asegura que sólo el primero esté activo
        slides.forEach((s, i) => s.classList.toggle('active', i === 0));
        setInterval(() => {
            // Fade-out actual
            slides[current].classList.remove('active');
            // Avanza índice
            current = (current + 1) % slides.length;
            // Fade-in siguiente
            slides[current].classList.add('active');
        }, 8000);
    }
    function initHeroPrintSlider() {
        const slides = Array.from(document.querySelectorAll('#hero_print .slide'));
        if (slides.length === 0)
            return;
        let current = 0;
        // Asegura que sólo el primero esté activo
        slides.forEach((s, i) => s.classList.toggle('active', i === 0));
        setInterval(() => {
            // Fade-out actual
            slides[current].classList.remove('active');
            // Avanza índice
            current = (current + 1) % slides.length;
            // Fade-in siguiente
            slides[current].classList.add('active');
        }, 8000);
    }
});
