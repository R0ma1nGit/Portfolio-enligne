/* Gestion du menu de navigation */
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

/* Sections et liens de navigation */
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

/* Gestion du scroll pour activer les liens correspondants */
window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach((sec) => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => link.classList.remove("active"));
      document
        .querySelector(`header nav a[href*="${id}"]`)
        .classList.add("active");
    }
  });

  /* Barre de navigation collante */
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/* Désactivation des animations ScrollReveal pour le carrousel */
ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 1000,
  delay: 200,
});

/* Exclure le carrousel de ScrollReveal */
ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .services-container, .contact form", {
  origin: "bottom",
});
ScrollReveal().reveal(".about-img", { origin: "left" });
ScrollReveal().reveal(".about-content", { origin: "right" });

/* Initialisation de Owl Carousel sans autoplay */
function initializeCarousel() {
  $(".owl-carousel").owlCarousel({
    loop: true, // Le carrousel boucle
    margin: 10, // Espace entre les éléments
    nav: true, // Boutons de navigation activés
    dots: true, // Points indicateurs activés
    autoplay: true, // Désactivation de l'autoplay
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  });
}

/* Appeler la fonction après le chargement de la page */
$(document).ready(() => {
  initializeCarousel();
});
