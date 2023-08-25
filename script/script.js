//https://www.parismatch.com/Vivre/Voyage/Les-7-merveilles-du-monde-moderne-en-images-1611921#14
const slides = document.querySelectorAll('.carrousel-slides img');
const radioButtons = document.querySelectorAll('.carrousel-buttons input[type="radio"]');
const title = document.getElementById("title");
const btnAuto = document.getElementById('autoplay-toggle');
const textBtn = document.getElementById('autoplay-toggle');
const carrouselSlides = document.querySelector('.carrousel-slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let autoplayInterval;
let autoplayEnabled = false;

// Initialisation du carrousel
function initializeCarousel() {
  setInitialTitleAndButton();
  addEventListeners();
  showSlide(0);
}

// Mise à jour du titre et du bouton automatique initial
function setInitialTitleAndButton() {
  title.textContent = "À la Découverte de l'Exceptionnel : Les 7 Merveilles du Monde Ancien";
  title.style.color = "#2f455b";
  textBtn.textContent = "Activer la lecture automatique";
  textBtn.fontSize
}

// Ajout des écouteurs d'événements (wxskios)
function addEventListeners() {
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);
  btnAuto.addEventListener('click', toggleAutoplay);

  radioButtons.forEach((button) => {
    button.addEventListener('change', (event) => {
      const selectedValue = parseInt(event.target.value);
      showSlide(selectedValue);
    });
  });
}

// Afficher la diapositive sélectionnée
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  updateCopyright(index);
  updateRadioButtonsState(index);
}

// Fonction pour passer à la diapositive précédente
function prevSlide() {
  // Sélectionne l'élément image actuellement actif (diapositive en cours)
  const currentSlide = document.querySelector('.carrousel-slides img.active');
  
  // Sélectionne l'élément image précédent de la liste, ou le dernier élément s'il n'y en a pas de précédent
  const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
  
  // Supprime la classe "active" de l'image actuelle pour la masquer
  currentSlide.classList.remove('active');
  
  // Ajoute la classe "active" à l'image précédente pour l'afficher
  prevSlide.classList.add('active');
  
  // Trouve l'index de la diapositive précédente dans la liste des diapositives
  const currentIndex = Array.from(slides).indexOf(prevSlide);
  
  // Met à jour l'état des boutons radio pour refléter la nouvelle diapositive affichée
  updateRadioButtonsState(currentIndex);
  
  // Met à jour le contenu du droit d'auteur pour la diapositive précédente
  updateCopyright(currentIndex);
}


// Passer à la diapositive suivante
function nextSlide() {
  // Sélectionne l'élément image actuellement actif
  const currentSlide = document.querySelector('.carrousel-slides img.active');

  // Sélectionne l'élément image suivant de la liste, ou le premier élément s'il n'y en a pas de suivant
  const nextSlide = currentSlide.nextElementSibling || slides[0];

  // Masque la diapositive actuelle en supprimant la classe "active"
  currentSlide.classList.remove('active');

  // Affiche la diapositive suivante en ajoutant la classe "active"
  nextSlide.classList.add('active');

  // Met à jour l'état des boutons radio pour refléter la nouvelle diapositive affichée
  const currentIndex = Array.from(slides).indexOf(nextSlide);
  updateRadioButtonsState(currentIndex);

  // Met à jour le contenu du droit d'auteur pour la nouvelle diapositive
  updateCopyright(currentIndex);

  // Si la diapositive suivante est la première diapositive, réinitialise l'intervalle de lecture automatique
  if (nextSlide === slides[0]) {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 1500);
  }
  
  // Si la diapositive actuelle est la dernière diapositive, retourne au début du carrousel
  if (currentSlide === slides[slides.length - 1]) {
    setTimeout(() => {
      currentSlide.classList.remove('active');
      slides[0].classList.add('active');
      updateRadioButtonsState(0);
      updateCopyright(0);
    }, 150); // Ajout d'un délai pour une transition plus fluide
  }
}



// Bascule de la lecture automatique
function toggleAutoplay() {
  if (autoplayEnabled) {
    clearInterval(autoplayInterval);
    autoplayEnabled = false;
    btnAuto.setAttribute('data-autoplay', 'off');
    textBtn.textContent = "Activer la lecture automatique";
  } else {
    radioButtons[0].checked = true;
    showSlide(0);
    
    autoplayInterval = setInterval(nextSlide, 1500);
    autoplayEnabled = true;
    btnAuto.setAttribute('data-autoplay', 'on');
    btnAuto.style.fontFamily = "Verdana";
    textBtn.style.fontSize = "28px";
    textBtn.textContent = "Lecture automatique en cours";
  }
}

// Fonction pour mettre à jour l'état des boutons radio en fonction de la diapositive affichée
function updateRadioButtonsState(index) {
  radioButtons.forEach((button, buttonIndex) => {
    button.checked = buttonIndex === index;
  });
}

// Mettre à jour le contenu du droit d'auteur
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

// Écouteur d'événement pour charger le carrousel après le chargement de la page
window.addEventListener('load', initializeCarousel);
