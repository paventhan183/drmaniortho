
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

  // Banner slider script
  const slides = document.querySelectorAll('.banner-slider .slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  setInterval(nextSlide, 4000); // Change every 4 seconds
  // Wait until page is fully loaded, then slide in the button
  window.addEventListener('load', function() {
    document.getElementById('call-btn').classList.add('show');
  });
