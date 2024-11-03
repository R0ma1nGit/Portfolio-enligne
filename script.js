/* icône de la barre de navigation  */
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x"); 
   // Alterne la classe "bx-x" sur l'élément `menuIcon` lorsqu'il est cliqué.
   
  navbar.classList.toggle("active");
};

/* section de défilement lien actif */
let section = document.querySelector("section");
let navLinks = document.querySelector("header nav a");

window.onscroll = () => {
  section.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
    /* barre de navigation collante */
  let header = document.querySelector("header");

  header.classList.toggle("sticky", windows.scrollY > 100);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content, .about-content", { origin: "right" });

