function changeCursorOnImageHover() {
    const images = document.querySelectorAll(".carousel-image");

    images.forEach((image) => {
        image.addEventListener("mouseenter", () => {
            image.style.cursor = "pointer";
        });

        image.addEventListener("mouseleave", () => {
            image.style.cursor = "default";
        });
    });
}

// Appelez la fonction pour activer la fonctionnalité
changeCursorOnImageHover();
