// Toggle widget visibility
document.getElementById("showWidgetBtn").addEventListener("click", function() {
  const widget = document.getElementById("widget");
  widget.style.display = widget.style.display === "none" ? "block" : "none";
});

// Toggle mobile navigation menu
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

menuToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    navMenu.classList.toggle('show');
  }
});

// Banner slider functionality
const slides = document.querySelectorAll('.banner-slider .slide');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

setInterval(nextSlide, 4000); // Change slide every 4 seconds

// Actions after page load
window.addEventListener("load", function() {
  // Hide loader
  document.getElementById("loader").style.display = "none";

  // Slide in call button
  document.getElementById('call-btn').classList.add('show');
});
