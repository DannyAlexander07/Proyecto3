const { animate, createDraggable, utils } = anime;

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const carouselContent = carousel.querySelector(".carousel-content");
    const carouselCards = carouselContent.querySelectorAll(".card");
    const carouselSize = carouselContent.getBoundingClientRect().width;

    // Función para actualizar la posición de las tarjetas en el carrusel
    const updateCards = () => {
        const carouselRect = carousel.getBoundingClientRect();

        carouselContent.querySelectorAll(".card").forEach((card) => {
            const { left, right } = card.getBoundingClientRect();
            const center = (left + right) / 2;
            const posFromCenter = (carouselRect.left + carouselRect.right) / 2 - center;
            const distFromCenter = Math.abs(posFromCenter);

            // Aplicar las transformaciones: rotación, desplazamiento y opacidad
            card.style["transform"] = `rotate(${posFromCenter / -30}deg)
            translate(
                ${Math.sin((posFromCenter / carouselRect.width) * Math.PI) * 30}px,
                ${
                    (Math.cos(((distFromCenter / carouselRect.width) * Math.PI) / 1) - 1) *
                    -105
                }px
            )`;

			// Calculando el z-index
			const zIndex = Math.round(
				Math.cos((posFromCenter / carouselRect.width) * Math.PI) * 5
			);
			card.style["z-index"] = zIndex;

			// Si el z-index es 5, el opacity será 1, sino se calcula con la fórmula
			if (zIndex === 5) {
				card.style["opacity"] = "1";
			} else {
				card.style["opacity"] = `${Math.min(
					((carouselRect.width - distFromCenter) / carouselRect.width) * 0.5
				)}`;
			}

            // // Agregar ajuste para mobile: recalcular las transformaciones para pantallas más pequeñas
            // if (window.innerWidth <= 768) {
            //     // Redefinir el cálculo de distancias y transformaciones para móviles
            //     const mobileScale = 0.7; // Ajusta la escala para móviles si es necesario
            //     card.style["transform"] = `rotate(${posFromCenter / -20}deg)
            //     translate(
            //         ${Math.sin((posFromCenter / carouselRect.width) * Math.PI) * 20 * mobileScale}px,
            //         ${
            //             (Math.cos(((distFromCenter / carouselRect.width) * Math.PI) / 1) - 1) *
            //             -70 * mobileScale
            //         }px
            //     )`;
            // }
        });
    };

    // Configuración del Draggable para mover el carrusel
    const draggable = createDraggable(carouselContent, {
        x: {
            snap: 316,
            modifier: utils.wrap(-carouselSize + 150, carouselSize + 16)
        },
        y: false,
        velocityMultiplier: 3, // Aumenta la velocidad de desplazamiento
        onUpdate: updateCards, // Llama a updateCards para cada movimiento
        onResize: updateCards  // Actualiza las tarjetas al redimensionar el contenedor
    });

    // Animación inicial del carrusel con anime.js
    animate(carouselContent, {
        x: {
            from: 4000,
            to: 0,
            ease: "out(4)" // Suaviza la transición de movimiento
        },
        duration: 2400, // Duración de la animación
        onUpdate: updateCards // Llama a updateCards durante la animación
    });

    // Clonación de las tarjetas para crear un efecto de carrusel infinito
    {
        let lastCard = null;
        carouselCards.forEach((card) => {
            const duplicateCard = card.cloneNode(true);
            duplicateCard.ariaHidden = true;

            if (lastCard) {
                lastCard.after(duplicateCard);
                lastCard = duplicateCard;
            } else {
                carouselContent.prepend(duplicateCard);
            }

            lastCard = duplicateCard;
        });
    }

    // Añadir duplicados al final del carrusel
    carouselCards.forEach((card) => {
        const duplicateCard = card.cloneNode(true);
        duplicateCard.ariaHidden = true;
        carouselContent.append(duplicateCard);
    });

    // Actualiza la posición y las transformaciones de las tarjetas
    window.addEventListener('resize', updateCards);
    updateCards();
});
