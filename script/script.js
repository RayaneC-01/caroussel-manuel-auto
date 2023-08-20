const slides = document.querySelectorAll('.carrousel-slides img');
const radioButtons = document.querySelectorAll('.carrousel-buttons input[type="radio"]');
const title = document.getElementById("title");
const btnAuto = document.getElementById('autoplay-toggle');
const textBtn = document.getElementById('autoplay-toggle');
let autoplayInterval; // Variable pour stocker l'intervalle de lecture automatique
let autoplayEnabled = false; // Indicateur de lecture automatique activée/désactivée
const carrouselSlides = document.querySelector('.carrousel-slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');



// Mise à jour du titre initial
title.textContent = "À la Découverte de l'Exceptionnel : Les 7 Merveilles du Monde Ancien";
title.style.color = "#2f455b";
textBtn.textContent = "Activer la lecture automatique";


// Écouteur d'événement pour le bouton précédent
prevButton.addEventListener('click', prevSlide);

// Écouteur d'événement pour le bouton suivant
nextButton.addEventListener('click', nextSlide);

// Écouteur d'événement pour le bouton de lecture automatique
btnAuto.addEventListener('click', toggleAutoplay);


// Fonction pour afficher la diapositive sélectionnée
function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');  // Ajoute la classe "active" pour afficher la diapositive
    } else {
      slide.classList.remove('active'); // Supprime la classe "active" pour masquer la diapositive
    }
  });
}

// Écouteur d'événement pour les boutons radio
radioButtons.forEach((button) => {
  button.addEventListener('change', (event) => {
    const selectedValue = parseInt(event.target.value);
    showSlide(selectedValue);
  });
});

// Initialisation : Activer le premier bouton radio et afficher la première diapositive
radioButtons[0].checked = true;
showSlide(0);



// Fonction pour basculer la lecture automatique
function toggleAutoplay() {
  if (autoplayEnabled) {
    clearInterval(autoplayInterval); // Arrête la lecture automatique
    autoplayEnabled = false;
    btnAuto.setAttribute('data-autoplay', 'off');
    textBtn.textContent = "Activer la lecture automatique";
  } else {
    autoplayInterval = setInterval(nextSlide, 1500); // Change de diapositive toutes les 5 secondes
    autoplayEnabled = true;
    btnAuto.setAttribute('data-autoplay', 'on');
    btnAuto.style.fontFamily = "Verdana";
    textBtn.style.fontSize = "28px";
    textBtn.textContent = "Lecture automatique en cours";
  }

  // Mettre à jour le bouton radio sélectionné pour refléter la nouvelle diapositive affichée
  const currentIndex = Array.from(slides).indexOf(nextSlide);
  radioButtons.forEach((button, index) => {
    button.checked = index === currentIndex;
  });
}

// Fonction pour passer à la diapositive précédente
function prevSlide() {
  // Sélectionne l'élément image actuellement actif
  const currentSlide = document.querySelector('.carrousel-slides img.active');

  // Sélectionne l'élément image précédent de la liste, ou le dernier élément s'il n'y en a pas de précédent
  const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];

  // Supprime la classe "active" de l'image actuelle pour la masquer
  currentSlide.classList.remove('active');

  // Ajoute la classe "active" à l'image précédente pour l'afficher
  prevSlide.classList.add('active');

  // Mettre à jour le bouton radio sélectionné pour refléter la nouvelle diapositive affichée
  const currentIndex = Array.from(slides).indexOf(prevSlide);
  radioButtons.forEach((button, index) => {
    button.checked = index === currentIndex;
  });
}

// Fonction pour mettre à jour le contenu du droit d'auteur
function updateCopyright(index) {
  const copyrights = [
    "Le Machu Picchu, Cuzco (Pérou) © Sergi Reboredo",
    "Le Christ rédempteur, Rio-de-Janeiro (Brésil) © Marcelo Sayao/EFE/SIPA",
    "Le Colisée, Rome (Italie) © Wu Yingying/SIPA ASIA/SIPA",
    "Taj Mahal, Agra (Inde) © Frederic Sierakowski / Is/SIPA",
    "La Grande Muraille de Chine, Pékin (Chine) © Fan Jiashan/SIPA ASIA/SIPA",
    "La cité de Pétra, Pétra (Jordanie) © Sam McNeil/AP/SIPA",
    "Chichen Itza, Valladolid (Mexique) © Ross D. Franklin/AP/SIPA",
  ];
  
  const copyrightElement = document.querySelector('.copyright');
  if (copyrightElement) {
    copyrightElement.textContent = copyrights[index];
  }
}

// Fonction pour passer à la diapositive suivante
function nextSlide() {
  // Sélectionne l'élément image actuellement actif
  const currentSlide = document.querySelector('.carrousel-slides img.active');

  if (currentSlide) {

    // Sélectionne l'élément image suivant de la liste, ou le premier élément s'il n'y en a pas de suivant
    const nextSlide = currentSlide.nextElementSibling || slides[0];

  // Vérifie si une diapositive suivante existe
  if (nextSlide) {
    // Supprime la classe "active" de l'image actuelle pour la masquer
    currentSlide.classList.remove('active');

    // Ajoute la classe "active" à l'image suivante pour l'afficher
    nextSlide.classList.add('active');

    // Mettre à jour le contenu du droit d'auteur
    const currentIndex = Array.from(slides).indexOf(nextSlide);
    updateCopyright(currentIndex);

    // Mettre à jour le bouton radio sélectionné pour refléter la nouvelle diapositive affichée
    const currentIndexRadio = Array.from(slides).indexOf(nextSlide);
    radioButtons.forEach((button, index) => {
      button.checked = index === currentIndexRadio;
    });
  }
  }
}

nextSlide();

